#!/bin/bash -e

# The commands in this file would require the use of `sudo` if executed by a
# de-privileged user. However, Vagrant's "shell provisioner" [1] is run as the
# root user, making this unnecessary.
#
# [1] https://www.vagrantup.com/docs/provisioning/shell.html

USER_NAME=speaker
USER_PSWD=speaker
USER_HOME=/home/$USER_NAME

echo "Updating package repository"
apt-get update >/dev/null 2>&1

echo "Installing utilities"
apt-get install tree

adduser $USER_NAME --gecos "First Last,RoomNumber,WorkPhone,HomePhone" --disabled-password
echo "$USER_NAME:$USER_PSWD" | chpasswd
usermod -a -G sudo $USER_NAME

cp -r /home/vagrant/.ssh $USER_HOME

rsync --recursive /mnt/vagrant/root/ /

chown -R $USER_NAME:$USER_NAME $USER_HOME /var/www/my-site
