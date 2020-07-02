1. The output of `sudo` should be `/home/vagrant`. That's the same as if we
   didn't use `sudo` at all. Remember that the shell makes its substutions
   *before* the command runs. `sudo` hasn't changed the active user at that
   moment. So even though `echo` does run as the root user, it's being invoked
   with the value `/home/vagrant`. It's just like we had written `sudo echo
   /home/vagrant`.
