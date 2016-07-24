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

We previously discussed options and environment variables in
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

---

:continued:

```
vm$ cat input.txt
+-----------+
|           |
|           |
+-----------+                +- Terminal -+     +- sort -+
 \           \ --> stdin --> | ---------> | --> |        |
  +- Keyboard +              +------------+     +--------+
vm$
```

???

In this way, `sort` is no different than the terminal program we have been
using all along. When we invoke `sort`, the "input stream" that normally flows
from our keyboard and into the terminal is instead interpreted by `sort`
itself. This is considered a "stream" because its contents are delivered over
time, and the end is not known in advance.

The stream typically originates from the keyboard, but as we'll see in just a
moment, this is not always the case.

---

:continued:

```
vm$ grep r
firefox
firefox
edge
chromium
chromium
^D
vm$
```

Many utilities that normally expect a file name as an option will read from
standard input when no such file is supplied. For example, both `grep` and
`sed` behave this way.

---

# Redirecting Standard Input

!["Left Turn" sign](left-turn.jpg)

"[Left Turn](https://www.flickr.com/photos/nestorgalina/4799836020/)" by
[Nestor Galina](https://www.flickr.com/photos/nestorgalina/) is licensed under
[CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)

???

As we've seen, the terminal's default behavior is to supply new processes with
its own input stream. We can override this behavior and provide a different
input stream.

---

:continued:

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

By including a "less than" character (`<`) at the end of the command, we can
specify the name of a file. The contents of that file will be interpreted as
though we had entered them into the terminal directly.

---

:continued:

```
vm$ cat input-redirected.txt
+-----------+
|           |
|           |
+-----------+                +- Terminal -+     +- sort < i.txt -+
 \           \ --> stdin --> |            |  +> |                |
  +- Keyboard +              +------------+  |  +----------------+
                                             |
 +-- i.txt --+                               |
 |           | ------------------------------+
 +-----------+
vm$
```

???

By using input redirection, we are configuring the process to read from a
stream other than standard input--a file named `i.txt` in this example.

---

:continued:

```
vm$ sort < cereal.txt
cap'n crunch
fruit loops
lucky charms
vm$ sort cereal.txt
cap'n crunch
fruit loops
lucky charms
vm$
```

???

Frankly, for those programs that accept a file name as an option, redirecting
input like this isn't very compelling. For most cases, the difference is
negligible.

---

:continued:

```
vm$ mail hello@bocoup.com --subject 'Keep it up!'
Dearest Bocoup,

You are doing wonderful things. Please continue to do them.

Mike
~.
vm$
```

???

On the other hand, some programs *only* operate on the "standard input" stream.
`mail` is one such program--it is a utility for sending e-mail messages.

---

:continued:

```
vm$ cat my-message.txt
Dearest Bocoup,

You are doing wonderful things. Please continue to do them.

Mike
vm$ mail hello@bocoup.com --subject 'Keep it up!' < my-message.txt
vm$
```

???

As much as we might enjoy working on the command line, the shell is not a great
environment to author large amounts of copy. We'd much rather use our own
editor (`nano` perhaps?) to compose a message. Input redirection allows us to
send messages from files we created elsewhere.

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

???

Just like "standard input," "standard output" is considered a "stream" of data.
It is normally directed at a terminal. Most of the applications we've used so
far give some form of feedback on this channel--`mkdir` is one of the
exceptions (though we can change this behavior by using its `--verbose`
option).

---

# Redirecting Standard Output

![Israeli crosswalk](israeli-crosswalk.jpg)

"[Israeli crosswalk](https://www.flickr.com/photos/modenadude/5283857273/)" by
[Asim Bharwani](https://www.flickr.com/photos/modenadude/) is licensed under
[CC BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/)

???

Just like with the standard input stream, we can redirect standard
output to a file.

---

:continued:

```
vm$ cat feline-gifs.txt
cat: feline-gifs.txt: No such file or directory
vm$ find gifs -name \*cat\* > feline-gifs.txt
vm$ cat feline-gifs.txt
gifs/winter/cat-in-snow.gif
gifs/lunchtime/cat-eating-sandwhich.gif
gifs/travel/airplane-pilot-is-a-cat.gif
```

???

By including the "greater than" character (`>`) after the
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

In this example, some of the text (the listing for the `/home` directory) is
the expected output. This is being written to standard out. The text describing
the permissions error is actually being printed to a separate stream--standard
error.

---

:continued:

```
vm$ cat stdio-mux.txt
+---- ls ----+                +- Terminal -+     +- Display -+
|   /home    | --> stdout --> | ---------> | --> |   /home   |
|   error!   | --> stderr --> | ---------> | --> |   error!  |
+------------+                +------------+     +-----------+
                                                  \           \
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
vm$ cat stdio-demux-out.txt
                                                 +-- o.txt --+
                           +-------------------> |   /home   |
                           |                     +-----------+
                           |
+ ls > o.txt +             |  +- Terminal -+     +- Display -+
|   /home    | --> stdout -+  |            |     |   error!  |
|   error!   | --> stderr --> | ---------> | --> |           |
+------------+                +------------+     +-----------+
                                                  \           \
                                                   +-----------+
vm$
```

???

This is because the redirection *only* effects the standard output stream. The
standard error stream continues to flow to the terminal.

---

# Redirecting Standard Error

![Detour](detour.jpg)

"[Detour](https://www.flickr.com/photos/bionicteaching/14586204543/)" by [Tom
Woodward](https://www.flickr.com/photos/bionicteaching/) is licensed under [CC
BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)

???

Although the distinction can be surprising at first, it enables information
filtering that would otherwise be impossible. We can "pick out" *just* the text
that describes errors and redirect it to some other location. Of course, we'll
need to learn a little more syntax first.

---

:continued:

```
vm$ ls /home /root 2> e.txt
/home:
speaker
vm$ cat e.txt
ls: cannot open directory /root: Permission denied
vm$
```

???

If a command is followed by the character sequence `2>` and a path to a file,
then the standard error stream will be redirected to that file.

---

:continued:

```
vm$ cat stdio-demux-err.txt

+ ls 2> e.txt +                +- Terminal -+     +- Display -+
|   /home     | --> stdout --> | ---------> | --> |   /home   |
|   error!    | --> stderr -+  |            |     |           |
+-------------+             |  +------------+     +-----------+
                            |                      \           \
                            |                       +-----------+
                            |                     +-- e.txt --+
                            +-------------------> |   error!  |
                                                  +-----------+
vm$
```

???

In this case, we still see some text printed to the terminal because we've only
redirected the standard error stream.

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
vm$ cat stdio-demux-both.txt
                                              +-- o.txt --+
                           +----------------> |   /home   |
                           |                  +-----------+
 ls > o.txt \              |
+   2> e.txt +             |  +- Terminal -+  +- Display -+
|   /home    | --> stdout -+  |            |  |           |
|   error!   | --> stderr -+  |            |  |           |
+------------+             |  +------------+  +-----------+
                           |                   \           \
                           |                    +-----------+
                           |                  +-- e.txt --+
                           +----------------> |   error!  |
                                              +-----------+
vm$
```

???

In this case, we are completely bypassing the terminal.

---

:continued:

```
vm$ ls /home /root > t.txt 2>&1
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
vm$ ls /home /root 2>&1 > t.txt
ls: cannot open directory /root: Permission denied
vm$ cat t.txt
/home:
speaker
vm$
```

???

Be careful, though! The terminal applies the operators from left to right, so
their order matters when using the `2>&1` shorthand:

1. (initial state)
   - `ls` standard output -> terminal standard output
   - `ls` standard error -> terminal standard error
2. (applying `2>&1`)
   - `ls` standard output -> terminal standard output
   - `ls` standard error -> terminal standard output (because this is the
     destination of `ls`'s standard output at this moment)
3. (applying `> t.txt`)
   - `ls` standard output -> `t.txt` file
   - `ls` standard error -> terminal standard output

---

# Output: Exit status

???

As we've seen, a process can terminate for any number of reasons. In the ideal
cases, processes end because they have successfully "done their job" and have
nothing further to do. In reality, processes are often prevented from
completing their intended purpose.

---

:continued:

```
vm$ cat .
cat: .: Is a directory
vm$
```

We've been discussing one way processes communicate this distinction: they often
output different information to the standard output stream and the standard
error stream. In the best cases, this allows programs to concisely describe
exactly what went wrong.

---

:continued:

```
vm$ cat .
cat: .: Is a directory
vm$ less .
. is a directory
vm$
```

???

But this also allows programs to vary slightly in the way they communicate the
same errors. The "standard" in "standard error" describes the stream but *not*
its contents.

---

:continued:

```
vm$ pwd
/home/sally
vm$ echo $?
0
vm$ $ rm ..
rm: cannot remove ‘..’: Is a directory
vm$ echo $?
1
vm$
```

As a process completes, it emits a number that describes the conditions that
caused it to end. We can access the exit status of the previous command with
the special variable named `$?`.

A status of `0` signifies "the process completed normally." Any other value
indicates that there was an error.

This number is not nearly as descriptive as the text written to the standard
error stream...

---

:continued:

```
vm$ cat .
cat: .: Is a directory
vm$ echo $?
1
vm$ less .
. is a directory
vm$ echo $?
1
vm$
```

???

...but it is far more consistent. This makes some intuitive sense; as an
integer value, there is less room for different "phrasings" between programs.

---

:continued:

```
vm$ sleep notanumber
sleep: invalid time interval ‘notanumber’
vm$ echo $?
1
vm$ sleep 100
^C
vm$ echo $?
130
vm$
```

???

The value `1` is the most common exit status for errors; many applications
treat it as a "catch all" for any error. However, programs may other non-zero
values to communicate more fine-grained information about the error.

In this example, `sleep` reports one status code for faulty input and a
different status code when it is interrupted by a signal.

For humans typing commands into the terminal and reading the output, the
regularity of exit status codes is a poor substitute for the expressiveness of
the standard output streams. As we'll see in :chapter:process-combination:,
this communication channel is much more useful within shell scripts.

---

:continued:

```
vm$ cat .
cat: .: Is a directory
vm$ echo $?
1
vm$ echo $?
0
vm$
```

???

One final caveat: don't foget that `echo` is itself a program! When we use it
to inspect the value of the `$?` variable, we're also causing the shell to
overwrite that value.

---

:continued:

```
vm$ cat .
cat: .: Is a directory
vm$ catresult=$?
vm$ echo $catresult
1
vm$ echo $?
0
vm$ echo $catresult
1
vm$
```

???

If we need to re-use a process's exit status, we'll have to store it in a
variable immediately after that process completes. Subsequent processes may
change the value of the `$?` variable, but the variable we created won't be
affected.

---

# In Review

Processes have access to four common input channels:

- Options (specified once during creation)
- Environment variables (specified once during creation)
- Standard input stream
- Signals

Processes have have access to three common output channels:

- Standard output stream
- Standard error stream
- Exit status (specified once when ending)

Although a program may be written to use any number of additional input/output
channels.
