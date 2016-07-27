In all cases, scripts should be authored so that they can be executed as
commands, regardless of the current user's default shell.

1. Write a script that greets the current user by name. If it is invoked with
   `--help`, it should print an explanation to standard output and exit
   *without* greeting the user. If it is invoked with any other options, it
   should print an error message to standard error and exit with a status code
   of `1` (again, without greeting the user).

2. Extend the script from the previous step to also accept the `-h` flag.
   Specifying this should have the same effect as `--help`.

3. Write a script that copies itself into the user's "home" directory. The
   script should work regardless of where it is placed on the file system.

4. Refer back to the exercise for :chapter:command-invocation:. Write a script
   that automatically solves that exercise. Note that the solution for the
   final step of that exercise are dynamic; your script should take this into
   account. You'll probably need to use the `grep` utility, and the `date`
   utility (see `man date` for more information). Don't forget to reset the
   exercise with `--reset`!
