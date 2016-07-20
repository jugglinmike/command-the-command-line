---
title: Process Boundaries
---

???

We've created a good number of processes so far, but there are a lot of details
about the way information flows through processes that we haven't covered yet.

---

```
vm$ cat ./process-bounds.txt
         options ------+
environment vars ------+
                       V
                  +---------+
standard input -> | Process | -> standard output
       signals -> |         | -> standard error
                  +---------+
                       |
                       +-------> exit status
vm$
```

???

In Unix-like systems, a typical process may receive input on a number of
channels. Options and environmental variables can only be supplied as the
process is created. On the other hand, both signals and standard input can
effect the behavior of the program at any point in its lifetime. We've seen
examples of each of these channels in prior sections.

A process has other channels for communicating outwardly. Standard output and
standard error are two streams of data to which a process may write at any
moment. In addition, as the process exits, it emits a numeric status code that
describes the conditions that caused the program to end.

Processes may have any number of additional communication channels (e.g.
network streams, file streams, additional devices), but the seven described
here are available to all processes (even if they aren't always used).

---

# Input: Options & Environment Variables

```
vm$ my_var=123 magic-app --an_option
```

???

We previously discussed options and environment variabels in
:chapter:command-invocation: (although we didn't refer to them as
"communication channels" at the time).

---

# Input: Standard Input

```
vm$ sort
c
a
b
^D
a
b
c
vm$
```

???

Recall that in :chapter:process-mgmt-1:, we briefly worked with the `sort`
utility. That program was novel because it accepted input dynamically as we
typed.

In this way, `sort` is no different than the terminal program we have been
using all along. When we invoke `sort`, the "input stream" that normally flows
from our keyboard and into the terminal is instead interpreted by `sort`
itself. This is considered a "stream" because its contents are delivered over
time, and the end is not known in advance.

The stream typically originates from the keyboard, but as we'll see in just a
moment, this is not always the case.

Many utilities that normally expect a file name as an option will read from
standard input when no such file is supplied. For example, both `grep` and
`sed` behave this way.

---

# Redirecting Standard Input

```
vm$ cat cereal.txt
fruit loops
lucky charms
cap'n crunch
vm$ sort < cereal.txt
cap'n crunch
fruit loops
lucky charms
vm$
```

???

As we've seen, the terminal's default behavior is to supply new processes with
its own input stream. We can override this behavior and provide a different
input stream. By including a "less than" character (`<`) at the end of the
command, we can specify the name of a file. The contents of that file will be
interpreted as though we had entered them into the terminal directly.

Frankly, for those programs that accept a file name as an option, redirecting
input like this isn't very compelling.

---

:continued:

```
vm$ mail hello@bocoup.com --subject 'Keep up the good work!'
Dearest Bocoup,

You are doing wonderful things. Please continue to do them.

Mike
~.
vm$
```

???

On the other hand, some programs *only* operate on the "standard input" stream.

---

:continued:

```
vm$ cat my-message.txt
Dearest Bocoup,

You are doing wonderful things. Please continue to do them.

Mike
vm$ mail hello@bocoup.com --subject 'Keep up the good work!' < my-message.txt
vm$
```

???

The shell is not a great environment to author large amounts of copy. We'd much
rather use our own editor (`nano` perhaps?) to compose a message. Input
redirection allows us to send messages from files we created elsewhere.

---

# Input: Signals

```
vm$ find / -name dory
^C
vm$
```

???

Signals are an advanced way to send information to a running process. The
discussion in :chapter:process-mgmt-1: (where we used `Ctrl`+`c` to send the
"SIGINT" signal) is sufficient for day-to-day activities in a Unix-like
environment. :chapter:process-mgmt-2: takes a closer look at other signals
and how to send them.

---

```
vm$ cat ./process-bounds.txt
         options ------+
environment vars ------+
                       V
                  +---------+
standard input -> | Process | -> standard output
       signals -> |         | -> standard error
                  +---------+
                       |
                       +-------> exit status
vm$
```

???

That covers the common input channels employed by most processes. It's a bit
underwhelming because we've already covered most of them in previous sections.
Just remember that the list is not exhaustive: programs can be written to
accept input from various other sources.

The story is similar for outgoing communication. Although a process may be
sending data on any number of streams or devices, there are just a handful that
are available to all processes.

---

# Output: Standard Output

```
vm$ cat my-file.txt
The `cat` utility writes to standard output.
vm$ mkdir my-directory
vm$ echo But `mkdir` does not.
But `mkdir` does not.
```

---

???

Just like "standard input," "standard output" is considered a "stream" of data.
It is normally directed at a terminal. Most of the applications we've used so
far give some form of feedback on this channel--`mkdir` is one of the
exceptions (though we can change this behavior by using its `--verbose`
option).

---

# Redirecting Standard Output

```
$ cat feline-gifs.txt
cat: feline-gifs.txt: No such file or directory
vm$ find gifs -name \*cat\* > feline-gifs.txt
vm$ cat feline-gifs.txt
gifs/winter/cat-in-snow.gif
gifs/lunchtime/cat-eating-sandwhich.gif
gifs/travel/airplane-pilot-is-a-cat.gif
```

???

...and just like with the standard input stream, we can redirect standard
output to a file. By including the "greater than" character (`>`) after the
command, the output of that command will be written to the file. If the file
doesn't exist, it will created first.

---

:continued:

```
vm$ cat feline-gifs.txt
gifs/winter/cat-in-snow.gif
gifs/lunchtime/cat-eating-sandwhich.gif
gifs/travel/airplane-pilot-is-a-cat.gif
vm$ find gifs -name \*kitten\* > feline-gifs.txt
vm$ cat feline-gifs.txt
gifs/sports/kitten-foosball.gif
vm$
```

???

If the file *does* exist, then its contents will be truncated before writing.

---

:continued:

```
vm$ echo 'My feline gifs:' > feline-gifs.txt
vm$ find gifs -name \*cat\* >> feline-gifs.txt
vm$ find gifs -name \*kitten\* >> feline-gifs.txt
vm$ cat feline-gifs.txt
gifs/winter/cat-in-snow.gif
gifs/lunchtime/cat-eating-sandwhich.gif
gifs/travel/airplane-pilot-is-a-cat.gif
gifs/sports/kitten-foosball.gif
vm$
```

???

Though the shell supports *appending* to existing files through the use of the
character sequence `>>`.

---

```
vm$ node --version >> my-bug-report.txt
vm$ npm --version >> my-bug-report.txt
vm$ grunt --version >> my-bug-report.txt
vm$ cat my-bug-report.txt
v5.3.0
3.3.12
grunt-cli v0.1.13
vm$
```

???

Output redirection is great for troubleshooting and diagnostics because it lets
you capture the state of your system at one moment in time so that you can
share it with others.

---

# Output: Standard Error

```
vm$ ls /home /root
/home:
speaker
ls: cannot open directory /root: Permission denied
vm$
```

???

When most programs wish to communicate information about a problem, they write
that information to the "standard error" stream instead of standard out. This
distinction is easy to miss because shells commonly interleave the two streams.

In this example, some of the text (the listting for the `/home` directory) is
the expected output. This is being written to standard out. The text describing
the permissions error is actually being printed to a separate stream--standard
error.

---

:continued:

```
vm$ cat out-err-mux.txt
+---- ls ----+                +- Terminal -+     +- Display -+
|   /home    | --> stdout --> | ----+      |     |   /home   |
|            |                |     +----> | --> |   error!  |
|   error!   | --> stderr --> | ----+      |     +-----------+
+------------+                +------------+      \           \
                                                   +-----------+
vm$
```

???

Because the shell processes both streams in the same way, we cannot see the
difference in this case.

---

:continued:

```
vm$ ls /home /root > o.txt
ls: cannot open directory /root: Permission denied
vm$ cat o.txt
/home:
speaker
vm$
```

???

It's not until we begin manipulating the streams' destinations that we can
observe this detail.

Although we are redirecting standard out to a file in this example, the text
describing the error is still being printed to the screen.

---

:continued:

```
vm$ cat out-err-demux.txt
                                                 +-- o.txt --+
                           +-------------------> |   /home   |
                           |                     +-----------+
                           |
+ ls > o.txt +             |  +- Terminal -+     +- Display -+
|   /home    | --> stdout -+  |            |     |   error!  |
|            |                |     +----> | --> |           |
|   error!   | --> stderr --> | ----+      |     +-----------+
+------------+                +------------+      \           \
                                                   +-----------+
vm$
```

???

This is because the redirection *only* effects the standard output stream. The
standard error stream continues to flow to the terminal.

---

# Redirecting Standard Error

```
vm$ ls /home /root 2> e.txt
/home:
speaker
vm$ cat e.txt
ls: cannot open directory /root: Permission denied
vm$
```

???

Although the distinction can be surprising at first, it enables information
filtering that would otherwise be impossible. If a command is followed by the
character sequence `2>` and a path to a file, then the standard error stream
will be redirected to that file.

---

:continued:


```
vm$ ls /home /root 2> e.txt > o.txt
vm$ cat o.txt
/home:
speaker
vm$ cat e.txt
ls: cannot open directory /root: Permission denied
vm$
```

???

We can use both output redirection mechanisms at the same time if we wish. In
this case, the we specify the redirection targets does not matter.


---

:continued:

```
vm$ /home /root > t.txt 2>&1
vm$ cat t.txt
/home:
speaker
ls: cannot open directory /root: Permission denied
vm$
```

???

Sometimes, we might want to redirect both streams to the same file. We could
simply specify the same file for both redirections. If we'd like to avoid that
duplication, we can use the special `2>&1` shorthand which means, "redirect
standard error to the same location as standard output."

---

:continued:

```
vm$ /home /root 2>&1 > t.txt
ls: cannot open directory /root: Permission denied
vm$ cat t.txt
/home:
speaker
vm$
```

???

Be careful, though! The order of the redirection modifiers matters when using
this shorthand.

---

- Standard input, standard output, standard error
- Input redirection from file
- Output redirection to file (truncating)
- `/dev/null`
- Output redirection to file (appending)
- Exit codes, `false`, and `true`
- Signals
