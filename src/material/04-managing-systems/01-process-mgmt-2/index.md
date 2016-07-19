# Process Management II

???

Previously, we looked at a few ways to interact with running processes. Those
are only applicable in cases where we had created the process in the current
shell. That detail makes those methods inappropriate for the majority of system
administration tasks. In most cases, we'll need to interact with processes
created by other users and often without the aid of a shell.

Lucky for us, there are plenty of powerful tools for inspecting and managing
processes.

---

# `ps`

```
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 1926 pts/0    00:00:00 ps
vm$
```

???

`ps` is a utility for listing information about active **p**roce**s**ses.
By default, it lists only those processes associated with the same user and
terminal of the invoker.

This isn't particularly useful, though--here, `ps` is verifying that we are
running bash and `ps` itself.

---

:continued:

```
vm$ ps -u
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
speaker   1892  0.0  0.7  21300  3756 pts/0    Ss   17:31   0:00 -bash
speaker   1925  0.0  0.2  17168  1272 pts/0    R+   17:33   0:00 ps -u
vm$
```

???

With the `-u` option, we can begin to appreciate the utility of this
application. We can see information on the process owner, its resource
consumption, and even when it was executed.

We won't go in to all the details here; check out the `man` page for `ps` for
an exhaustive overview.

---

:continued:


```
vm$ ps -aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.5  33600  2920 ?        Ss   17:30   0:00 /sbin/init
root         2  0.0  0.0      0     0 ?        S    17:30   0:00 [kthreadd]
root         3  0.0  0.0      0     0 ?        S    17:30   0:00 [ksoftirqd/0]
root         4  0.0  0.0      0     0 ?        S    17:30   0:00 [kworker/0:0]
root         5  0.0  0.0      0     0 ?        S<   17:30   0:00 [kworker/0:0H]
root         6  0.0  0.0      0     0 ?        S    17:30   0:00 [kworker/u2:0]
root         7  0.0  0.0      0     0 ?        S    17:30   0:00 [rcu_sched]
root         8  0.0  0.0      0     0 ?        S    17:30   0:00 [rcuos/0]
root         9  0.0  0.0      0     0 ?        S    17:30   0:00 [rcu_bh]
root        10  0.0  0.0      0     0 ?        S    17:30   0:00 [rcuob/0]
root        11  0.0  0.0      0     0 ?        S    17:30   0:00 [migration/0]
root        12  0.0  0.0      0     0 ?        S    17:30   0:00 [watchdog/0]
root        13  0.0  0.0      0     0 ?        S<   17:30   0:00 [khelper]
root        14  0.0  0.0      0     0 ?        S    17:30   0:00 [kdevtmpfs]
root        15  0.0  0.0      0     0 ?        S<   17:30   0:00 [netns]
```

???

When used together, the options `-aux` give us a much more detailed synopsis of
all the processes running on the system. This is just a partial list, but we
can see that many of the processes are actually owned by the "root" user.

---

:continued:

```
vm$ ps -aux | grep sleep
speaker   2079  0.0  0.1   5916   616 pts/0    S    18:31   0:00 sleep 3000
speaker   2083  0.0  0.1  10464   892 pts/0    S+   18:31   0:00 grep sleep
```

???

Searching through that list can be a little tough, so `grep` may come in handy.
Because the search pattern appears within the `grep` command itself, a naive
search will include a false positive. It's not a serious problem, but it can be
a little confusing.

---

:continued:

```
vm$ ps -aux | grep slee[p]
speaker   2079  0.0  0.1   5916   616 pts/0    S    18:31   0:00 sleep 3000
```

???

A common trick is to express the search query in terms of a regular expression.
The pattern `slee[p]` matches `sleep` (the name of the process we're after),
but not `slee[p]` (the option we passed to the `grep` utility).

---

# PIDs

???

One important column that has been present in all the `ps` output we've seen so
far is the "PID". This is short for **p**rocess **id**entifier. Most process
management utilities recognize PIDs as references to processes.

---

# `kill`

```
vm$ ps -aux | grep slee[p]
speaker   2079  0.0  0.1   5916   616 pts/0    S    18:31   0:00 sleep 3000
vm$ kill 2079
[1]+  Terminated              sleep 3000
vm$ ps -aux | grep slee[p]
vm$
```

???

`kill` is a utility for sending signals to a process. By default, it sends the
"SIGTERM" signal. Most applications will respond to this signal by exiting
"gracefully."

---

:continued:

```
vm$ sleep 1000 &
[1] 2526
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2526 pts/0    00:00:00 sleep
 2527 pts/0    00:00:00 ps
vm$ kill -s sigint 2526
[1]+  Interrupt               sleep 1000
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2529 pts/0    00:00:00 ps
vm$
```

This is actually the second time we have run across signals in Unix-like
systems. Remember that `Ctrl`+`C` sends a `SIGINT`, or "interrupt" signal. We
can do the same thing for any process using kill.

---

:continued:

```
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2698 pts/0    00:00:03 rouge-process
 2699 pts/0    00:00:00 ps
vm$ kill 2698
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2698 pts/0    00:00:03 rouge-process
 2701 pts/0    00:00:00 ps
vm$ kill -s sigkill 2698
[1]+  Killed                  rouge-process
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2703 pts/0    00:00:00 ps
vm$ 
```

???

Since programs may respond to the (default) `SIGTERM` signal and the `SIGINT`
signal however they wish, those signals may not always end the process.
"stubborn" processes can be reliably cancelled via the `SIGKILL` signal.

Unlike `SIGTERM`, `SIGKILL` will *not* give the application an opportunity to
exit gracefully. Keep this in mind as it may not be acceptable in all cases.

---

# `killall`

```
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2708 pts/0    00:00:00 sleep
 2709 pts/0    00:00:00 sleep
 2710 pts/0    00:00:00 sleep
 2711 pts/0    00:00:00 sleep
 2712 pts/0    00:00:00 ps
vm$ killall sleep
[1]   Terminated              sleep 1000
[2]   Terminated              sleep 1000
[3]-  Terminated              sleep 1000
[4]+  Terminated              sleep 1000
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2714 pts/0    00:00:00 ps
vm$
```

???

The `killall` utility allows you to signal processes according to their name.
This can be convenient in cases where a program has replicated itself a number
of times. A process's name can also be a more convenient "handle" to use as a
reference...

---

:continued:

```
vm$ ps
  PID TTY          TIME CMD
 1892 pts/0    00:00:00 bash
 2719 pts/0    00:00:00 bash
 2724 pts/0    00:00:00 ps
vm$ killall -9 bash
Connection to 127.0.0.1 closed.
pc$
```

???

...just be sure you know exactly which processes will match the name.

---

# `top`

```
vm$ top
top - 19:50:44 up  2:19,  1 user,  load average: 0.00, 0.01, 0.05
Tasks:  72 total,   1 running,  71 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.3 sy,  0.0 ni, 99.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem:    501764 total,   364180 used,   137584 free,    53756 buffers
KiB Swap:        0 total,        0 used,        0 free.   131620 cached Mem

  PID USER      PR  NI    VIRT    RES    SHR S %CPU %MEM     TIME+ COMMAND
    1 root      20   0   33600   2920   1492 S  0.0  0.6   0:00.76 init
    2 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kthreadd
    3 root      20   0       0      0      0 S  0.0  0.0   0:00.05 ksoftirqd/0
    4 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kworker/0:0
    5 root       0 -20       0      0      0 S  0.0  0.0   0:00.00 kworker/0:0H
    6 root      20   0       0      0      0 S  0.0  0.0   0:00.00 kworker/u2:0
    7 root      20   0       0      0      0 S  0.0  0.0   0:00.27 rcu_sched
    8 root      20   0       0      0      0 S  0.0  0.0   0:00.45 rcuos/0
    9 root      20   0       0      0      0 S  0.0  0.0   0:00.00 rcu_bh
   10 root      20   0       0      0      0 S  0.0  0.0   0:00.00 rcuob/0
   11 root      rt   0       0      0      0 S  0.0  0.0   0:00.00 migration/0
```

???

Finally, the `top` utility provides a "live" view of running processes. The
output will update on a regular interval, and it accepts various keystrokes for
modifying the visualization. You can learn more by pressing `?` (that's `Shift`
and the forward slash `/` key). Similar to the `less` utility, you may exit by
pressing the `q` key.
