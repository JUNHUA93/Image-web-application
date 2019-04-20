#!/bin/bash
set -e
set -v


# http://superuser.com/questions/196848/how-do-i-create-an-administrator-user-on-ubuntu
# http://unix.stackexchange.com/questions/1416/redirecting-stdout-to-a-file-you-dont-have-write-permission-on
# This line assumes the user you created in the preseed directory is vagrant
echo "%admin  ALL=NOPASSWD: ALL" | sudo tee -a /etc/sudoers.d/init-users
sudo groupadd admin
sudo usermod -a -G admin vagrant


# Installing vagrant keys
wget --no-check-certificate 'https://raw.github.com/mitchellh/vagrant/master/keys/vagrant.pub'
#sudo mkdir -p /home/vagrant/.ssh
sudo chown -R vagrant:vagrant /home/vagrant/.ssh
cat ./vagrant.pub >> /home/vagrant/.ssh/authorized_keys
sudo chown -R vagrant:vagrant /home/vagrant/.ssh/authorized_keys
echo "All Done!"


# enable and allow ports in firewall
# https://serverfault.com/questions/790143/ufw-enable-requires-y-prompt-how-to-automate-with-bash-script
ufw --force enable
ufw allow proto tcp to 0.0.0.0/0 port 22
ufw allow proto tcp to 0.0.0.0/0 port 80
ufw allow proto tcp to 0.0.0.0/0 port 443

#Install apache2 webserver
sudo apt-get update
sudo apt-get install -y apache2 mariadb-client php7.0 libapache2-mod-php7.0 php7.0-mysql

###############################################################################
# Replace any occurance of hajek with the name of your own private repository #
###############################################################################

sudo chown -R vagrant:vagrant ~/2019-team-08f


# copying the php code to the /var/www/html directory to serve php files
# include statement to place values into an include file for the connection string in test-select.php
# https://unix.stackexchange.com/questions/4335/how-to-insert-text-into-a-root-owned-file-using-sudo

# Create Ubuntu 16.04 Self-Signed Cert for Apache2
# https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-16-04




sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt -subj "/C=US/ST=Illinois/L=Chicago/O=IIT-Company/OU=Org/CN=www.school.com"
# While we are using OpenSSL, we should also create a strong Diffie-Hellman group, which is used in negotiating Perfect Forward Secrecy with clients.
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get -y --allow-unauthenticated upgrade
sudo apt-get install -y mongodb
sudo apt-get -y --allow-unauthenticated upgrade
sudo apt-get install -y nodejs
sudo apt-get install -y npm



# Enable the service and start the service
sudo systemctl enable apache2
sudo systemctl restart apache2
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

sudo npm install -g pm2
cd 2019-team-08f/
cd project-code-mongodb-store/
sudo openssl req -nodes -new -x509 -keyout server.key -out server.cert -subj "//C=US\ST=IL\L=Chicago"
npm install
sudo pm2 start app.js
sudo pm2 startup
