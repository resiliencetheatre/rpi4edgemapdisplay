If you need to set time in offline mode

r='Tue, 14 Jan 2024 09:16:53 GMT'
d=$(busybox date -d "$r" -D "%a, %d %b %Y %T %Z" +'%Y-%m-%d %H:%M:%S')
# d becomes 2014-01-14 09:01:53
busybox date -s "$d"

Commands used to create CA and sign certificate

# Create CA
openssl req -x509 -new -nodes -newkey rsa:2048 -keyout myCA.key \
  -sha256 -days 365 -out myCA.crt -subj /CN='edgemap ca'

# Creae CSR
openssl req -newkey rsa:2048 -nodes -keyout edgemap.key -out edgemap.csr \
  -subj /CN=edgemap -addext subjectAltName=DNS:edgemap

# Sign 
openssl x509 -req -in edgemap.csr -copy_extensions copy \
  -CA myCA.crt -CAkey myCA.key -CAcreateserial -out edgemap.crt -days 365 -sha256

# Copy resulted files
cp myCA.crt edgemap.crt edgemap.key /etc/apache2

* Remember to restart wss-* services and apache

