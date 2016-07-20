---
title: Using Vagrant
---

> Vagrant is a tool for building complete development environments. With an
> easy-to-use workflow and focus on automation, Vagrant lowers development
> environment setup time, increases development/production parity, and makes
> the "works on my machine" excuse a relic of the past.

- [vagrantup.com](https://www.vagrantup.com/)

???

In this course, we'll use a virtual machine to learn and experiment. This is a
full operating system (sometimes called the "guest") that is completely
isolated from the one that created it (e.g. your operating system, also known
as the "host"). The virtual machine is provided by
[VirtualBox](https://www.virtualbox.org/), and
[Vagrant](https://www.vagrantup.com/) lets us manage the machine with a few
short commands.

---

# Creating a virtual machine

```
pc$ vagrant up
```

???

When we run the command `vagrant up` from a directory that has a file
`Vagrantfile`, a new virtual machine will be created for us.

---

# Logging in to the virtual machine

```
pc$ vagrant ssh
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
vm$
```

???

The command `vagrant ssh` will initiate an SSH connection to the "guest"
environment. Because there are no security concerns for this environment,
there's no need to worry about user names, passwords, or keys.

---

# Get learnin'

```
vm$ echo Hello, world!
Hello, world!
vm$ exit
pc$
```

???

Now you're ready to go! The `vm$` is your command prompt. This is where you
enter instructions--we'll be doing a lot of that in the coming sections.

When you want to log out of the virtual machine, type `exit` and press `Enter`.

---

# When you're done (for the day)

```
pc$ vagrant halt
```

???

`vagrant halt` will shut down the virtual machine. Virtual machines require a
lot of system resources, so it's a good idea to run this command when you are
done working. You can re-start the machine later with `vagrant up`.

---

# When you're done (for good)

```
pc$ vagrant destroy
    default: Are you sure you want to destroy the 'default' VM? [y/N] y
==> default: Forcing shutdown of VM...
==> default: Destroying VM and associated drives...
==> default: Removing hosts
==> default: Running cleanup tasks for 'shell' provisioner...
vm$
```

???

Even when the virtual machine is shut down, it still takes up space on your
hard drive. Use `vagrant destroy` when you don't need the environment anymore.

---

# Live dangerously

```
pc$ vagrant up
pc$ vagrant ssh
vm$ bad --command "that really" messes-things.up
vm$ echo Uh oh.
Uh oh.
vm$ exit
pc$ vagrant destroy
pc$ vagrant up
```

???

Don't be afraid to make mistakes. Even if things go *very* wrong, you are just
two commands away from a completely fresh virtual machine: first `vagrant
destroy`, then `vagrant up`.

**Warning** It can be easy to confuse the "guest" environment and the "host"
environment from the terminal prompt. Always be sure that you know where your
commands are going before you execute them! As demonstrated above, it's easy to
recover from mistakes made in the guest environment. Mistakes made on your
local environment may be much more difficult to fix.
