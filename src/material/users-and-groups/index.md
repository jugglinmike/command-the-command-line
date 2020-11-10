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

# File permissions

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
"root" user, its group is `mail`.

All files and folders have a set of "permissions" which describe exactly which
users may interact with them, and even *how* they may interact.

---

From course outline:

> - Users and groups
>   - `chown`, `groups`, `who`

From learning objectives:

> - SWBAT Explain the significance of "users" and "groups" as they relate to
>   access control
> - SWBAT Administer access control permissions

From "Scripting" chapter:

> Every file on the file system has a set of permissions associated with it.
> This meta-data describes whether the file can be read, written, and executed
> as a command. (This description simplifies the topic a bit; see
> :chapter:users-and-groups: for a more complete discussion.)
