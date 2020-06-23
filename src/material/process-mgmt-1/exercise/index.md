`tac` is a program that collects input and prints it out in reverse. It's like
`cat` but backwards (which might explain the silly name).

```terminal
vm$ tac
&#8203;first
&#8203;second
&#8203;third
&#8203;fourth
&#8203;^D
fourth
third
second
first
vm$ 
```

Let's use `tac` to practice with managing multiple concurrent processes.

We'll be sending signals to the `tac` command in this exercise, but it's easy
to make a mistake and send the signal to the shell instead. That may cause you
to log out of the virtual machine. Remember: the `vm$` prompt lets you know
that you're executing commands inside the virtual machine. If you see a
different prompt, then you have likely logged out. You can reconnect to the
virtual machine using the `vagrant ssh` command. For a refresher on this, refer
back to :chapter:vagrant:.

1. Run `tac` and type `1` followed by a new line, then `2` followed by a new
   line, and finally `3` followed by a new line. Now put the `tac` process into
   the background. What is the process's "job" ID?

2. Run `tac` again. This time, type `a` followed by a new line, then `b`
   followed by a new line, and finally `c` followed by a new line. Now put this
   second `tac` process into the background. What is the process's "job" ID?

3. Bring the first `tac` process into the foreground. (You'll need your answer
   to question number 1 to do this.)

4. Type `4` followed by a new line. If you send a "SIGINT" signal to this
   process, what do you expect to see printed to the terminal? Send a SIGINT
   signal. What was printed?

5. Bring the second `tac` process into the foreground. (You'll need your answer
   to question number 2 to do this).

6. Type `d` followed by a new line. If you send the "end of file" character to
   this process, what do you expect to see printed to the terminal? Send the
   "end of file" character to the process. What was printed?
