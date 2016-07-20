---
title: Process Management I
---

???

After invoking a program and starting a process, there are a number of reasons
you may want to move on before the process is complete. However, these
processes generally maintain control of the terminal window until they
terminate. In this section, we'll cover the most common cases of long-running
processes and how you can regain control of the terminal in each.

---

# Case #1: "I want to cancel this work"

```
vm$ find / -name nemo
```

???

Occasionally, you may mis-type a command and accidentally start a process that
takes a very long time to complete. In this example, we're using the `find`
command to search for all files named "nemo" in the entire file system. We most
likely intended to limit our search to a more specific location (e.g. our $HOME
directory).

We could simply open a new terminal window and re-enter the command. But in the
mean time, we will have a useless terminal window open, busy doing unnecessary
work.

Instead, we'll send a "signal" to the active process.

---

:continued:

```
vm$ find / -name nemo
^C
vm$
```

???

By holding the `Ctrl` key and then processing the `c` key, we can send a
special "SIGINT" signal to the current process. Most applications (including
`find`) will respond to this by terminating.

Now that we've cancelled that work, we can use the same terminal window to
re-enter the correct command.

---

# Case #2: "I'm done entering data"

```
vm$ sort
murdock, matt
stark, tony
rogers, steve
banner, bruce
parker, peter
romanov, natalya
```

???

Many applications that accept files as arguments can also operate on "standard
input." In these cases, instead of reading the contents of the file, the
program accepts input from the terminal directly. `sort` is one such
application.

The problem is that we need some way to signal that we are done. If we try the
same approach as the previous use case and press `Ctrl`+`C`, the process will
terminate without giving us results. In this case, we need a way to signal that
we are done entering input and would like the program to continue its work.

---

:continued:

```
vm$ sort
murdock, matt
stark, tony
rogers, steve
banner, bruce
parker, peter
romanova, natasha
^D
banner, bruce
murdock, matt
parker, peter
rogers, steve
romanova, natasha
stark, tony
vm$
```

???

By holding the `Ctrl` key and pressing the `d` key, we are sending the "end of
file" character. This is a little counter intuitive; just remember that these
programs are written to accept files as input, and the "end of file" character
makes more sense in that context.

Most shells interpret this as an indication that the user is done entering
commands, so this will close the terminal window if you enter it on the command
line directly.

---

# Case #3: "I'd like to do other things while this completes."

```
vm$ find / -name nemo
```

???

You will sometimes intentionally run processes that you expect to take a long
time to complete. In these cases, you may like to get other additional work
done while you wait. You could open another terminal window, but this can be
inefficient (and may clutter up your desktop environment).

---

:continued:

```
vm$ find / -name nemo
^Z
[1]+  Stopped                 find / -name nemo
vm$
```

???

By holding the `Ctrl` key and then processing the `z` key, we can send a
special "SIGTSTP" signal to the current process. This causes the process to
stop (but not exit) and release the terminal.


---

:continued:

```
vm$ jobs
[1]+  Stopped                 find / -name nemo
vm$ bg 1
[1]+ find / -name nemo &
vm$ jobs
[1]+  Running                 find / -name nemo &
```

???

The `find` process is known as a "job," and we can verify that it is still
present (but "stopped") with the `jobs` command. While it is "stopped", it is
no longer doing any work. We can use the `bg` command to set it running again.
There can be any number of jobs running at once, so we need to refer to the job
we want by ts "job ID" (`1` in this case).

---

:continued:

```
vm$ jobs
[1]+  Running                 find / -name nemo &
vm$ fg 1
```

???

Finally, if we want to return to the job before it is finished, we can use the
`fg` command (again, referencing it by "job ID").

---

# In Review

- Key combinations
  - `Ctrl`+`c` - terminate the current process
  - `Ctrl`+`d` - signal that you are done entering text
  - `Ctrl`+`z` - make the current process into a "background job"
- Utilities
  - `jobs` - list all active jobs (note: "active" does not mean "running")
  - `bg` - change a job's status from "stopped" to "running"
  - `fg` - bring a background job to the foreground
