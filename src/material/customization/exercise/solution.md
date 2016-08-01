1. The virtual environment is using `bash`. As we've seen, that shell invokes
   the `~/.profile` file only when users log in. If we place the "greeting"
   command (e.g. `echo Hello`) in that file, it will only be executed only
   then.

   We can verify this by logging out of the virtual machine and running
   `vagrant up`. The greeting should be displayed here. If we run `bash`, the
   greeting should *not* be displayed.
2. We've seen how the `PS1` value controls the contents of the command prompt.
   We also know that command substitution allows us to store the output of a
   command in an environment variable.

   We could place the following text in `~/.profile`:

   ```
   PS1="$(date) $ "
   ```

   But this has a couple of problems.

   First, the value is "static." It describes the time when the file was
   sourced, but it doesn't update as time goes by (press the `Enter` key a few
   times to see this). We can address this by "escaping" the dollar sign
   character (`$`) in the command substitution syntax. This way, the shell will
   not expand it when the configuration file is first sourced:

   ```
   PS1="\$(date) $ "
   ```

   Now the value of `PS1` should be re-interpreted every time a new prompt is
   displayed.

   The instructions specifically say that this prompt should also apply when we
   invoke `bash` from the terminal. Our current solution does not satisfy this
   requirement:

   ```
   Wed Aug  3 16:58:15 UTC 1970 $ bash
   vm$
   ```

   When we start a new shell by invoking Bash, the new shell is *not* a "login
   shell." As we've seen, Bash only sources `~/.profile` for login
   shells--otherwise it sources `~/.bashrc`. We can start by moving the `PS1`
   definition to a new file named `~/.bashrc`, but then we would have the
   opposite problem: the command prompt would be modified *only* when we invoke
   `bash` from the command line. We could define the variable in both files,
   but maintaining the duplication would be a hassle. Instead, we'll source the
   `~/.bashrc` file from the `~/.profile` file by adding the following line to
   `~/.profile`:

   ```
   [ -f ~/.bashrc ] && . ~/.bashrc
   ```

   We're using the "test" command (written here with the open bracket
   character) to be extra safe--we will only source that file if it is defined.
3. We've seen that the system provides an executable file named `ls`:

   ```
   vm$ which ls
   /bin/ls
   ```

   So it may be surprising that we are defining an alias with the same name.
   This is perfectly valid, though--when we issue commands, the alias will take
   precedence over the executable file.

   In this case, the alias "name" is `ls`, and the alias "value" is `ls
   --color`. Place the following alias definition in the new `~/.bashrc` file.

   ```
   alias ls="ls --color"
   ```
4. This alias is a little odd (and generally useless), but it's technically
   valid. The "name" is `alias` and the "value" is `alias`. Place the following
   alias definition in the `~/.bashrc` file:

   ```
   alias alias=alias
   ```
5. The `man` page for `nano` has a section named "INITIALIZATION FILE" that
   references a separate page named "nanorc". `man nanorc` is full of
   documentation for how a file named `~/.nanorc` can modify the application's
   behavior. We'll want to create that file and insert the following text:

   ```
   syntax "todo" ".*"
   color black,yellow "TODO"
   ```
