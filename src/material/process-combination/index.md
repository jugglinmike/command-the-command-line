---
title: Process Combination
layout: chapter.html
---

Unix-like systems provide a number of facilities for composing processes. As
we'll see, this makes it possible to break down complex problems into distinct
pieces and then solve each part with generic utilities.

---

```terminal
vm$ cat process-wiring.txt
Process A                                         Process B
+----------------+                +-----------------------+
|     (outputs)  |                |   (inputs)            |
|   standard out O---         --> O arguments             |
|                |   \       /    |                       |
| standard error O----+-----+---> O environment variables |
|                |   /       \    |                       |
|    exit status O---         --> O standard input        |
|                |                |                       |
+----------------+                +-----------------------+
vm$ 
```

???

We're going to learn how we can "wire together" processes, drawing on our
understanding of input and ouput from :chapter:process-bounds:.

---

# Capturing Output with Command Substitution

```terminal
vm$ cat process-wiring-cmd-sub.txt
Process A                                         Process B
+----------------+                +-----------------------+
|     (outputs)  |                |   (inputs)            |
|   standard out O---         --> O arguments             |
|                |   \       /    |                       |
| standard error O----+-----+---> O environment variables |
|                |                |                       |
|                O                O                       |
|                |    command     |                       |
+----------------+  substitution  +-----------------------+
vm$ 
```

???

Command substitution is a technique that allows us to capture the data a
process writes to standard output.

---

:continued:

```terminal
vm$ user=`whoami`
vm$ echo $user
vagrant
vm$ user=`sudo whoami`
vm$ echo $user
root
vm$ 
```

???

By using the backtick character, we can place commands in locations that up to
now, we have only placed values. Before executing the "outer" command, the
shell will intervene by creating new process for the "nested" command. It will
gather up all the data the "nested" process writes to the standard output
stream, and when the process exits, it will insert that data in the place of
the nested command.

---

:continued:

```terminal
vm$ find /media/shared -user `whoami`
/media/shared/music/Cake - You Part the Waters.mp3
/media/shared/movies/The Royal Tenenbaums.mkv
vm$ find /media/shared -user `sudo whoami`
/media/shared/documents/boring-admin-protocol.txt
/media/shared/documents/usage-statistics.txt
vm$ 
```

???

We're not limited to variable assignment, either. We can use this syntax to
feed the output of one command into the options of another.

---

:continued:

```terminal
vm$ wc `find /media/documents -user `sudo whoami``
find: missing argument to `-user'
wc: sudo: No such file or directory
wc: whoami: No such file or directory
vm$ 
```

???

On rare occassion, you may need to use a command substitution within another
command substitution. In these cases, the backtick character can't help us.

The terminal interprets the command in this example by reading from
left-to-right:

- the command `wc`
- the command `find /media/documents -user` (which produces the first error)
- the options 'sudo whoami' (which are passed to `wc`, producing the second and
  third error)
- an empty command


---

:continued:

```terminal
vm$ wc $(find /media/documents -user $(sudo whoami))
  90  510 2816 /media/shared/documents/boring-admin-protocol.txt
  29  174  839 /media/shared/documents/usage-statistics.txt
 119  684 3655 total
vm$ 
```

???

In cases like these, we'll want to use an alternate syntax for command
substition: the sequence `$(` to "open" the nested command, and the "close
parenthsis" character (`)`) to "close" it.

Nesting works as intended because the difference in the "open" and "close"
sequences avoids the ambiguity of backticks.

Generally, it's a good idea to stick to this slightly more verbose syntax, even
when you aren't nesting. This makes it easier to re-factor and re-use commands
later. You'll find examples of both approaches on the web, so it's important to
be aware of each of them.

---

# Forwarding Exit Status Codes

```terminal
vm$ cat process-wiring-logical.txt
Process A                                         Process B
+----------------+                +-----------------------+
|     (outputs)  |                |   (inputs)            |
|                O            --> O arguments             |
|                |           /    |                       |
|                O    +-----+---> O environment variables |
|                |   /            |                       |
|    exit status O---             O                       |
|                | logical cntrl  |                       |
+----------------+   operators    +-----------------------+
vm$ 
```

???

We actually already discussed the most direct means of capturing process exit
status--the `$?` variable.

Admittedly, the contents of the standard output and standard error streams are
usually more helpful than exit codes for human users. In :chapter:scripting:,
we'll see how this value is essential to controlling execution flow while
automating tasks.

---

# Connecting Streams with Pipes

```terminal
vm$ cat process-wiring-pipes.txt
Process A                                         Process B
+----------------+                +-----------------------+
|     (outputs)  |                |   (inputs)            |
|   standard out O---             O                       |
|                |   \            |                       |
| standard error O----+-----+     O                       |
|                |           \    |                       |
|                O            --> O standard input        |
|                |                |                       |
+----------------+     pipes      +-----------------------+
vm$ 
```

???

In Unix-like systems, the word "pipe" describes a connection between the output
of one process with the input of another. This extends the anology of data
"streams"--just as in the physical sense of the terms, a Unix pipe can direct
the flow of a stream between two places.

---

:continued:

```terminal
vm$ grep papayawhip src/style.css | wc -l
2
vm$ 
```

???

The standard output of one process can be "piped" into the standard input of
another by separating two commands with a veritcal bar character (`|`). The
entire string of commands is known as a "pipeline."

This example uses `grep` to locate all the lines in a file that contain the
text `z-index`, forwarding the result to the `wc` program, which (thanks to the
`-l` option) counts the number of lines.

---

:continued:

```terminal
vm$ cat src/style.css | grep papayawhip | wc -l
2
vm$ 
```

???

Pipelines may contain any number of separate commands.

We can extend the previous pipeline by first reading the file using `cat`.
Although `grep` happens to have the ability to read files directly, it can also
operate on the standard input stream. This usage make's `grep`'s role as a
"filter" more clear.

---

:continued:

```terminal
vm$ cat pipeline.txt
+------------------------+     +---------------------+      +-------+
|   cat src/style.css    | +-> |   grep papayawhip   |  +-> | wc -l |
+------------------------+ |   +---------------------+  p   +-------+
         |                 p             |              i       |
         v                 i             v              p       v
body {                     p   color: papayawhip;       e   2
  color: papayawhip;       e   background: papayawhip; -+
}                          |
header {                  -+
  background: papayawhip;
  color: #333;
}
vm$ 
```

???

Pipelines are a powerful way to apply the various "filtering" utilities. `wc`
is built without any knowledge of `grep`--it only operates on the input stream
it is provided. More importantly, understanding `wc` does not require
understanding `grep`, meaning that you can learn and incorporate new tools
slowly over time.

---

# Gathering Streams Into Options

```terminal
vm$ cat process-wiring-pipes-and-xargs.txt
Process A                                         Process B
+----------------+                +-----------------------+
|     (outputs)  |                |   (inputs)            |
|   standard out O---         --> O arguments             |
|                |   \       /    |                       |
| standard error O----+-----+     O                       |
|                |                |                       |
|                O                O                       |
|                |                |                       |
+----------------+ pipes + xargs  +-----------------------+
vm$ 
```

???

Sometimes we'd like use the contents of the standard output stream as an option
for another command.

---

```terminal
vm$ find documents -type f -newermt 'last week'
documents/year plan.odf
documents/questionnaire.odf
vm$ 
```

???

Since `find` is built to locate files and write their names to standard output,
it is commonly used in this way. Here, we're using the utility to find all the
files within the `documents/` directory that have been changed in the past
week.

---

:continued:

```terminal
vm$ find documents -type f -newermt 'last week' | sed 's/hot dog/banana/g'
documents/year plan.txt
documents/questionnaire.txt
vm$ 
```

???

If we wanted to replace words in just those files, a pipe on its own wouldn't
help us. This command attempts to replace the words in the list of file names,
not the content of the files.

---

:continued:

```terminal
vm$ find documents -type f -newermt 'last week' | cat | sed 's/hot dog/banana/g'
# Year plan

January: learn to use the Terminal
Februrary: eat 50 bananas
```

???

Inserting `cat` in the pipeline partially solves the problem. Now `sed`
receives a stream containing the contents of the files, and it replaces the
text as specified.

The problem is the format of the result. We end up with a single stream of text
on standard output. The original files are unmodified, and there is no good way
to split the output back into separate pieces.

We really need to provide *files* to `sed` in this case (not a stream), because
we want to modify each source file in-place.

---

:continued:

```terminal
vm$ sed -i 's/hot dog/banana/g' $(find documents -type f -newermt 'last week')
sed: can't read documents/year: No such file or directory
sed: can't read plan.txt: No such file or directory
vm$ sed -i 's/hot dog/banana/g' documents/year plan.txt documents/questionnaire.txt
sed: can't read documents/year: No such file or directory
sed: can't read plan.txt: No such file or directory
vm$ 
```

???

We might be tempted to use command substitution for this task. This approach
works in some cases, but it falls apart if any of the files contain white
space. The `sed` program receives a list of options, but the fact that one of
the spaces is part of a file name (and *not* a separator) is lost.

If you are sure that all the possible files have "normal" names, then command
substitution is perfectly acceptable. In other cases, though, a more robust
approach is necessary.

---

# `xargs`

## Build commands from standard input

```terminal
vm$ man xargs
XARGS(1)              General Commands Manual              XARGS(1)

NAME
       xargs - build and execute command lines from standard input

Manual page xargs(1) line 1 (press h for help or q to quit)
```

???

The `xargs` utility is designed for exactly this use case. It executes a
command on our behalf by combining the options it receives with the standard
input.

---

:continued:

```terminal
vm$ find documents -type f -newermt 'last week' -print0 | xargs -0 sed -i 's/hot dog/banana/g'
vm$ 
```

???

This command has become quite long!

We've added `-print0` as a new option to the invocation of `find`. That new
option instructs `find` to use the special "null byte" as a separator between
files.

We're piping this value into the new `xargs` utility. Note that we're
specifying `-0` as an option for `xargs`. This means, "split the standard input
into pieces for every 'null byte' character."

---

# "I never want to type that again."

![Cat sleeping on a computer keyboard](sleeping-cat.jpg)

"[Kuba sleeping on
keyboard](https://www.flickr.com/photos/8256802@N06/4652972696/)" by [Stefan
Zdzialek](https://www.flickr.com/photos/8256802@N06/) is licensed under [CC
BY-ND 2.0](https://creativecommons.org/licenses/by-nd/2.0/)

???

The "robust" solution is admittedly a hassle to type. As noted earlier, if you
are in control of the input files, and you consistently avoid names with
special characters, then the more direct "command substitution" approach is
fine.

Thankfully, there are great methods for storing (and documenting) complex
commands--we'll cover those in :chapter:scripting:.

The main takeaways from this final example are that output streams can be
supplied as command options, and that `xargs` is available when the streams
might contain special characters.

---

# In Review

- Command substitution
  - Purpose: capture the data a process writes to standard output
  - Syntax: backticks (<code>\`</code>) or dollar-sign-with-parenthesis (`$(`
    and `)`)
- Exit status codes
  - Purpose: programatically determine whether a command succeeded or failed
  - Syntax: the `$?` variable
- Pipes
  - Purpose: connect the standard output stream of one process to the standard
    input stream of another
  - Syntax: the vertical bar character (`|`)
