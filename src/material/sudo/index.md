---
title: All about `sudo`
layout: chapter.html
---

???

If you've been using a Unix-like environment before working through this guide,
you may recognize the word `sudo`. It shows up in commands and scripts all over
the Internet, often without an explanation. Even if you've never seen it
before, it's an important part of working on the command line.

What does it do? How does it work? When should you use it?

That's what this chapter is all about.

---

# Background: Users and permissions

```terminal
vm$ echo $HOME
/home/sally
vm$ ls /home
larry
nancy
sally
xavier
vm$ 
```

???

Recall from :chapter:history: that Unix was designed as a time-sharing system.
Many people were expected to be logged in and working at the same time. The
system recognizes "users" as a way to promote privacy while still allowing
people to share files and devices.

We've already seen some evidence of this: our `$HOME` directory isn't simply
`/home`; it's a sub-directory of `/home` named `sally`. This suggests that
there might be more directories for other people.

---

:continued:

```terminal
vm$ ls /home/larry
ls: cannot open directory /home/larry: Permission denied
vm$ 
```

???

We don't generally have access to the `$HOME` directories that belong to other
users. :chapter:users-and-groups: explains how the system manages file
ownership, but for now, just know that a file's owner is a fundamental trait,
much like its name.

---

# `whoami`

## Show the name of the current user

```terminal
vm$ whoami
sally
vm$ 
```

???

The `whoami` application is one of the better-named utilities in our toolkit;
it simply displays the name of the user who invoked it. We're about to learn to
switch between accounts, so this will be a helpful tool to show the effect of
the new commands.

---

# Background: the `root` user

![Root vegetables](root-vegetables.jpg)

"[Root vegetables](https://www.flickr.com/photos/sheeprus/36552307803)" by
[Sheep"R"Us](https://www.flickr.com/photos/sheeprus/) is licensed under [CC
BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)

???

A Unix-like system can have any number of user accounts like this. However,
there is one special user that is present on *all* Unix-like systems: the
"root" user (also known as the "superuser").

This is the administrative user account. It has no access control restrictions,
meaning it has the permissions to do everything with every file and every
directory. The root user's `HOME` directory is in a special location on the
file system: `/root`.

---

:continued:

```terminal
vm$ rm -rf /bin
rm: cannot remove ‘/bin/zdiff’: Permission denied
rm: cannot remove ‘/bin/findmnt’: Permission denied
rm: cannot remove ‘/bin/bzegrep’: Permission denied
rm: cannot remove ‘/bin/gzexe’: Permission denied
rm: cannot remove ‘/bin/sh.distrib’: Permission denied
rm: cannot remove ‘/bin/chgrp’: Permission denied
rm: cannot remove ‘/bin/login’: Permission denied
```

???

This separation is helpful when you are learning because it means you are
unable to perform many actions that would break things. Even the person who is
"in charge" of the system (that's you in these exercises and on your personal
computer) usually has a normal user account. In addition to reducing the risk
of mistakes, working under a separate account limits the damage that a
malicious program can do when it runs on your behalf.

---

# `sudo`

```terminal
vm$ whoami
sally
vm$ sudo whoami
[sudo] password for sally: &#8203;       
root
vm$ 
```

???

The `sudo` utility allows us to execute single commands as the `root` user.

There is some disagreement about where its name comes from. Some say it is
short for "**s**uper **u**ser **do**." Because you may use the `-u` option to
execute a command as *any* user, some argue that it is short for "**s**witch
**u**ser and **do**."

---

:continued:

```terminal
vm$ whoami
untrusteduser
vm$ sudo whoami
[sudo] password for untrusteduser: &#8203;       
untrusteduser is not in the sudoers file.  This incident will be reported.
vm$ 
```

???

Not all users are able to use `sudo`. If you are working on a machine that you
do not own, you may need to request the necessary permissions from your system
administrator.

---

:continued:

```terminal
vm$ sudo echo "After I've authenticated once..."
[sudo] password for sally: &#8203;       
After I've authenticated once...
vm$ date
Wed Dec 31 1969 19:00:00 EST 1969
vm$ sudo echo "I stay in 'sudo mode' for a little while."
I stay in 'sudo mode' for a little while.
vm$ date
Wed Dec 31 1969 19:21:00 EST 1969
vm$ sudo echo "...but I'll need to re-authenticate every so often."
[sudo] password for sally: &#8203;       
...but I'll need to re-authenticate every so often.
vm$ 
```

???

Most systems are configured to "recognize" users that have recently
authenticated with `sudo`. In this state, you will still need to use `sudo` to
take actions as the root user, but you will not have to re-enter your password.
This status will expire after a short period (15 minutes by default).

---

# Using `sudo` safely

```terminal
vm$ apt-get install cowsay
E: Could not open lock file /var/lib/dpkg/lock - open (13: Permission denied)
E: Unable to lock the administration directory (/var/lib/dpkg/), are you root?
vm$ sudo apt-get install cowsay
[sudo] password for sally: &#8203;       
Reading package lists... Done
Building dependency tree
Reading state information... Done
cowsay is already the newest version.
0 upgraded, 0 newly installed, 0 to remove and 23 not upgraded.
vm$ 
```

???

You will need to use `sudo` when performing system administration tasks like
installing software. (In this example, we're using the APT package manager
commonly used in the [Debian](https://www.debian.org/) and
[Ubuntu](https://ubuntu.com/) GNU/Linux distributions.) It's generally safe to
use `sudo` with system utilities and when you understand what the command is
going to do.

---

# Avoiding "unsafe" uses of `sudo`

```terminal
vm$ sudo ./script-i-found-on-the-web.sh
[sudo] password for sally:  &#8203;       
Installing a key logger... Done
Deleting all your applications... Done
vm$ 
```

???

However, many tutorials online contain instructions that use `sudo` unsafely.
Remember that the root user can do *anything*, so using `sudo` with an
untrusted program from the Internet may cause all sorts of problems.

---

:continued:

```terminal
vm$ sudo apt-get install the-dependency-i-need
[sudo] password for sally: &#8203;       
vm$ ./script-i-found-on-the-web.sh
Performing actions as the current (de-privileged) user
vm$ 
```

???

It's much better to perform the administrative actions manually and rely on the
untrusted program to do the rest. Even this is dangerous, though--the script
could still access your personal files. There is no substitute for trusting the
code you run, whether through reading the source or through having confidence
in its origins!

---

# In Review

- `whoami` is a utility that prints the current user's name
- The "root" user (or "superuser") is capable of performing any task
- The `sudo` utility allows you to execute single commands as the "root" user
- You should trust any program you run using `sudo`!
