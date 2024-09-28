#highrate

These are demo files for highrate marker demonstration.

Run demo:

First start 'wss-highrate.service' and re-load webpage.

 systemctl start wss-highrate.service

Run one loop with 'highrate':

 cd /opt/edgemap/highrate
 highrate -i highrate.ini

Using gpsbabel to interpolate 1 Hz tracks:

To 20 Hz tracking rate:

 gpsbabel -i gpx -f [source].gpx -x interpolate,time=0.05  -o csv -F [output].csv 

To 10 Hz tracking rate:

 gpsbabel -i gpx -f [source].gpx -x interpolate,time=0.1  -o csv -F [output].csv

