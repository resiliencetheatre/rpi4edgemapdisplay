#!/bin/sh

while [ 1 ] 
do
	echo -n "1,on" > /tmp/statusin
	sleep 1
	echo -n "3,on" > /tmp/statusin
	sleep 2
	echo -n "2,on" > /tmp/statusin
	sleep 4
	echo -n "1,off" > /tmp/statusin
	sleep 4
	echo -n "3,off" > /tmp/statusin
	sleep 4
done;
