---
title: Customization
---

???

In this chapter, we'll look at various ways to customize the environment
provided by a Unix-like system. These techniques can help maintain awareness of
the system state, increase productivity, or simply make the terminal look
nicer.

---

# Re-cap: 

```
vm$ sh ./greet.sh
Hello.
vm$ ./greet.sh
./greet.sh: Permission denied
vm$ chmod +x ./greet.sh
vm$ ./greet.sh
Hello.
vm$
```

???

In :chapter:scripting:, we saw how a shell script could be invoked from the
command line. This pattern is much more convenient than using the script as
an input to the shell utility, but it hides an important detail: in both cases,
the script is executed as a standalone process.

---

# The hidden process

```
vm$ pwd
/home/sally
vm$ cat change-env.sh
#!/bin/bash
FOO=8
cd /
vm$ ./change-env.sh
vm$ echo [ $FOO ]
[ ]
vm$ pwd
/home/sally
vm$
```

???

If the script's purpose is to modify the *system* state (e.g. by modifying
files, starting processes, etc.), then this distinction is not very important.
However, if we want to use the script to modify the *environment*, then the
process boundary is a problem.

A script executed in this way might set environment variables or change
directories, but this will not effect the "calling" context. The goal of this
chapter is to automatically modify our shell's environment, so we'll need to
learn a new way of executing scripts before we can go any further.

---

# "Sourcing" files with `.`

```
vm$ help .
.: . filename [arguments]
    Execute commands from a file in the current shell.

    Read and execute commands from FILENAME in the current shell.
    The entries in $PATH are used to find the directory
    containing FILENAME. If any ARGUMENTS are supplied, they
    become the positional parameters when FILENAME is executed.

    Exit Status:
    Returns the status of the last command executed in FILENAME;
    fails if FILENAME cannot be read.
vm$
```

???

`.` (a.k.a. "dot") is a standard (though oddly-named) shell utility that does
exactly this.

---

:continued:

```
vm$ pwd
/home/sally
vm$ cat change-env.sh
#!/bin/bash
FOO=8
vm$ . change-env.sh
vm$ echo [ $FOO ]
[ 8 ]
cd /
vm$ pwd
/
vm$
```

???

Using the "dot" utility is essentially saying, "interpret the commands in this
file as though I entered them directly into this terminal window myself." This
is sometimes referred to as "**sourcing a file**."

---

:continued:

```
vm$ cat change-prompt.sh 
# Set the command prompt to a Microsoft Windows-style
# value. It's just a bunch of characters, after all!
PS1='C:\> '
vm$ . change-prompt.sh 
C:\> 
```

???

We can use this right away to start writing scripts that customize our
environment. (Recall the `$PS1` variable discussed in
:chapter:command-invocation:.) Our current knowledge of customizations is
still limited, but even now, we can appreciate a problem with this approach.
Running a configuration script like this every time we logged in the system
would become tiresome very quickly.

Thankfully, we can instruct the system to automatically run our configuration
scripts on our behalf. Accomplishing this is somewhat more complicated than it
might seem at first, so we'll take some time to discuss the details before
returning to more customization options.

---

# Startup scripts

- bash: `~/.bash_profile`, `~/,bash_login`, `~/.profile`, `~/.bashrc`
- tcsh: `~/.tcshrc`, `~/.cshrc`, `~/.login`
- zsh:  `$ZDOTDIR/.zshenv`, `$ZDOTDIR/.zprofile`, `$ZDOTDIR/.zshrc`,
  `$ZDOTDIR/.zlogin`

???

To facilitate environment customation, every shell has a different set of
hidden files that it will execute as it initializes. The file we should modify
depends not only on the shell we are using, but also the "invocation mode" of
the shell.

---

# Shell invocation modes

```
vm$ cat shell-classifications.txt
                |     Login     |    Non-login    |
----------------+---------------+-----------------+
Interactive     |               |                 |
                |               |                 |
----------------+---------------+-----------------+
Non-interactive |               |                 |
                |               |                 |
----------------+---------------+-----------------+
vm$
```

???

Whether `bash`, `sh`, `zsh`, or some other application, all shells recognize
two orthogonal "invocation modes": interactive versus non-interactive, and
login versus non-login. These modes effect how the shell behaves as it starts.

---

:continued:


> If you open a shell or terminal (or switch to one), and it asks you to log in
> (Username? Password?) before it gives you a prompt, it's a login shell.

https://askubuntu.com/questions/155865/what-are-login-and-non-login-shells

???

This is a frequently-discussed topic on the web, but even among those supplying
answers, there is some confusion about what this means.

---

# Shell invocation mode considerations

- The **conventional meaning** of the mode
- The **requirements** for a new shell process to qualify for the mode
- The **effect** the mode has on the shell's behavior

???

The best way to understand these distinctions is via three different
considerations.

---

# "Login" shells

- **Conventional meaning** - this process is a user's connection to the system
- **Requirements** - one of:
  - the value of the `$0` variable begins with a "dash" character (`-`)
  - the shell was invoked with the `-l` option
- **Effect** - the shell runs startup scripts designated for "login" sessions

---

# "Interactive" shells

- **Conventional meaning** - the standard input stream of this process is
  connected to a keyboard, and the user will enter commands over time
- **Requirements** - one of:
  - the shell was invoked without options and the standard input is connected
    to a terminal
  - the shell was invoked with the `-i` option but not the `-c` option
- **Effect** - the shell runs startup scripts designated for "interactive"
  sessions

???

We separate "conventional meaning" from "requirements" because given the
correct options, a shell can be run in any  "mode" regardless of the current
context. While it may be a little technical, it's not magic!

---

# Shell invocation modes: conventional examples

```
vm$ cat shell-classifications-examples.txt
                |     Login     |    Non-login    |
----------------+---------------+-----------------+
Interactive     | connecting    | opening a       |
                | via SSH       | terminal window |
----------------+---------------+-----------------+
Non-interactive | very rare     | running a       |
                | circumstances | shell script    |
----------------+---------------+-----------------+
vm$
```

???

All this means that the different invocation modes simply determine which files
a shell "sources" as it starts up. The distinctions exist to allow for
fine-grained control over how the system prepares the environment in different
contexts.

However, the distinction between "login" and "non-login" contexts is largely a
vestige from the past, when terminals were slow and computing time was
expensive. For our purposes, whether or not a shell is a "login shell" will not
be particularly relevant.

---

# Shell invocation modes: files sourced

mode      | bash                                                          | sh                                 | zsh
----------|---------------------------------------------------------------|------------------------------------|-----------------------------------------------------------------------------------------------------
login     | `/etc/profile` `~/.bash_profile` `~/.bash_login` `~/.profile` | `/etc/profile` `~/.profile` `$ENV` | `/etc/zprofile` `$ZDOTDIR/.zprofile` `/etc/zshrc` `$ZDOTDIR/.zshrc` `/etc/zlogin` `$ZDOTDIR/.zlogin`
non-login | `~/.bashrc`                                                   | `$ENV`                             | `/etc/zshrc` `$ZDOTDIR/.zshrc`

???

Many shells source the same files regardless of whether they have been run in
"login" contexts. This is not a consideration for users of these shells.
However, Bash sources two separate locations.

---

:continued:

```
vm$ cat ~/.bash_profile
# This file is sourced by "login" Bash shells, but "non-login"
# Bash shells source the `~/.bashrc` file. To promote
# consistency between those two contexts, manage configuration
# settings in `~/.bashrc`, and source that file from
# `~/.bash_profile`.
if [ -f ~/.bashrc ]
then
  . ~/.bashrc
fi
vm$
```

???

Bash users can account for this by writing a short `~/.bash_profile` file that
sources from their `~/.bashrc` file.

---

```
vm$ echo "PS1='NEW$ '" > ~/.bashrc
vm$ exit
pc$ vagrant ssh
NEW$ 
```

???

As we begin working with these files, remember that the shell sources them
during initialization only. This means any changes we make will not effect the
current shell process. In order to see the effect of our changes, we'll need to
create a new shell (e.g. by logging out and logging back in) or explicitly
source the file using the "dot" utility.

---

# Shell customization: Paths

```
vm$ cd projects/dragonweb
vm$ ../scripts/my-component-scaffold.sh
Creating scaffolding for new component...
Done!
vm$
```

???

:chapter:scripting: detailed how shell scripts can be created to automate
repetitive tasks. Although traits like the "execute" permission and the
"shebang" make scripts easier to use, invoking the scripts can still be
cumbersome. We need to specify the full path to the script each time we want to
invoke it.

---

:continued:

```
vm$ cd projects/dragonweb
vm$ mv ../scripts/my-component-scaffold.sh ~
vm$ ~/my-component-scaffold.sh
Creating scaffolding for new component...
Done!
vm$
```

???

We can mitigate this somewhat by placing scripts in our `HOME` directory. That
allows us take advantage of shell expansion and reference the script relative
to the special tilde character (`~`). However, the approach tends to add
clutter to the `HOME` directory, and it still requires a few more keystrokes
than invoking a system-provided utility like `grep`.

---

:continued:

```
vm$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/sbin
vm$ which ls
/bin/ls
vm$ which man
/usr/bin/man
vm$
```

???

Recall from :chapter:command-invocation: that the `PATH` environment variable
is a colon-separated list of directories that the shell will reference when
searching for applications.

---

:continued:

```
vm$ cd projects/dragonweb
vm$ echo "PATH=$PATH:~/projects/scripts" >> ~/.bashrc
vm$ . ~/.bashrc
vm$ my-component-scaffold.sh
Creating scaffolding for new component...
Done!
vm$
```

???

By adding a directory to that list, we can designate a personal directory for
our scripts. Any executable file placed in that directory may then be invoked
without a complete path because the shell now has the information it needs to
find it.

---

:continued:

```
vm$ fetch webrtc
fetch: command not found
vm$ echo "PATH=$PATH:/opt/google/depot_tools" >> ~/.bashrc
vm$ . ~/.bashrc
vm$ fetch webrtc
Running: gclient root
Running: gclient sync --with_branch_heads
vm$
```

???

Some projects include a set of tools required for development. For instance,
the [Chromium](https://www.chromium.org/) and
[V8](https://developers.google.com/v8/) projects both rely on [Google's Depot
Tools](https://www.chromium.org/developers/how-tos/depottools).

---

# PATH security

```
vm$ ls
deploy.sh  src  test
vm$ echo "PATH=.:$PATH" >> ~/.bashrc
vm$ . ~/.bashrc
vm$ deploy.sh
Now running local "deploy" script
Deploy complete!
vm$
```

???

Many of the commands issued so far have been prefixed with the characters `./`,
which instructs the shell to search for the file in the current directory.

Some users place relative paths in their `PATH` variable. This is a convenience
that makes the leading `./` unnecessary.

---

:continued:

```
vm$ ls dangerous-directory
ls
vm$ cd dangerous-directory
vm$ ls
Because "." is at the beginning of your PATH, you have
just invoked the "local" script named `ls`. It might
delete your files, read your passwords, or any number
of other malicious things.
vm$
```

???

This practice is dangerous because it allows scripts in the current directory
(which may have been created by any user) to take precedence over common system
utilities. 

---

# Shell customization: Aliases

```
vm$ ls
change-prompt.sh
vm$ ls -l
-rw-rw-r-- 1 speaker speaker   12 Aug  2 18:30 change-prompt.sh
vm$
```

???

As you grow familiar with various utilities, you may find that you are
consistently using certain options. For example, the `-l` option of `ls`
enables a "long listing" format.

Aliases are user-defined commands that can be thought of as "shortcuts" for
other commands.

---

:continued:

```
vm$ alias: alias [-p] [name[=value] ... ]
    Define or display aliases.

    Without arguments, `alias' prints the list of aliases in
    the reusable form `alias NAME=VALUE' on standard output.

    Otherwise, an alias is defined for each NAME whose VALUE
    is given A trailing space in VALUE causes the next word
    to be checked for alias substitution when the alias is
    expanded.
vm$
```

???

Use the `alias` utility to define alias "names" (the command you wish to type)
with alias "values" (the command you wish to be executed).

---

:continued:

```
vm$ alias ll='ls -l'
vm$ ll
-rw-rw-r-- 1 speaker speaker   12 Aug  2 18:30 change-prompt.sh
vm$
```

???

When the shell encounters a command that has been defined as an alias, it
substitutes the name of the alias with the definition originally provided to
the `alias` utility.

---

:continued:

```
vm$ alias ll='ls -l'
vm$ ll /tmp
total 4
-rw-rw-r-- 1 speaker speaker   0 Aug  2 21:50 a-temporary-file-01.txt
-rw-rw-r-- 1 speaker speaker   0 Aug  2 21:50 a-temporary-file-02.txt
-rw-rw-r-- 1 speaker speaker   0 Aug  2 21:50 a-temporary-file-03.txt
-rw-rw-r-- 1 speaker speaker   0 Aug  2 21:50 a-temporary-file-04.txt
vm$
```

???

Because aliases are expanded by the shell, additional options "pass through" to
the underlying command.

---

:continued:

```
vm$ alias desktop='cd ~/Desktop'
vm$ pwd
/home/sally
vm$ desktop
vm$ pwd
/home/sally/Desktop
vm$
```

???

Unlike shell scripts, aliases are executed in the current shell. This avoids
the "sourcing" issue discussed previously, making aliases a good choice for
environment-modifying tasks like changing directories.

---

:continued:

```
vm$ git checkout dev
Switched to branch 'dev'
vm$ alias co='git checkout'
vm$ co master
Switched to branch 'master'
vm$
```

???

Another common use-case for aliases is shortening lengthy commands. For
example, the `git` application is notorious for its complex interface. Aliases
can significantly reduce the amount of typing required for common workflow
tasks.

---

# Application customizations

```
vm$ ls -a ~
.   .asunder  .gitconfig  .npmrc  .xinputrc
..  .bashrc   .hgrc       .vimrc  .zshrc
vm$
```

???

Many applications support customization through so-called "dot files." The
abilities and syntax of these files vary greatly between applications, but the
general convention is that they are "hidden" text files placed in your `HOME`
directory.

For more details on a given application's configuration files, consult the
documentation provided by `man`.

---

:continued:

```
vm$ git add .npmrc
vm$ git commit -m 'Add config file for npm package manager.'
vm$ git push origin master
```

???

Your configuration is likely to change and grow over time. It can be a good
idea to maintain these files in a version control system like git. This helps
to recover from mistakes like typos and deleted files.

---

:continued:

```
vm$ ssh our-dev-server.example.com
# Welcome to the dev server!
#
# This is your first time logging in to this server,
# so it's probably not set up the way you like. Feel
# free to customize the environment however you wish.
dev$ git clone git@github.com:speaker/dotfiles.git .
Cloning into '.'...
Checking connectivity... done.
dev$ source .bashrc
vm$
```

Synchronizing your changes with a remote repository can greatly simplify the
process of configuring a branch new system (or initially logging in to an
existing system).

---

# In Review

- If we want to modify our environment using the commands in another file, we
  "source" that file using the "dot" utility, `.`, as in `. conf-file`.
- Shells automatically source certain files as they starts up. The exact files
  may change depending on the context, but for most shells, there is a single
  configuration file that applies to all the contexts we are interested in.
  The name of this file is different for each shell--consult the documentation
  provided by `man`.
- The Bash shell has a more complicated mechanism for configuration files. Most
  Bash users should place their configuration in `~/.bashrc` and create a
  `~/.profile` file that sources `~/.bashrc`.
- Customizations
  - `PS1` variable - defines the contents of the command prompt; it may have
    dynamic information like the current user's name or the current directory
  - `PATH` variable - controls how the shell locates executable files;
    extending it can make it much easier to invoke whole sets of commands
  - Aliases - text "shortcuts," useful for long-but-frequently-used commands
  - Dot files - special text-based files used to customize many applications;
    the location and features of these files are generally described by each
    application's documentation in `man`
