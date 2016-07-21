1. We could invoke the program and type out each file name as an option. A
   quick look inside the directory (`ls /bin`) shows close to 150 files,
   though. Finding all the ones that satisfy the criteria would be pretty
   boring. This looks like a job for shell expansion.

   We've already seen how the shell expands `*` to potentially include many
   files. Let's split task into two sub-problems: finding the files that
   contain a `t` and finding files that end in `s`.

   - The pattern `/bin/*s` matches all the files that end in `s`.
   - The pattern `/bin/*t*` matches all the files that contain `t`.

   If we specify both patterns, then `invoker` will "see" the files in both
   sets:

       vm$ invoker /bin/*s /bin/*t*

2. The shell will replace the text `$bucks` with the value of the environment
   variable named `bucks` unless we take special precautions to prevent it. We
   can do this by "escaping" the special dollar sign character (`$`) by writing
   a "backslash" character (`\`) just before it:

       vm$ invoker Making the big \$bucks.

   We could also wrap the string in single quotation mark characters (`'`) to
   get a similar effect:

       vm$ invoker 'Making the big $bucks.'

   Notice how using double quotation mark characters (`"`) does not work here.
   That's because shell expansion still occurs between those characters.

   We're taking all this special care to prevent shell expansion from
   occurring, but we could also solve the problem by embracing shell expansion.
   The goal is to provide the string "Making the big $bucks." to the `invoker`
   process; we can utilize environment variables and shell expansion to do this
   if we want to be tricky:

       vm$ bucks=\$bucks
       vm$ invoker Making the big $bucks.

   First, we storing the value '$bucks' in the environment variable named
   'bucks' (note the "backslash" character). Then we invoke the program using
   the variable in the options. We expect the shell to replace the string
   `$bucks`, but since it uses the value `$bucks`, we still satisfy the
   `invoker` program.

3. We're looking to use all the possible combinations of these two options.
   Remember that the "short" version of an option is equivalent to its "long"
   form. That's why `-w --word` is not a valid solution. Also recall that
   "short" options may be specified separately or together, so `-w -x` and
   `-wx` are both valid. The valid solutions are:

   - `-w -x`
   - `-x -w`
   - `-wx`
   - `-xw`
   - `--word -x`
   - `-x --word`

4. If we set the variables in our current environment, they may not be
   "exported" to the `invoker` child process. For instance:

       vm$ foo=bar
       vm$ LIMIT=max
       vm$ echo $foo $LIMIT
       bar max
       vm$ invoker
       'foo' isn't set.
       'LIMIT' isn't set.
       vm$

   ...so we'll need to formally "export" the values:

       vm$ export foo=bar
       vm$ export LIMIT=max
       vm$ echo $foo $LIMIT
       bar max
       vm$ invoker
       Success!
       vm$

   Alternatively, we could specify the variables as we invoke the command. With
   this syntax, the variables will *not* be defined in the current environment.

       vm$ foo=bar LIMIT=max invoker
       Success!
       vm$ echo $foo $LIMIT

       vm$
