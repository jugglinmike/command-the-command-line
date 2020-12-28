---
title: Scheduling (TODO)
layout: chapter.html
---

This chapter has yet to be completed.

???

If you've been following along through the previous chapters, you can now write
some pretty sophisticated scripts that perform all sorts of administrative
tasks. But the only way we know to start them is by typing a command into a
terminal. For all the automation techniques we've learned in the previous
chapters, we're still a bit limited in how we kick things off.

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
generically. The core functionality is specified by POSIX, making the different
implementations largely interchangeable. If you limit yourself to using just
the features covered in this chapter, then you won't have to worry about
*which* cron implementation is installed.)

---

# `crontab`

## Configure the "table" that cron uses to schedule tasks for a specific user
