---
title: Scripting
layout: chapter.html
---

???

We've accumulated a lot of knowledge about process orchestration. Up to now,
we've been entering each command into the terminal directly. While this is the
best way to learn, it is not the way you will use these tools day-to-day.

Unix provides powerful mechanisms for "scripting," or saving sets of
instructions so they can be re-used concisely.

This may sound a little stuffy, but it's actually only slightly different than
the way we've been working so far. In this chapter, we'll begin to appreciate
the power of a "text-only" interface: once you understand how to interact with
the environment, automating your actions is trivial.

---

# Our first script

```terminal
vm$ echo pwd > my-script.sh
vm$ bash my-script.sh
/home/sally
vm$ 
```

???

A shell script is nothing but a text file with a list of commands. Our very
first script has single line: an invocation of the `pwd` directory. (In this
example, we're creating the script file with `echo` for demonstration purposes;
feel free to use a text editor if you prefer.)

To run the script, we are providing it as an option to `bash`. Bash is a very
common shell (in fact, it's the one we're using in this course's virtual
environment). Other popular shells support this functionality, as well, but
we'll stick with Bash because it is so widely available.

Bash reads the content of the file and executes it line-by-line. As you can
see, it connects the standard output to our terminal, so the output looks no
different than it would if we had invoked `pwd` directly.

---

:continued:

```terminal
vm$ mv my-script.sh my-script.mp3
vm$ bash my-script.mp3
/home/sally
vm$ 
```

???

Note that the `.sh` suffix in the file name is entirely optional.
POSIX-compliant systems do not interpret the "extension" during invocation.
Even so, it's a hint for humans about how the file is intended to be used.

---

# Ergonomics

This is technically all we need to get started writing scripts, but we can take
a few more steps to make it more comfortable to use scripts.

---

:continued:

```terminal
vm$ ./my-script.sh
bash: ./my-script.sh: Permission denied
vm$ 
```

???

Ideally, we'd like to be able to run the script just like we've been running
other commands--by referencing the file directly. To understand why this
doesn't work, we'll need to discuss a new aspect of Unix files--file "modes".

---

# File Modes

Every file on the file system has a set of permissions associated with it. This
meta-data describes whether the file can be read, written, and executed as a
command. (This description simplifies the topic a bit; see
:chapter:users-and-groups: for a more complete discussion.)

Because we created the script file ourselves, it has the necessary permissions
to allow us to open it and to change it. By default, though, it does *not*
include the "execute" permission. This is why when we attempt to invoke it as
though it were a command, the shell reports an error.

Because executing a file can trigger any number of changes to the system, this
"non-executable by default" behavior is a good safety mechanism. We definitely
trust our own scripts, though, so we'll need to learn how to grant that
permission.

---

# `chmod`

## Change file "mode"

```terminal
vm$ man chmod
HMOD(1)                   User Commands                   CHMOD(1)

NAME
       chmod - change file mode bits
vm$ 
```

???

The difficult-to-pronounce `chmod` utility is the tool we need here. Short for
"**ch**ange **mod**e," `chmod` will allow us to enable the "execute" permission
for the scripts we write.

---

:continued:

```terminal
vm$ ./my-script.sh
bash: ./my-script.sh: Permission denied
vm$ chmod +x my-script.sh
vm$ ./my-script.sh
/home/sally
vm$ 
```

???

The `+x` option instructs `chmod` to grant "execute" permission to the
specified file. `+x` is actually a short code describing the way we want to
change *all* the file's permissions. For our purposes in this chapter, it's
enough to know that `+` means "add permissions" and `x` means "the
'e**x**ecute' permission, specifically."

For the rest of the course, we'll assume that any script we write has the
"execute" permission.

---

# The "Shebang"

```terminal
vm$ cat my-script.sh
#!/bin/bash

pwd
vm$ 
```

???

When we invoke our script, the program loader assumes that the script should be
interpreted with our default shell (as mentioned earlier, this is Bash in this
course's virtual environment). This is a valid assumption for the shells we
author for ourselves and for the current system.  However, another system may
be configured to use a different shell by default. In that case, our script
would be interpreted by that other shell, and there's no telling if it would
work correctly there.

Because we may want to share our scripts with others (or re-use them in
different environments), we can't take the shell for granted. Ideally, we want
to author our scripts in a way that is "portable" between users and systems.

In order to ensure that the same shell is used across all environments, we
specify the name of the shell at the top of the file. Note that this first line
begins with a special character sequence: the "number" sign (`#`) followed by
the exclamation point (`!`). This sequence is sometimes referred to as a
"shebang."

With those details out of the way, we can get back to writing scripts.

---

# Readability

```terminal
vm$ cat replace-dog.sh
#!/bin/bash
find documents -newermt 'last week' -print0 | xargs -0 sed -i 's/hot dog/banana/g'
vm$ 
```

???

Lets start by making a script for the complex command from the end of
:chapter:process-combination:.

This script is functional, but it's a little difficult to read. Other people
might have a hard time deciphering what is going on, and we ourselves might
struggle if we revisit the file in a few months from today.

It would be nicer if each command in the pipeline were on a separate line. This
would prevent line wrapping, and would also help people see each processing
"stage."

---

:continued:

```terminal
vm$ cat replace-dog.sh
#!/bin/bash
find documents -type f -newermt 'last week' -print0 | \
  xargs -0 \
    sed -i 's/hot dog/banana/g'
vm$ 
```

???

Now we can more clearly see that this command is actually composed of three
separate operations: `find`, `xargs`, and `sed`. Each command is indented to
further highlight this "nested" relationship.

Notice how each line ends with a "backslash" character (`\`). This is critical
because the shell would otherwise interpret the end of the line to mean the end
of the command.

A common mistake is to accidentally include white space *after* the backslash.
The purpose of the backslash is to "escape" the "newline" character that
follows it, so such whitespace will cause the shell to once again mis-interpret
our intentions. If possible, consider configuring your text editor to display
invisible characters like "space," and "tab."

---

:continued:

```terminal
vm$ cat replace-dog.sh
#!/bin/bash
find documents -type f -newermt 'last week' -print0 | \
  xargs --null \
    sed --in-place 's/hot dog/banana/g'
vm$ 
```

???

:chapter:command-invocation: described how some programs define both a "short"
version and a "long" version of the same option. Until now, we've tended to
prefer the "short" version because we've been typing everything into the
command line. Now that we are saving the commands to a file, it makes sense to
use the "long" version; this makes the commands a little more descriptive.

---

:continued:

```terminal
vm$ cat replace-dog.sh
#!/bin/bash

# Replace the words "hot dog" with the word "banana" in
# all documents modified during the past week.

find documents -type f -newermt 'last week' -print0 | \
  xargs --null \
    sed --in-place 's/hot dog/banana/g'
vm$ 
```

???

One more method to improve readability is documentation via comments.

The "number sign" (`#`) designates the beginning of a comment; any text that
follows it is ignored by the shell. Comments can be used to describe the
overall behavior of the script or any specific command.

---

# Control Flow

![Railroad switch](railroad-switch.jpg)

"[Weekend work 2012-09-04
22](https://www.flickr.com/photos/mtaphotos/7929850814/)" by [Metropolitan
Transportation Authority of the State of New
York](https://www.flickr.com/photos/mtaphotos/) is licensed under [CC BY
2.0](https://creativecommons.org/licenses/by/2.0/)

???

Up until this point, we have been entering commands sequentially, interpreting
standard output and standard error as we went. If some command failed, we would
stop and modify our plan as necessary.

Shell scripts do not require step-by-step verification by default. They will
execute each command in series, usually faster than we can perceive. This is
largely the point, but it forces us to be explicit about how exceptional
circumstances should be handled.

---

# Boolean Control Operators

## Logical "AND" via `&&`

```terminal
vm$ ls
my-important-document.odf
vm$ cd out && rm -r *
bash: cd: out: No such file or directory
vm$ ls
my-important-document.odf
vm$ 
```

???

When commands are separated by two ampersand characters (as in `&&`), the shell
will execute the first, but only execute the second if the return value of the
first was `0`. This is useful when commands are tightly coupled.

In this example, we want to delete `*` (the contents of the current directory)
*only if* we have successfully moved into the `out/` directory. Without this
condition, if the `cd` command failed, we would mistakenly delete everything in
the current directory.

When reading commands, this operator can be interpreted as the word "and," as
in "change into the `out` directory **and** remove all the contents."

---

# Boolean Control Operators

## Logical "OR" via `||`

```terminal
vm$ grep trousers journal/*
vm$ echo $?
1
vm$ grep trousers journal/* || echo No mention of trousers >&2
No mention of trousers
vm$ 
```

???

The `||` operator allows for a command to be run only if the previous command
returned a non-zero exit status.

In this example, the `grep` utility fails to locate a match, and it does not
output any data on either standard output or standard error. In a script, we
might want to give some feedback about this case. We're taking advantage of the
fact that `grep` exits with a status code of `1` under these conditions.

When reading commands including this operator, the `||` can be interpreted as the
word "or," as in, "Display all the occurrences of the word 'trousers,' **or**
demonstrate our disappointment.'

---

# `exit`

## Terminate the current process

```terminal
vm$ cat bad.sh
#!/bin/bash

echo This command will always be executed.

exit 23

echo This command will never be executed.
vm$ ./bad.sh
This command will always be executed.
vm$ echo $?
23
vm$
```

???

The `exit` command allows us to cancel the execution of the script before every
command has been evaluated.

---

:continued:

```terminal
vm$ cat applying-exit.sh
#!/bin/bash

mkdir out || exit 1

cp src/* out

echo The build process is now complete.
vm$ ./applying-exit.sh
mkdir: cannot create directory ‘out’: File exists
vm$ echo $?
1
vm$ 
```

???

We've already seen how an unexpected condition can cause our script to behave
in undesirable ways. Although the `&&` operator can help handle these cases, it
is really only appropriate when we need to "skip" a single command.

For larger scripts, it would be better if we could "bail out"--stop all work
immediately and return a non-zero status code.

This is where `exit` comes in to play. We can organize our script to call
`exit` any time it encounters a exceptional condition, and we can be certain
that no additional commands will be executed. On top of that, by observing the
status code convention, any processes that invoked our script will be aware
that something went wrong.

---

# Writing complex branches with `if`

```terminal
vm$ cat first-if.sh
#!/bin/bash

if mkdir out
then
  cp src/* out
  echo The build process is now complete.
else
  echo Unable to run build process. >&2
  exit 1
fi
vm$ 
```

???

Our error handling abilities are improving, but we're still limited to a
executing a single command when something goes wrong. At the very least, we
should output a non-zero exit code *and* write a meaningful message to standard
error.

We can use `if` to specify a list of commands to run based on some condition.
It operates on process exit status, which may seem limiting at first glance. To
see how this functionality actually enables expressive conditions, we'll have
to learn about another utility.

---

# Advanced conditions with `test`

```terminal
vm$ whoami
vagrant
vm$ test $(whoami) = root
vm$ echo $?
1
vm$ test $(whoami) = vagrant
vm$ echo $?
0
vm$ 
```

???

`test` is a program that interprets the options we provide as logical
operations, and it exits with a status code that reflects the result of the
operation.

---

:continued:

```terminal
vm$ test 3 -lt 4
vm$ echo $?
0
vm$ test 3 -lt 2
vm$ echo $?
1
vm$ 
```

???

`test` has support ranging from numeric comparisons (such as `-lt` for **l**ess
**t**han)...

---

:continued:

```terminal
vm$ test -f not-a-file
vm$ echo $?
1
vm$ test -f an-actual-file
vm$ echo $?
0
vm$ 
```

???

...to file inspection (such as `-f` for **f**ile).

We won't cover all the expressions that `test` supports--for that, please refer
to the utility's `man` page.

---

:continued:

```terminal
vm$ cat if-with-test.sh
#!/bin/bash

# Abort if an output directory already exists because
# mixing content with a previous build could produce
# unexpected results.
if test -d out
then
  echo Unable to run build process. >&2
  exit 1
fi

mkdir out
cp src/* out
echo The build process is now complete.
vm$ 
```

???

The wide range of supported expressions make `test` a great companion to `if`.

Unfortunately, the operators are somewhat terse, and there are no corresponding
"extended forms." It's always possible to reference the `man` page (or memorize
their meaning), but using code comments is probably the best way to clarify the
script's intent.

---

# Alternate paths with `if`

```terminal
vm$ cat if-else.sh
#!/bin/bash

# Ensure that an empty output directory exists
if test -d out
then
  rm -r out/*
else
  mkdir out
fi

cp src/* out
echo The build process is now complete.
vm$ 
```

???

In the case that our branch ends with the `exit` command, we don't need to
worry about the "negative" condition. But in many cases, we'll want to specify
some other commands to run if the test fails. A corresponding `else` branch
allows us to do exactly that.

This is an example of how we can make our script more robust by responding
gracefully to different conditions. If the `out` directory exists, we'll just
make sure it is empty and continue on with the build process. We only need to
create the directory if it doesn't already exist (in which case, we know it is
empty).

---

# Improving legibility with `[`

```terminal
vm$ cat if-else.sh
#!/bin/bash

# Ensure that an empty output directory exists
if [ -d out ]
then
  rm -r out/*
else
  mkdir out
fi

cp src/* out
echo The build process is now complete.
vm$ 
```

???

We can express these same conditions using the "open bracket" character (`[`)
and "close bracket" character (`]`).

This form is equivalent to the earlier version using `test`. It visually mimics
the syntax for `if` statements in other languages, so some people prefer it for
aesthetic reasons. This is a personal choice, though it's good to be aware of
it because many examples on the web make use of it.

---

# The truth behind `[`

```terminal
vm$ which [
/usr/bin/[
vm$ [ 45 -lt 23 ]
vm$ echo $?
1
vm$ 
```

???

Although `[` looks like syntax for the `if` statement, it is actually just
another utility. We can invoke it directly and even reference its entry in the
`man` pages. It is basically an alias for the `test` command we used
previously; it just requires that the last option is the "close bracket"
character (`]`).

It's an odd name for a program, but recognizing this detail can make it easier
to remember how it is used.

---

# Variables: don't repeat yourself

```terminal
vm$ cat if-else-vars.sh
#!/bin/bash

out_dir=out

# Ensure that an empty output directory exists
if [ -d $out_dir ]
then
  rm -r $out_dir/*
else
  mkdir $out_dir
fi

cp src/* $out_dir
echo The build process is now complete.
vm$ 
```


???

Minimizing duplication can make our scripts easier to maintain. This is one
case where variables really shine.

The name of the output directory shows up on four separate lines in this
example script. If we ever want to change that value, we'll have to be careful
to replace all four instances.

By storing it in a variable, we're making future maintenance easier and less
error-prone.

---

# Special script variables

```terminal
vm$ cat script-vars.sh
#!/bin/bash

echo The name of the script is $0
echo You passed $# options
echo The first option is $1
echo The fourth option is $4
vm$ 
```

???

Within shell scripts, we can reference a few variables that describe how the
script was invoked:

- `$#` contains the number of options provided
- `$0` contains the full path to the script itself
- The numeric variables `$1` through `$9` contain the option values provided

By acting on these values, we can write scripts that are much more re-usable.

---

:continued:

```terminal
vm$ cat if-else-option.sh
#!/bin/bash

if [ $# = 1 ]
then
  out_dir=$1
else
  out_dir=out
fi

# Ensure that an empty output directory exists
if [ -d $out_dir ]
then
  rm -r $out_dir/*
else
  mkdir $out_dir
fi

cp src/* $out_dir
echo The build process is now complete.
vm$ 
```

???

Here, we're allowing the output directory to be specified as the first
option. If the script is invoked without any options, we default to the
value "out".

Note how much more difficult this would be if we hadn't introduced the
`out_dir` variable. That refactoring is already paying off!

---

# In Review

- The "shebang" (`#!`) makes scripts more "portable"
- Files need the "execute" permission before they can be invoked as scripts. We
  can use `chmod` to grant that permission.
- Scripts are much more readable when they include careful use of comments and
  line breaks
- `&&` is a way to "chain" commands where the second is executed only if the
  first completes successfully
- `||` is a way to "chain" commands where the second is executed only if the
  first fails
- The `if` keyword lets us create "branches" of commands that are conditionally
  executed based on the return status of some process
- `test` and `[` are alternate names of a command that lets us specify complex
  conditions
- The shell defines a number of variables that describe how a script was
  invoked: `$#`, and variables in the numeric range `$0` through `$9`.
