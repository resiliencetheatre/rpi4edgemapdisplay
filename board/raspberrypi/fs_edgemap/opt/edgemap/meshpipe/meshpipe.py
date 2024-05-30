#!/usr/bin/env python3
#
# meshpipe - piping messages to/from FIFO over meshtastic radio
#
# Copyright (c) Resilience Theatre, 2024
# Copyright (c) 2021, datagod
# 
# FIFO files:
#
# /tmp/msgincoming -> meshtastic radio
# /tmp/msgchannel <- meshtastic radio
#
# Run:
#
# python3 meshpipe.py --port=[usb_serial_device]
#
# This work is based on:
#
#  https://github.com/datagod/meshwatch/
#  See LICENSE.meshwatch
#

import meshtastic
import meshtastic.serial_interface
import meshtastic.tcp_interface
import time
import traceback
import argparse
import collections
import sys
import os
import stat, os
import math
import inspect
import subprocess
import select
from meshtastic.mesh_pb2 import _HARDWAREMODEL
from meshtastic.node import Node
from pubsub import pub
from signal import signal, SIGINT
from sys import exit
from datetime import datetime

NAME = 'meshpipe'                   
DESCRIPTION = "FIFO pipe messages from Meshtastic devices"
DEBUG = False

parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument('-p', '--port', type=str, help="meshtastic port (eg. /dev/ttyACM0)")
args = parser.parse_args()

global Interface
global DeviceStatus
global DeviceName
global DevicePort
global PacketsReceived
global PacketsSent
global LastPacketType
global BaseLat
global BaseLon
global MacAddress
global DeviceID
global DeviceBat
global DeviceAirUtilTx
global DeviceRxSnr
global DeviceHopLimit
global DeviceRxRssi


def ErrorHandler(ErrorMessage,TraceMessage,AdditionalInfo):
  CallingFunction =  inspect.stack()[1][3]
  print("Error - Function (",CallingFunction, ") has encountered an error. ")
  print(ErrorMessage)
  print("Trace")
  print(TraceMessage)
  if (AdditionalInfo != ""):
    print("Additonal info:",AdditionalInfo)
  sys.exit()

#
# meshtastic
#
def DecodePacket(PacketParent,Packet):
  global DeviceStatus
  global DeviceName
  global DevicePort
  global PacketsReceived
  global PacketsSent
  global LastPacketType
  global HardwareModel
  global DeviceID 
  global DeviceBat  
  global DeviceAirUtilTx
  global DeviceRxSnr
  global DeviceHopLimit
  global DeviceRxRssi
  
  if isinstance(Packet, collections.abc.Mapping):

    for Key in Packet.keys():
      Value = Packet.get(Key) 
      if isinstance(Value, collections.abc.Mapping):
        LastPacketType = Key.upper()
        DecodePacket("{}/{}".format(PacketParent,Key).upper(),Value)  
      else:
        if(Key == 'raw'):
            pass
        else:
          if not isinstance(Value, bytes):
            # print("{: <20} {: <20}".format(Key,Value))
            if(Key=='batteryLevel'):
                DeviceBat = Value
            if(Key=='airUtilTx'):
                DeviceAirUtilTx = round(Value,2)
            if(Key=='rxSnr'):
                DeviceRxSnr = Value
            if(Key=='hopLimit'):
                DeviceHopLimit = Value
            if(Key=='rxRssi'):
                DeviceRxRssi = Value
           

  else:
      print('Warning: Not a packet!\n')
  

#
# Packet receive
#
def onReceive(packet, interface): 
    global PacketsReceived
    global PacketsSent
    global fifo_write
    global DeviceBat
    global DeviceAirUtilTx
    global DeviceRxSnr
    global DeviceHopLimit
    global DeviceRxRssi
    DeviceBat=None
    DeviceAirUtilTx=None
    DeviceRxSnr=None
    DeviceHopLimit=None
    DeviceRxRssi=None
    
    PacketsReceived = PacketsReceived + 1
    Decoded  = packet.get('decoded')
    Message  = Decoded.get('text')
    To       = packet.get('to')
    From     = packet.get('from')
    
    DecodePacket('MainPacket',packet)
    fromIdentString= packet.get('fromId')
    fromIdent = fromIdentString[1:]
    
    if(fromIdent):
        print('** Packet from: {}'.format(fromIdent))
        print('** battery: {}'.format(DeviceBat))
        print('** air util: {}'.format( DeviceAirUtilTx ))
        print('** RxSnr: {}'.format(DeviceRxSnr))
        print('** HopLimit: {}'.format(DeviceHopLimit))
        print('** rxRssi: {}'.format(DeviceRxRssi))
        
        # Update UI
        if DeviceBat is None: 
            DeviceBat='-'
        if DeviceAirUtilTx is None: 
            DeviceAirUtilTx='-'
        if DeviceRxSnr is None: 
            DeviceRxSnr='-'
        if DeviceHopLimit is None: 
            DeviceHopLimit='-'
        if DeviceRxRssi is None: 
            DeviceRxRssi='-'
        
        meshtasticmessage = "peernode," + fromIdent + "," + str(DeviceBat) + "," + str(DeviceAirUtilTx) + "," + str(DeviceRxSnr) + "," + str(DeviceHopLimit) + "," + str(DeviceRxRssi)
        fifo_write = open('/tmp/statusin', 'w')
        fifo_write.write(meshtasticmessage)
        fifo_write.flush()

    if(Message):
        print('Incoming message:')
        print("{: <20} {: <20}".format(From,Message))
        fifo_write = open('/tmp/msgchannel', 'w')
        fifo_write.write(Message)
        fifo_write.flush()

   

def onConnectionEstablished(interface, topic=pub.AUTO_TOPIC): 
    
    To   = "All"
    current_time = datetime.now().strftime("%H:%M:%S")
    Message = "{}|meshpipe|-|{}".format(current_time,DeviceName[1:])

    try:
      print("onConnectionEstablished packet disabled")
      # interface.sendText(Message, wantAck=False)
      # print("== Connection up packet sent ==")
      # print("To:      {}".format(To))
      # print("Message: {}".format(Message))

    except Exception as ErrorMessage:
      TraceMessage = traceback.format_exc()
      AdditionalInfo = "Sending text message ({})".format(Message)
      ErrorHandler(ErrorMessage,TraceMessage,AdditionalInfo)


def onConnectionLost(interface, topic=pub.AUTO_TOPIC): 
  print('onConnectionLost \n')
  sys.exit()

def onNodeUpdated(interface, topic=pub.AUTO_TOPIC): 
  print('onNodeUpdated \n')
   

def SIGINT_handler(signal_received, frame):
  print('SIGINT detected. \n')
  sys.exit()


#
# Send message functions
#
def send_msg(interface, Message):
    interface.sendText(Message, wantAck=True)
    print("== Packet SENT ==")
    print("To:      All:")
    print("From:    BaseStation")
    print('Message: {}'.format(Message))
    print('')

def send_msg_from_fifo(interface, Message):
    outMsg = Message + '\n'
    interface.sendText(outMsg, wantAck=False)
    print("== FIFO Packet SENT ==")
    print("To:      All:")
    print("From:    BaseStation")
    print('Message: {}'.format(Message))
    print('')


def GetMyNodeInfo(interface):

    global DeviceName
    global DeviceBat
    Distance   = 0
    DeviceName = ''
    BaseLat    = 0
    BaseLon    = 0
    TheNode = interface.getMyNodeInfo()
    DecodePacket('MYNODE',TheNode)

    print("\n--GetMyNodeInfo--")

    if 'latitude' in TheNode['position'] and 'longitude' in TheNode['position']:
      BaseLat = TheNode['position']['latitude']
      BaseLon = TheNode['position']['longitude']
      print('** GPS Location: ', BaseLat,BaseLon)

    if 'longName' in TheNode['user']:
      print('Long name: ', TheNode['user']['longName'])
      # Inform my node ID
      # meshtasticmessage = 'mynode,' + TheNode['user']['longName']
      # fifo_write = open('/tmp/statusin', 'w')
      # fifo_write.write(meshtasticmessage)
      # fifo_write.flush()

    if 'hwModel' in TheNode['user']:
      print('HW model:  ',TheNode['user']['hwModel'])
    
    if 'macaddr' in TheNode['user']:
      print('Mac addr.  ', TheNode['user']['macaddr'])

    if 'id' in TheNode['user']:
      print('User ID:   ',TheNode['user']['id'])
      DeviceName = TheNode['user']['id']

    if 'batteryLevel' in TheNode['position']:
      print('Battery:   ',TheNode['position']['batteryLevel'])

    print('---\n')


def deg2num(lat_deg, lon_deg, zoom):
  lat_rad = math.radians(lat_deg)
  n = 2.0 ** zoom
  xtile = int((lon_deg + 180.0) / 360.0 * n)
  ytile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
  return (xtile, ytile)
      
# TODO: Deliver nodes to fifo or create mesh status fifo for UI?

def DisplayNodes(interface):
    
    print('\n-- DisplayNodes --')

    try:
      for node in (interface.nodes.values()):
        print("NAME:      {}".format(node['user']['longName']))  
        print("NODE:      {}".format(node['num']))  
        print("ID:        {}".format(node['user']['id']))  
        print("MAC:       {}".format(node['user']['macaddr']))
        if 'position' in node.keys():
          #used to calculate XY for tile servers
          if 'latitude' in node['position'] and 'longitude' in node['position']:
            Lat = node['position']['latitude']
            Lon = node['position']['longitude']
            xtile,ytile = deg2num(Lat,Lon,10)
            print("Tile: {}/{}".format(xtile,ytile)) 
            print("LAT:  {}".format(node['position']['latitude']))  
            print("LONG: {}".format(node['position']['longitude']))

          if 'batteryLevel' in node['position']:
            Battery = node['position']['batteryLevel']
            print("Battery:   {}".format(Battery))  
        
        if 'lastHeard' in node.keys():
          LastHeardDatetime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(node['lastHeard']))
          print("LastHeard: {}".format(LastHeardDatetime))  
        print('-----')
        
        # Update UI
        nodeidstring = node['user']['id']
        nodeidstring = nodeidstring[1:]
        meshtasticmessage = "peernode," + nodeidstring
        fifo_write = open('/tmp/statusin', 'w')
        fifo_write.write(meshtasticmessage)
        fifo_write.flush()

    except Exception as ErrorMessage:
      TraceMessage = traceback.format_exc()
      AdditionalInfo = "Processing node info"
      ErrorHandler(ErrorMessage,TraceMessage,AdditionalInfo)


#
# main 
#
def main():
  global interface
  global DeviceStatus
  global DeviceName
  global DevicePort
  global PacketsSent
  global PacketsReceived
  global LastPacketType
  global HardwareModel
  global MacAddress
  global DeviceID
  global HardwareModel
  global BaseLat
  global BaseLon

  try:

    DeviceName      = '??'
    DeviceStatus    = '??'
    DevicePort      = '??'
    PacketsReceived = 0
    PacketsSent     = 0
    LastPacketType  = ''
    HardwareModel   = ''
    MacAddress      = ''
    DeviceName      = ''
    DeviceID        = ''
    HardwareModel   = '??'
    BaseLat         = 0
    BaseLon         = 0

    # Check fifo files
    if not os.path.exists('/tmp/msgchannel'):
        print('Missing fifo file: /tmp/msgchannel')
        sys.exit()
    if not os.path.exists('/tmp/msgincoming'):
        print('Missing fifo file: /tmp/msgincoming')
        sys.exit()
    if not os.path.exists('/tmp/statusin'):
        print('Missing fifo file: /tmp/statusin')
        sys.exit()
    
    # Check fifo type
    if not stat.S_ISFIFO(os.stat('/tmp/msgchannel').st_mode):
        print('/tmp/msgchannel is not fifo file, exiting...')
        sys.exit()
    if not stat.S_ISFIFO(os.stat('/tmp/msgincoming').st_mode):
        print('/tmp/msgincoming is not fifo file, exiting...')
        sys.exit()
    if not stat.S_ISFIFO(os.stat('/tmp/statusin').st_mode):
        print('/tmp/statusin is not fifo file, exiting...')
        sys.exit()


    print("Connecting to device at port {}".format(args.port))
    interface = meshtastic.serial_interface.SerialInterface(args.port)

    # Get node info for connected device
    GetMyNodeInfo(interface)
    # time.sleep(2)
    # print('*** MY NAME *** ',DeviceName)

    # subscribe to connection and receive channels
    pub.subscribe(onConnectionEstablished, "meshtastic.connection.established")
    pub.subscribe(onConnectionLost,        "meshtastic.connection.lost")
    pub.subscribe(onReceive, "meshtastic.receive")

    # Display nodes
    DisplayNodes(interface)

    # Open FIFO for reading
    FIFO = '/tmp/msgincoming'

    # Main loop, reads fifo in and sends data over meshtastic
    fifo_read=open(FIFO,'r')

    while True:
      time.sleep(2)
      print('While loop')
      fifo_msg_in = fifo_read.readline()[:-1]
      print('after fifo read')
      if not fifo_msg_in == "":
        print('FIFO Message in: ', fifo_msg_in)
        send_msg_from_fifo(interface,fifo_msg_in)
      else:
        # No fifo data
        pass

    interface.close()  

  except Exception as ErrorMessage:
    time.sleep(2)
    TraceMessage = traceback.format_exc()
    AdditionalInfo = "Main function "
    ErrorHandler(ErrorMessage,TraceMessage,AdditionalInfo)

  signal(SIGINT, SIGINT_handler)


if __name__=='__main__':
  try:
      main()

  except Exception as ErrorMessage:
      TraceMessage = traceback.format_exc()
      AdditionalInfo = "Main pre-amble"
      ErrorHandler(ErrorMessage,TraceMessage,AdditionalInfo)

# %%

