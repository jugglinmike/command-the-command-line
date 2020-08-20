1. Recall from :chapter:command-invocation: that when we run the following
   command:

       echo ~

   the shell steps in and replaces the `~` with a path to the current
   user's "home" directory. Consider the following command:

       sudo echo ~

   What do you expect will happen when we run that?
2. What does the following command mean?

       sudo sudo whoami

   Are there any reasons to use `sudo` twice like that?
