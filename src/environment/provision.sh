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

echo "Creating user: $USER_NAME"
adduser $USER_NAME \
  --gecos "First Last,RoomNumber,WorkPhone,HomePhone" \
  --disabled-password
echo "$USER_NAME:$USER_PSWD" | chpasswd
usermod -a -G sudo $USER_NAME
cp -r /home/vagrant/.ssh $USER_HOME

echo "Copying files"
rsync --recursive /mnt/vagrant/root/ /
cd $USER_HOME
/mnt/vagrant/create-island.sh

# The default `.bashrc` provided to new users by Ubuntu defines an abstraction
# that hides details discussed in this course.
rm $USER_HOME/.bashrc $USER_HOME/.profile

chown -R $USER_NAME:$USER_NAME $USER_HOME /var/www/my-site
