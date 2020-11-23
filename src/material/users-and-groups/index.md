---
title: Users and Groups (TODO)
layout: chapter.html
---

This chapter has yet to be completed.

???

Unix-like systems have a built-in understanding of **users**. Originally, these
were intended to describe individual people interacting with the system through
remote terminals (see :chapter:history:). That's still the case today, but user
accounts are also used for many other purposes. A typical Unix-like system will
have many "system users" that no one ever logs in to and that don't even have a
"home" directory.

---

![A pen-and-paper check list](to-do-list.jpg)

"[to do list](https://www.flickr.com/photos/30478819@N08/36671223606/)" by
[Marco Verch](https://www.flickr.com/photos/30478819@N08/) is Licensed under
[CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)

???

In general, you can think of a user as a set of rules about what may and may
not be done in the system. When a human being logs in to that user account,
they will be bound by those rules. Alternatively, an automated task (perhaps
repeated on some regular interval) could be assigned to such a set of rules.

On a Unix-like system, every process has an associated user which is known as
its **owner**. As the process interacts with the system (reading files,
creating new processes, etc.), the system allows or denies each request
according to the process's owner. For instance, if the process's owner has
permission to open the file at `/etc/shadow`, then the process does, too.

---

# "Running as"

???

It's common to speak of this relationship by saying that a process "runs as" a
user. These are all statements you might find written in technical
documentation:

- "[nginx](https://www.nginx.com/) is running as the 'www-data' user."
- "She logged in as 'sally' but ran 'find' as 'mark.'"
- "Don't run untrusted scripts as 'root!'"

Whenever someone states that a process "runs as" a certain user, they're saying
that the user is the owner of that process.

---

# Groups

A **group** is a collection of users.

???

To understand how groups can be useful, consider how me might keep track of all
the users who are allowed to administer the system's printers. Assume that that
responsibility includes three separate tasks: adding new printers, configuring
existing printers, and removing unwanted printers.

We could handle this without using groups. If a person named George was the
only user that needed to perform this duty, then we could grant his user
account permission to perform each task. If more people joined George, then
we'd have to carefully assign each of those three permissions. If anyone took a
new job, we'd need to remove the printer permissions without changing any
others.

This would all be easier if we created a group called "printer-admin". We could
configure that *group* to have the three printer-related privileges. Then,
whenever a new administrator joined, we would add their account to the
"printer-admin" group. Likewise, when they quit, we'd only remove them from
that group.

In short, groups help maintain logical collections of rights for many users.

---

# File ownership

```terminal
vm$ ls /home/larry
ls: cannot open directory /home/larry: Permission denied
vm$ ls -o /home
total 102
drwx------ 72 larry  24576 Jul 01 10:55 larry
drwx------ 72 nancy  8374  Jul 09 10:55 nancy
drwx------ 72 sally  39827 Jul 14 10:55 sally
drwx------ 72 xavier 33432 Jul 11 10:55 xavier
vm$ 
```

???

We saw in :chapter:sudo: that different directories may "belong" to different
users. A file's owner is a fundamental trait, just like its name. We can use
the `ls` utility's `-o` flag to see files and directories listed with their
owners.

In this example, each directory's owner is displayed in the third column from
the left. The directory's name is displayed in the final column. For
subdirectories of `/home/`, the name and owner are often identical: Sally owns
the directory named `sally`, and Larry owns the directory named `larry`. That
sounds logical enough, but it doesn't have to be that way.

---

:continued:

```terminal
vm$ ls -l /usr/bin/mail-lock /usr/bin/ssh-agent
-rwxr-sr-x 3 root mail  14592 Dec  3  2012 /usr/bin/mail-lock
-rwxr-sr-x 1 root ssh  288880 Jan 18  2018 /usr/bin/ssh-agent
vm$ 
```

Programs stored in the `/usr/bin` directory have more interesting access
controls. We'll use the `ls` utility's `-l` flag to view owner *and* group
membership.

The `ssh-agent` executable file belongs to the "root" user, but the name of its
group is `ssh`. And though the `mail-lock` executable also belongs to the
"def. of parameters for root" user, its group is `mail`.

---

# `chown`

## Change file owner and group

```terminal
vm$ cat README.txt
cat: README.txt: Permission denied
vm$ ls -o
total 4
-r-xr----- 1 root 29 Nov 17 17:23 README.txt
vm$ sudo chown sally README.txt
vm$ ls -o
total 4
-r-xr----- 1 sally 29 Nov 17 17:23 README.txt
vm$ cat README.txt
Hello! I am a "readme" file.
vm$ 
```

???

You can use `chown` to **ch**ange files' **own**er.

You'll often need to use the `sudo` utility because reassigning ownership is a
privileged operation. (See :chapter:sudo: for more information.)

---

:continued:

```terminal
vm$ cat index.html
cat: index.html: Permission denied
vm$ ls -g
total 4
-rw-rw---- 1 root 67 Nov 17 17:51 index.html
vm$ sudo chown :sally index.html
vm$ ls -g
total 4
-rw-rw---- 1 sally 67 Nov 17 17:51 index.html
vm$ cat index.html
<!DOCTYPE html><html><body>Hello! I am an HTML file.</body></html>
vm$ 
```

???

You can also use `chown` to change a file's group. Just write the group name
after a color (`:`) character.

---

# File Modes, revisited

```terminal
vm$ echo 'echo Hello!' > greet.sh
vm$ ./greet.sh
-bash: ./greet.sh: Permission denied
vm$ chmod +x greet.sh
vm$ ./greet.sh
Hello!
vm$ 
```

???

In :chapter:scripting:, we learned about how a file's "mode" determines whether
it is executable or not.

---

:continued:

```terminal
vm$ chmod -x greet.sh
vm$ ./greet.sh
-bash: ./greet.sh: Permission denied
vm$ chmod -w greet.sh
vm$ echo > "# I can't write to the file anymore" >> greet.sh
-bash: greet.sh: Permission denied
vm$ chmod -r greet.sh
vm$ cat greet.sh
cat: greet.sh: Permission denied
vm$ 
```

???

There are two additional kinds of file permissions: readable and writable. If a
file isn't readable by a given user, then that users won't be able to see its
contents. If a file isn't writable by a given user, then that user won't be
able to change its contents.

When we create a file, the system automatically grants our user account
permission to read and write that file. We can remove those positions if we
want, and we can even use the familiar `chmod` utility to do it. We replace the
plus sign (`+`) with the minus sign (`-`) to remove.

---

:continued:

```terminal
vm$ chmod +r greet.sh
vm$ chmod +x greet.sh
vm$ ls -l greet.sh
-r-xr-xr-x 1 sally sally 68 Nov 22 18:21 greet.sh
vm$ 
```

???

When run with the `-l` flag, the `ls` utility also displays file mode
information. The first column of output contains a field of dashes and letters.
The second, third, and fourth character of the sequence describe the read,
write, and execute permissions for the file's owner, respectively.

If the second character is an `r`, then the file's owner has the "read"
permission. If it is a dash (`-`), then the owner does not. Likewise, the third
character is either a `w` (signifying that the file is writable by its owner)
or a dash (signifying that it is not writable). The fourth character may either
be an `x` (if the file is executable by its owner) or a dash (if it is not).

---

:continued:

```terminal
vm$ cat ./file-permission-field.txt

  (r)ead, (w)rite, and e(x)ecute permissions for the file's owner
  ^
 / \
 | | (r)ead, (w)rite, and e(x)ecute permissions for members of the file's group
 | | ^
 | |/ \
 | || | (r)ead, (w)rite, and e(x)ecute permissions for all other users
 | || | ^
 | || |/ \
 | || || |
-rwxrwxrwx

vm$ 
```

???

If that wasn't complicated enough, these same three permissions are also
maintained for the file's group and for all other users. The next six
characters in the output of `ls` use the same pattern to communicate whether
the read, write, and execute permissions have been granted to each of those
two sets of users.

In the earlier example about printer administration, all members of the
`printer-amdin` group were allowed to maintain the system's printers. This is
possible for files (for example, a file containing the list of active printers)
because the system controls "group" permissions separately from "owner"
permissions and "other user" permissions.

---

:continued:

```terminal
vm$ chmod -r greet.sh
vm$ chmod -w greet.sh
vm$ chmod -x greet.sh
vm$ ls -l greet.sh
---------- 1 sally sally 68 Nov 22 18:21 greet.sh
vm$ chmod u+rx greet.sh
vm$ chmod g+w greet.sh
vm$ chmod o+x greet.sh
vm$ ls -l greet.sh
-r-x-w---x 1 sally sally 68 Nov 22 18:21 greet.sh
vm$ 
```

???

If we want to modify those other permissions, we can once again use the `chmod`
utility. Now, we'll make our mode change even more specific so that it only
effects the permissions for the file's owner, its group, or all other users.
This is all done by prefixing the permissions list with another character.

We can add or remove permissions for the file's owner by prefixing the
permission list with a `u`. We can add or remove permissions for the file's
group by prefixing the permission list with a `g`. Finally, we can add or
remove permissions for all other users by prefixing the permission list with an
`o`.

---

# In Review

- Users are the way Unix-like systems express and enforce permissions for all
  interactions
- Groups are a convenient way to maintain permissions between many users
- Every file in the system designates one user account as its "owner", and it
  likewise "belongs" to one specific group
- Every file in the system has a "mode" which describes whether users can read,
  write, and execute it. That set is defined independently for a file's owner,
  for member of a file's group, and for all other users on the system.
- The `chmod` utility can be used to modify file permissions, and the `ls`
  utility can be used to review file permissions
