---
title: Scheduling (TODO)
layout: chapter.html
---

This chapter has yet to be completed.

???

If you've been following along through the previous chapters, you can now write
some pretty sophisticated scripts that perform all sorts of administrative
tasks. But the only way we know to start them is by typing a command into a
terminal. For all the automation techniques we've learned up to this point,
we're still a bit limited in how we kick things off.

What if you want something to happen even if you step away from the keyboard?
Or what if you'd simply rather not have to act as a timekeeper and enter the
same commands over and over again?

Fortunately, Unix-like systems have answers for this--multiple answers, in
fact. In this chapter, we'll explore some of the ways you can create task
schedules.

---

# cron

![a pocket watch](pocket-watch.jpg)

"[Cronos](https://www.flickr.com/photos/lordferguson/987040351/)" by
[Pablo](https://www.flickr.com/photos/lordferguson/) is licensed under
[CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)

???

`cron` is a "job scheduler"--an application which runs in the background and
executes commands (the "jobs") on some interval as specified by its
configuration files (the "schedule").

We use many of the utilities covered in this course by executing them from the
command line. Because cron is constantly running in the background, we won't
interact with it by running it from the command line. Instead, we'll give it
instructions by modifying configuration files; it constantly reads these files
to determine what to do next.

(By the way: there are actually many software projects which offer this
specific functionality; the name `cron` is a way to reference any one of them
generically. [The core functionality is specified by
POSIX](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/crontab.html),
making the different implementations largely interchangeable. If you limit
yourself to using just the features covered in this chapter, then you won't
have to worry about *which* cron implementation is installed.)

---

# `crontab`

## Configure the "table" that cron uses to schedule tasks for a specific user

```terminal
vm$ crontab -l
no crontab for vagrant
vm$ 
```

???

Users on the system can define their own "table" of cron jobs. Invoking
`crontab` with the `-l` option will show the current user's cron jobs.

---

:continued:

```terminal
vm$ crontab -
&#8203;cron is reading what I type to the standard input stream.
&#8203;It will try to "install" whatever I type,
&#8203;but if my input isn't valid syntax, then cron will reject it.
"-":0: bad minute
errors in crontab file, can't install.
vm$ crontab -l
no crontab for vagrant
vm$ crontab -
&#8203;0 0 1 1 0 echo 'This is a valid (though useless) entry.'
vm$ crontab -l
0 0 1 1 0 echo 'This is a valid (though useless) entry.'
vm$ 
```

???

If invoked with a dash (`-`), then `crontab` will read from the standard input
stream and write the result to the current user's configuration file. We use
this command rather than editing a file directly because doing so lets cron
validate our input before making any changes. That saves us from making typos
which could otherwise be very difficult to debug.

There are better ways to edit the cron "table", but we'll use this to learn
about the crontab syntax.

---

# `crontab` syntax

```terminal
vm$ crontab -l
# cron ignores lines beginning with the `#` character. You can
# use them to explain details of your crontab.
#
#    .------------------------- These characters tell cron when
#    |                          to perform the job.
#    |
#    |             .----------- The rest of the line is the
#    |             |            command to execute to perform
#    |             |            the job.
#.-------. .----------------.
 0 0 1 1 0 echo Hello, world.
vm$ 
```

???

`cron` ignores lines beginning with the number sign (`#`). We can write
whatever we want on lines which start that way, and it won't effect how `cron`
behaves at all. They're often called "comments," and they are a good way to
explain details of the other lines which might not be obvious.

Besides the comments, this particular "crontab" has just one entry. The entry
has two main parts: a set of characters which tell cron when to perform the
job, and the command to execute in order to perform the job.

---

:continued:

```terminal
vm$ crontab -l
 0 0 1 1 0 echo Hello, world.
#^ ^ ^ ^ ^
#| | | | '--------------------- day of the week (0 through 6)
#| | | '----------------------- month of the year (1 through 12)
#| | '------------------------- day of the month (1 through 31)
#| '--------------------------- hour of the day (0 through 23)
#'----------------------------- minute of the hour (0 through 59)
vm$ 
```

"Execute the command `echo Hello, world.` at midnight on January first and at
midnight on every Sunday in January."

???

Each of the five values are separated by a space, and they each describe a
different aspect of the schedule.

The first value describes the minute of the hour on which `cron` should run the
job. The number zero represents the first minute, the number one represents
the second minute, and so on until 59, representing the final minute of the
hour.

The second value describes the hour of the day on which `cron` should run the
job. The number zero resents the first hour, the number one represents the
second hour, and so on until twenty-three, representing the final hour of the
day.

The third value describes the day of the month on which `cron` should run the
job. The number one represents the first of the month, two represents the
second, and so on until 31, representing the final day of the month.

The fourth describes the day of the month on which `cron` should run the job.
The number one represents January, two represents February, and so on until
twelve, representing December.

The fifth value describes the day of the week on which `cron` should run the
job. The number zero represents Sunday, one represents Monday, and so on until
seven, representing Saturday.

`cron` calculates the *intersection* of most of the values. In this example,
the first two values are zero. This means "the first minute *and* the first
hour of the day" (i.e. "once at midnight"), and *not* "the first minute *or*
the first hour of the day (i.e. "at the top of every hour").

The "day of week" and "day of month" specifiers are an exception. `cron`
interprets the *union* of these values. In this example, "day of month" is 1
and "day of week" is 0. `cron` runs the job on every Sunday and on the first
day of every month (and *not* on just Sundays which are also the first day of
the month).
