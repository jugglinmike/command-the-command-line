#!/bin/bash -e

echo vagrant | sudo --stdin --validate --prompt ''

sudo apt-get clean

# Zero out the virtual disk in order to minimize the crompressed size of the
# box. The first command is intended to run until failure, so its exit status
# and standard error stream are both ignored.
sudo dd if=/dev/zero of=/EMPTY bs=1M 2> /dev/null || true
sudo rm --force /EMPTY

sudo bash -c "cat /dev/null > /home/vagrant/.bash_history"
