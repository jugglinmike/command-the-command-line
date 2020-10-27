---
title: Users and Groups (TODO)
layout: chapter.html
---

This chapter has yet to be completed.

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
account which permission to perform each task. If more people joined George (or
if George quit), then we'd have to carefully assign/revoke each of those three
permissions.

If we created a group called "printer-admin", then this would all be easier. We
could configure that *group* to have the three printer-related privileges.
Then, whenever a new administrator joined, we would add their account to the
"printer-admin" group. Likewise, when they quit, we'd only remove them from
that group.

In short, groups help maintain logical collections of rights for many users.

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
