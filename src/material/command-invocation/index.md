---
title: Command Invocation
layout: chapter.html
---

```terminal
vm$ ls
my-amazing-subdirectory
my-normal-file.txt
vm$ ls my-amazing-subdirectory
oh-boy-another-directory
just-another-file.txt
vm$ 
```

???

So far, we've been issuing commands in a relatively intuitive way: the name of
the program, optionally followed by some specific "target"

---

```terminal
vm$ LS_COLORS="di=42" ls -lr --all --sort=size music/*.mp3
Ace of Base - I Saw the Sign.mp3
Santana - Smooth.mp3
Mahler - Symphony No. 2 in C minor - 04 - Urlicht.mp3
vm$ 
```

???

Commands can get far more cryptic. In this section, we'll step through the
common conventions around invoking Unix commands.

It's important to remember that every tool has its own set of options. For
instance, the option `-l` does one thing to the `ls` utility, but it does
something very different to `tree`, and it isn't even recognized for the `cat`
utility.

Well cover a handful of tools, but we're not looking to learn how to do
everything with every utility. We just want to be able to pick apart what's
going on in these arcane incantations.

---

# The Executable

```terminal
vm$ pwd
/home/sally
vm$ /bin/pwd
/home/sally
vm$ 
```

???

- When we talk about "invoking a command," we normally mean running a program.
- This is the terminal equivalent to double-clicking on an application icon in
  a GUI.
- Programs like `pwd` are just executable files that reside in special
  locations in the file system (more detail on that later in this section).
- The "essential utilities" we cover here (like `pwd` and `ls`) have been
  written by many people over many years. They usually stick to set of
  conventions around *how* they are run--that's what this section is all about.
- Just remember: these utilities serve different purposes and were created
  independently, so they all have unique aspects as well.

---

# Path options

```terminal
vm$ ls ~/video ~/music
~/video:

~/music:
Ace of Base - I Saw the Sign.mp3
Mahler - Symphony No. 2 in C minor - 04 - Urlicht.mp3
Santana - Smooth.mp3
Stallman - Free Software Song.ogg
vm$ 
```

???

- Many utilities accept one or more path references.
- We've already seen how the shell replaces the tilde (`~`) character with the
  complete path to our "home" directory. We'll cover this behavior in more
  detail in just a moment.

---

# Named options

```terminal
vm$ cat --number my-normal-file.txt
     1 This is the first line of just-another-file.txt
     2 This is the second line of the file!
     3 The file only has three lines, and this is the last one!
vm$ 
```

???

- Other options are "named"--they don't describe any particular file. Instead,
  their presence alters the behavior of the command.
- You can identify these because they usually start with two dashes (`--`)
- In this case, the `--number` option is changing how the file contents are
  displayed.

---

:continued:

```terminal
vm$ ls --sort=size ~/music
Stallman - Free Software Song.ogg
Ace of Base - I Saw the Sign.mp3
Santana - Smooth.mp3
Mahler - Symphony No. 2 in C minor - 04 - Urlicht.mp3
vm$ 
```

???

Some options accept "arguments"--these allow for finer control over the
option's behavior.

---

:continued:

```terminal
vm$ cat --number --show-ends my-normal-file.txt
     1 This is the first line of just-another-file.txt$
     2 This is the second line of the file!$
     3 The file only has three lines, and this is the last one!$
vm$ 
```

???

Multiple options can be specified at the same time.

---

:continued:

```terminal
vm$ cat -n --show-ends my-normal-file.txt
     1 This is the first line of just-another-file.txt$
     2 This is the second line of the file!$
     3 The file only has three lines, and this is the last one!$
vm$ cat --number -E my-normal-file.txt
     1 This is the first line of just-another-file.txt$
     2 This is the second line of the file!$
     3 The file only has three lines, and this is the last one!$
vm$ cat -n -E my-normal-file.txt
     1 This is the first line of just-another-file.txt$
     2 This is the second line of the file!$
     3 The file only has three lines, and this is the last one!$
vm$ cat -nE my-normal-file.txt
     1 This is the first line of just-another-file.txt$
     2 This is the second line of the file!$
     3 The file only has three lines, and this is the last one!$
vm$ 
```

???

- Many options can also be specified with an abbreviated form.
- These usually begin with a single dash character (`-`).
- Both forms typically have the same effect on the way the program behaves
- The major differences are:
  - Short options are easier to type
  - Short options can be combined in a single dash character (`-`)
  - Long options are easier to read

---

# Anatomy of a Command

```
                   LS_COLORS="di=42" ls -lr --all --sort=size music/*.mp3
                   ^                 ^  ^   ^     ^      ^    ^     ^
                   |                 |  |   |     |      |    |     |
            ??? ---+                 |  |   |     |      |    |     |
     executable ---------------------+  |   |     |      |    |     |
  short options ------------------------+   |     |      |    |     |
   long options ----------------------------+-----+      |    |     |
option argument -----------------------------------------+    |     |
   file options ----------------------------------------------+     |
            ??? ----------------------------------------------------+
```

???

Options account for a majority of the complexity you will run across in shell
commands.

---

# Command Options

![dance instructions](dance-instructions.jpg)

"[Dance Steps on
Broadway](https://www.flickr.com/photos/javacolleen/5456875165/)" by
[javacolleen](https://www.flickr.com/photos/javacolleen/) is licensed under [CC
BY-NC-ND 2.0](https://creativecommons.org/licenses/by-nc-nd/2.0/).

???

We've seen a bunch of examples of options for various programs, but you may be
wondering, "How do we know what's available?" Even if you remember that `ls` is
short for "list," there is nothing intuitive about the usage `ls -lah`.

Fortunately, there are tools available for discovery.

---

# `man`

## Reference manual pages (documentation)

```terminal
vm$ man ls
(1)                  User Commands                 LS(1)

NAME
       ls - list directory contents

SYNOPSIS
       ls [OPTION]... [FILE]...

DESCRIPTION
       List  information  about  the  FILEs  (the  current
       directory by default).  Sort entries alphabetically
       if none of -cftuvSUX nor --sort is specified.

       Mandatory  arguments  to long options are mandatory
       for short options too.

       -a, --all
              do not ignore entries starting with .
```

???

- `man`, short for **man**ual, is a program that accepts the name of another
  program as an option.
- By default, this information is displayed by the `less` utility, so
  navigation is identical (see the previous section for details on `less`.)
- The system contains documentation for most of the available commands; these
  are referred to as "man pages."

---

# `help`

## Find information on built-in commands

```terminal
vm$ help cd
cd: cd [-L|[-P [-e]] [-@]] [dir]
    Change the shell working directory.
    
    Change the current directory to DIR.  The default DIR is the value of the
    HOME shell variable.
````

???

If a command is not available in `man`, you can try `help`. The distinction
here is beyond the scope of this chapter, although we'll revisit it in the next
chapter. For now, you can use `help` as a fallback when `man` doesn't have what
you're looking for.

---

# The `--help` option

```terminal
vm$ cat --help
Usage: cat [OPTION]... [FILE]...
Concatenate FILE(s), or standard input, to standard output.

  -A, --show-all           equivalent to -vET
```

???

Finally, many programs support a `--help` option. If `man` and `help` don't
have any information, `--help` is a good "last ditch" place to try.

---

# The Shell

```
                                 +-------+      +--------+
command text (via keyboard) ---> |       | ---> |        |
                                 | shell |      | system |
output (via display)        <--- |       | <--- |        |
                                 +-------+      +--------+
```

???

There's more to invocation than just options and arguments, though!

The command prompt we've been using is provided by a program called a "shell."
When you enter text into the prompt, the shell is responsible for wrangling
together all the necessary executables, options, and/or files. This is why it
is sometimes referred to as "the interpreter."

---

# Shell Expansion

## The `~` character


```
                   +-------+
"vm$"         <--- |       |                                    +--------+
"ls ~/movies" ---> |       | -> "/bin/ls /home/sally/movies" -> |        |
                   | shell |                                    | system |
"hellboy.mp4" <--- |       | <------- "hellboy.mp4" <---------- |        |
"vm$"         <--- |       |                                    +--------+
                   +-------+
```

???

This might sound pretty abstract, but we've already been using the shell for
its "interpreter" functionality.

The shell is responsible for translating the name "ls" to the absolute path to
the executable at `/bin/ls`. It also translates the tilde character (`~`) into
the path to the current user's "home" directory.

---

# It's All Around You

![photograph of trees extending into the sky](surrounded.jpg)

"[Surrounded](https://www.flickr.com/photos/arvinasadi/9310562017/)" by [Arvin
Asadi](https://www.flickr.com/photos/arvinasadi/) is licensed under [CC BY
2.0](https://creativecommons.org/licenses/by/2.0/)

???

Understanding the way shell expansion works helps to explain why it is
different from other invocation patterns. Individual applications can differ in
the functionality they provide (for example, we've already seen that a given
applications may or may not implement the `--help` flag). On the other hand,
because shell expansion happens *before* program invocation, it will work for
*every* application.

---

# `echo`

## Print text to the screen

```terminal
vm$ echo Whatever we type here will be printed to the screen.
Whatever we type here will be printed to the screen.
vm$ echo Please expand the tilde character ~ there.
Please expand the tilde character /home/sally there.
vm$ 
```

???

`echo` is a tool for displaying text. It can be helpful when writing shell
scripts (more on that in the next chapter), but it's also a useful way to
experiment with shell substitution.

---

# Shell Expansion

## The `*` character

```terminal
vm$ ls music
Ace of Base - I Saw the Sign.mp3
Mahler - Symphony No. 2 in C minor - 04 - Urlicht.mp3
Santana - Smooth.mp3
Stallman - Free Software Song.ogg
vm$ ls music/*.mp3
Ace of Base - I Saw the Sign.mp3
Mahler - Symphony No. 2 in C minor - 04 - Urlicht.mp3
Santana - Smooth.mp3
vm$ ls music/S*
Santana - Smooth.mp3
Stallman - Free Software Song.ogg
vm$ ls music/S*.mp3
Santana - Smooth.mp3
vm$ 
```

???

The asterisk character (`*`) is another powerful shell substitution tool for
expressing paths. Sometimes called the "wildcard" pattern, the operator allows
you to specify a group of files that share some common path "part" (e.g. file
name or sub-directory name).

Whenever the shell encounters that character in a path, it replaces the path
with a list of files that match the rest of the characters.

---

# Shell Expansion

## Opting out

```terminal
vm$ echo I have ~ 2 oranges
I have /home/sally 2 oranges
vm$ echo I have \~ 2 oranges
I have ~ 2 oranges
vm$ 
```

???

In some cases, you will need to use these special characters for their
"literal" value. To do this, write a `\` just before them.

---

# Anatomy of a Command (continued)

```
                   LS_COLORS="di=42" ls -lr --all --sort=size music/*.mp3
                   ^                 ^  ^   ^     ^      ^    ^     ^
                   |                 |  |   |     |      |    |     |
            ??? ---+                 |  |   |     |      |    |     |
     executable ---------------------+  |   |     |      |    |     |
  short options ------------------------+   |     |      |    |     |
   long options ----------------------------+-----+      |    |     |
option argument -----------------------------------------+    |     |
   file options ----------------------------------------------+     |
file "wildcard" ----------------------------------------------------+
```

???

There's just one more piece in this dissection of command patterns.

---

# Environment Variables

<iframe src="https://www.youtube.com/embed/gWPwlMv8lNI?start=176&end=221" frameborder="0" allowfullscreen>
</iframe>

???

The "**process environment**" describes a set of key-value pairs associated
with a given process. Each member of the set is an "**environment variable**",
where the key is the variable's name and the value is the variable's value.

Just like the current working directory, environment variables are a "hidden"
aspect of the system that effect the behavior of many commands.

---

# Environment Variables

## Syntax for Definition

```terminal
vm$ export myVariable=my-variable-value
vm$ echo Okay. Now what?
Okay, Now what?
vm$ 
```

???

We can use the `export` utility to create and modify environment variables.

---

# Environment Variables

## Syntax for Inspection

```terminal
vm$ export myVariable=variable-value
vm$ echo The value of the variable "myVariable" is: $myVariable
The value of the variable "myVariable" is: variable-value
vm$ export mistake=value with spaces
vm$ echo The value of the variable "mistake" is: $mistake
The value of the variable "mistake" is: value
vm$ export correct='value with spaces'
vm$ echo The value of the variable "correct" is: $correct
The value of the variable "correct" is: value with spaces
vm$ 
```

???

To inspect them, another shell substitution feature comes to the rescue.

---

# Environment Variables

## Process Isolation

```terminal
vm$ export foo=bar
vm$ echo $foo
bar
vm$ 
```

In a new shell:

```terminal
vm$ echo $foo
vm$ 
```

???

Each process has an independent variable environment. This means we can feel
confident experimenting with the environment; if anything goes wrong, we can
just close the terminal window and try again with a new one.

---

# Shells: under the hood

## The `PATH` environment variable

```terminal
vm$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/sbin
vm$ which ls
/bin/ls
vm$ which man
/usr/bin/man
vm$ export PATH=garbage
vm$ ls
Command 'ls' is available in '/bin/ls'
The command could not be located because '/bin' is not included in the PATH environment variable.
ls: command not found
```

???

The `PATH` environment variable is how the shell translates references to
executables to real files in the file system. When we type `ls`, the shell
looks in each directory in the colon-separated list until it finds an
executable.

We can modify this value at our peril.

---

# Shells: under the hood

## The `PS1` environment variable

```terminal
vm$ echo Prompt: $PS1
Prompt: vm$
vm$ export PS1="my awesome prompt "
my awesome prompt &#8203;echo Strange...
Strange...
my awesome prompt &#8203;
```

???

Remember that the shell is itself a program, so it follows all these same
rules. It uses the variable `PS1` to display the command prompt. If we modify
that variable, then we can change the behavior of the current shell.

---

# Anatomy of a Command (continued)

```
                   LS_COLORS="di=42" ls -lr --all --sort=size music/*.mp3
                   ^                 ^  ^   ^     ^      ^    ^     ^
                   |                 |  |   |     |      |    |     |
environment var ---+                 |  |   |     |      |    |     |
     executable ---------------------+  |   |     |      |    |     |
  short options ------------------------+   |     |      |    |     |
   long options ----------------------------+-----+      |    |     |
option argument -----------------------------------------+    |     |
   file options ----------------------------------------------+     |
file "wildcard" ----------------------------------------------------+
```

---

# In Review

- Commands
  - Executable
  - Options (short and long, with and without options)
  - Environment variables
  - File options
  - Shell substitutions
- Utilities
  - `echo` - display text on the screen
  - `export` - create and modify environment variables
  - `help` - display usage information for a utility
  - `man` - display **man**ual page for a utility
