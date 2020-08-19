1. The output of `sudo echo ~` should be `/home/vagrant`. That's the same as if
   we didn't use `sudo` at all. Remember that the shell makes its substutions
   *before* the command runs. `sudo` hasn't changed the active user at that
   moment. So even though `echo` does run as the root user, it's being invoked
   with the value `/home/vagrant`. It's just like we had written `sudo echo
   /home/vagrant`.
2. Remember that `sudo` is an application that interpets the options you pass
   it as a new command. It may look a little strange to give `sudo` a `sudo`
   command, but the application still works the same way as the other examples
   in this chapter.

   In `sudo sudo whoami`, `sudo` receives `sudo whoami` and runs that command
   as the root user. Then, `sudo whoami`, running as root, invokes the `whoami`
   command as root.

   The overall effect is the same as `sudo whoami`: `whoami` runs as the root
   user, and so we see `root` printed to the screen. There's not much reason to
   use `sudo` twice like that, so you can save yourself the extra typing!
