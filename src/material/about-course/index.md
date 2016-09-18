---
title: About the course
layout: chapter.html
---

???

The goal of this course is to improve familiarity with Unix-like systems. Many
aspects of using Unix and its derivatives are non-obvious, and some are
downright confusing. We hope to help students understand the fundamentals so
that they can begin to feel more comfortable:

- working from a text-based command prompt
- using essential utility applications
- composing custom scripts to automate work and solve problems
- perform basic system administration tasks

Whenever possible, we try to explain the rationale behind the system design so
that students will not have to rely on rote memorization to build confidence.

---

# Conventions

```terminal
pc$ code blocks like these represent a terminal
they are intended to demonstrate various commands
and their effects
pc$ 
```

???

Lines that begin with `pc$` describe commands that are intended to be entered
into your system's terminal. The `pc$` is sometimes referred to as the
"prompt", and it is intended to designate input lines. The "command" is all
the text that follows the prompt; when typing the command on your system, you
should not include the prompt.

Lines that do not begin with the prompt are "output" lines. This is text
produced in response to the command.

Note that terminal examples from other guides use the lone dollar sign
character (`$`) or even the "hash" character (`#`) as the prompt. Whatever it
looks like, the prompt's purpose is the same: to designate the command that
should be typed.

---

:continued:

```terminal
pc$ this command should be run on your system
this is output from your system

vm$ this command should be run in the virtual machine
this is output from the virtual machine
```

???

This course is designed to use a complete Unix-like system that runs as a
standalone process on your computer. This process is known as a "virtual
machine." A small number of commands in this course are intended to be run on
your system, but most of them should be executed within the virtual machine.

The `pc$` prompt denotes commands that are intended to be run on your system.
We'll use the `vm$` prompt to denote the commands that are intended for the
virtual machine.

---

# A note on shells

Executable | Name                  | Year Created
-----------|-----------------------|-------------
`bash`     | Bourne-again shel l   | 1989
`csh`      | C shell               | 1978
`dash`     | Debian Almquist shell | 1997
`ksh`      | Korn shell            | 1983
`sh`       | Bourne shell          | 1977
`tcsh`     | TENEX C shell         | 1981
`zsh`      | Z shell               | 1990

???

The terms of Unix-like systems, the word "**shell**" refers to any program that
provides a text interface to the system. There are *many* shell applications
available (this is just a partial list), and they differ substantially.

Because all interaction is mediated by the shell (:chapter:command-invocation:
has a more complete discussion of this), the distinction between features
provided by the system and features provided by the shell can be subtle.

This course focuses on system-provided functionality because that is relevant
regardless of one's chosen shell. Whenever course content describes
shell-provided functionality, this distinction is explicitly described. In
these cases, content is limited to the feature set that is shared by the more
common shells: `bash`, `sh`, and `zsh`.

Students who are interested in using shell-specific features have advanced
beyond the abilities of this course's target audience.

---

# About the exercises

![VirtualBox logo](logo-virtualbox.png)
![Vagrant logo](logo-vagrant.png)
![Ubuntu logo](logo-ubuntu.svg)

"[Vagrant Logo](https://commons.wikimedia.org/w/index.php?curid=29324827)" by
[Fco.plj](https://commons.wikimedia.org/w/index.php?title=User:Fco.plj) is
licensed under [CC BY-SA 3.0](http://creativecommons.org/licenses/by-sa/3.0)

???

In order to provide a consistent experience for all students across all
platforms, interactive exercises for this course are authored to be completed
within a "virtual machine." Thanks to the free and open source software
[VirtualBox](https://www.virtualbox.org/),
[Vagrant](https://www.vagrantup.com/), and [Ubuntu](http://www.ubuntu.com/),
students can complete the exercises in a purpose-built Unix-like environment
using their personal computer and at no charge. :chapter:setup: includes
instructions for installing these tools.

The default user account in the exercise environment is named "speaker", and it
is configured to use the Bash shell. Administrative access requires a password,
and that password is "speaker".
