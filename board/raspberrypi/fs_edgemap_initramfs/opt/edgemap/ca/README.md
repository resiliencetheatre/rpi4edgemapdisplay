1. Generate root key

# openssl genrsa -des3 -out rootCA.key 4096 (with password)

openssl genrsa -out rootCA.key 4096

2. Create and Self-Sign root CA

openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt

3. Generate domain V3 certificate with shell script

./gen.sh buildroot

4. Import rootCA.crt to browser: Security -> Authority -> Import


Derived from:

[1] https://www.linkedin.com/pulse/how-create-your-own-self-signed-root-certificate-shankar-gomare


