#!/bin/bash -e

USER_NAME=speaker
USER_PSWD=speaker
USER_HOME=/home/$USER_NAME

echo "Updating package repository"
apt-get update >/dev/null 2>&1

adduser $USER_NAME --gecos "First Last,RoomNumber,WorkPhone,HomePhone" --disabled-password
echo "$USER_NAME:$USER_PSWD" | chpasswd
usermod -a -G sudo $USER_NAME

cp -r /home/vagrant/.ssh $USER_HOME
cp /mnt/vagrant/home/.bashrc $USER_HOME

chown -R $USER_NAME:$USER_NAME $USER_HOME/.ssh $USER_HOME/.bashrc
