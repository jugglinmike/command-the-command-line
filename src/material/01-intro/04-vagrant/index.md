# Using Vagrant

> Vagrant is a tool for building complete development environments. With an
> easy-to-use workflow and focus on automation, Vagrant lowers development
> environment setup time, increases development/production parity, and makes
> the "works on my machine" excuse a relic of the past.

- [vagrantup.com](https://www.vagrantup.com/)

???

---

# Creating a virtual machine

```
C:\speaking-nix\> vagrant up
```

???

The command `vagrant up`, when invoked from a directory containing a file named
`Vagrantfile` will initialize a new virtual machine. This is a full operating
system (sometimes called the "guest") that is completely isolated from the one
that created it (e.g. your operating system, also known as the "host").

---

# Logging in to the virtual machine

```
C:\speaking-nix\> vagrant ssh
Welcome to Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-39-generic x86_64)

 * Documentation:  https://help.ubuntu.com/

  System information as of Thu Jul 14 22:50:45 UTC

  System load:  0.97              Processes:           81
  Usage of /:   2.7% of 39.34GB   Users logged in:     0
  Memory usage: 25%               IP address for eth0: 10.0.2.15
  Swap usage:   0%

  Graph this data and manage this system at:
    https://landscape.canonical.com/

  Get cloud support with Ubuntu Advantage Cloud Guest:
    http://www.ubuntu.com/business/services/cloud

0 packages can be updated.
0 updates are security updates.
$
```

???

The command `vagrant ssh` will initiate an SSH connection to the "guest"
environment. For this course (and because there are no security concerns),
there's no need to worry about user names, passwords, or keys.

---

# Get learnin'

```
$ echo Hello, world!
Hello, world!
$ exit
C:\speaking-nix\>
```

???

Now you're ready to go! The dollar sign character (`$`) is your command prompt.
This is where you enter instructions--we'll be doing a lot of that in the
coming sections.

When you want to log out of the virtual machine, type `exit` and press `Enter`.

---

# When you're done (for the day)

```
C:\speaking-nix\> vagrant halt
```

???

`vagrant halt` will shut down the virtual machine. Virtual machines require a
lot of system resources, so it's a good idea to run this command when you are
done working. You can re-start the machine with `vagrant up` later.

---

# When you're done (for good)

```
C:\speaking-nix\> vagrant destroy
```

???

Even when the virtual machine is shut down, it still takes up space on your
hard drive. Use `vagrant destroy` when you don't need the environment anymore.

---

# Live dangerously

```
C:\speaking-nix\> vagrant up
C:\speaking-nix\> vagrant ssh
$ sudo rm -rf /bin
$ echo Uh oh.
Uh oh.
$ exit
C:\speaking-nix\> vagrant destroy
C:\speaking-nix\> vagrant up
```

???

Don't be afraid to make mistakes. Even if things go *very* wrong, you are just
two commands away from a completely fresh virtual machine!
