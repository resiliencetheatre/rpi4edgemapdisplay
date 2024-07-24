# Wireguard systemd networking files

These files are template for wireguard tunneling with systemd networking.

To use these, create keys and configure wg0.netdev and wg0.network.
Place files at /etc/systemd/network for use.

Key create

  cd /etc/systemd/network/;
  export PEER_NAME=[peername];
  wg genkey | (umask 0077 && tee $PEER_NAME.key) | wg pubkey > $PEER_NAME.pub;
  wg genpsk | (umask 077 && tee $PEER_NAME.psk);


Set permissions

cd /etc/systemd/network/
chmod 644 *

Activation 

  systemctl restart systemd-networkd

If you like to persist autostart:

  systemctl enable systemd-networkd

