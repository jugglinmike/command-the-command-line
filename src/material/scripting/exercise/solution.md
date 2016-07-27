For all of these scripts, don't forget to set their "execute" permissions with
`chmod` and to include the "hashbang" sequence on the first line!

1. We'll begin with the "normal" case: greeting the user. We've already used
   the `whoami` utility in other chapters; here, we'll use command substitution
   to `echo` the value it writes to standard output:

   ```
   #!/bin/bash

   echo Hello, $(whoami)!
   ```

   To handle the "help" options, we'll need an `if` condition that references
   the value of the `$1` variable.

   ```
   #!/bin/bash

   if [ "$1" = "--help" ]
   then
     echo "I would like to greet you."
     exit
   fi

   echo Hello, $(whoami)!
   ```

   Finally, we need to define what happens when any other option value is
   provided. We know that when no option value is provided, `"$1"` will be
   equal to the empty string (`""`), so we need to report an error whenever it
   is *not* equal to the empty string, taking care to redirect the output from
   `echo` as specified in the instructions.

   ```
   #!/bin/bash

   if [ "$1" = "--help" ]
   then
     echo "I would like to greet you."
     exit
   fi
   if [ "$1" != "" ]
   then
     echo "I don't recognize that option." >&2
     exit 1
   fi

   echo Hello, $(whoami)!
   ```

   Note that this condition has to come after the first. Otherwise, we would
   disable the `--help` flag.

2. The most straightforward way to handle the `-h` option is to duplicate the
   `if` we wrote for `--help`:

   ```
   #!/bin/bash

   if [ "$1" = "--help" ]
   then
     echo "I would like to greet you."
     exit
   fi
   if [ "$1" = "-h" ]
   then
     echo "I would like to greet you."
     exit
   fi
   if [ "$1" != "" ]
   then
     echo "I don't recognize that option." >&2
     exit 1
   fi

   echo Hello, $(whoami)!
   ```

   ...but this would be a hassle to maintain. We can do better, though, because
   we know about the `||` operator. (Remember: this allows for a second command
   to be run if the first one fails.)

   ```
   #!/bin/bash

   if [ "$1" = "--help" ] || [ "$1" = "-h" ]
   then
     echo "I would like to greet you."
     exit
   fi
   if [ "$1" != "" ]
   then
     echo "I don't recognize that option." >&2
     exit 1
   fi

   echo Hello, $(whoami)!
   ```

3. We can write this script in one line, but we'll need to recall two special
   variables to do it. First: the user's "home" directory is stored in the
   environment variable `$HOME`. If we named our script `my-script.sh`, we
   could move it like so:

   ```
   #!/bin/bash

   cp my-script.sh $HOME
   ```

   ...but the instructions specify that the script should work regardless of
   what its name is. So we'll have to replace the "hard-coded" reference to
   `my-script.sh` with the special `$0` variable that the shell provides:

   ```
   #!/bin/bash

   cp $0 $HOME
   ```

4. The first three steps are relatively straightforward: if you remember how
   you first solved them, you can copy the commands directly into the script:

   ```
   #!/bin/bash

   invoker
   invoker /bin/*t* /bin/*s
   invoker
   invoker Making the big \$bucks.
   invoker
   invoker -w -x
   invoker -wx
   invoker -x -w
   invoker -xw
   invoker -x --word
   invoker --word -x
   ```

   Addressing the dynamic part is more of a challenge. The exercise requires
   that we set `DATE` to the current day of the week. The `date` utility's
   `man` page includes instructions for that:

   >     FORMAT controls the output.  Interpreted sequences are:
   >     
   >     %%     a literal %
   >     
   >     %a     locale's abbreviated weekday name (e.g., Sun)
   >     
   >     %A     locale's full weekday name (e.g., Sunday)

   So we can use command substitution to store the value of `date +%A`) in a
   variable:

   ```
   DATE=$(date +%A) invoker
   ```

   This is only part of the solution for the final step, though. The exercise
   also requires that `cat_or_dog` is set correctly. There are no penalties for
   a wrong answer, so we *could* simply try both:

   ```
   DATE=$(date +%A) cat_or_dog=CAT invoker
   DATE=$(date +%A) cat_or_dog=DOG invoker
   ```

   But that is a little sloppy. We can do better! We'll need to search through
   the instructions that are written to standard output--a job for `grep`:

   ```
   invoker --help | grep 'x CAT'
   ```

   As we saw in this chapter, `grep` will exit with a non-zero status code if
   it cannot find a match. So we'll use the `$?` variable to determine if the
   instructions specified that the value should be "CAT".

   ```
   invoker --help | grep 'x CAT'
   if [ $? = 0 ]
   then
     cat_or_dog=CAT
   else
     cat_or_dog=DOG
   fi
   ```

   Finally, we can combine the variables in the invocation

   ```
   DATE=$(date +%A) cat_or_dog=cat_or_dog invoker
   ```
