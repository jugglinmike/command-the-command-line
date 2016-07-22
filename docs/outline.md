# Speaking \*nix outline

## 1 Introduction

- History
  - Multics
  - Bell Labs, 1970 (origin of Unix)
  - Unix Wars
  - POSIX/Single Unix Specification
  - "Unix-like"
- About this course
  - Our virtual machine
    - Vagrant and VirtualBox
    - Ubuntu distribution of GNU/Linux
  - Topic overview
- Setup instructions
  - Download and install VirtualBox
  - Download and install Vagrant
- Working with Vagrant
  - `vagrant up`
  - `vagrant ssh`
  - `vagrant halt`
  - `vagrant destroy`

## 2 Getting your bearings

- Traversing and inspecting the file system
  - `cd`, `ls`, `pwd`, `tree` (where available)
  - Special paths: `.`, `..`, `/`, `~`
  - `cat`, `less`, `sort`
  - **Exercise**: Treasure hunt
- Command invocation
  - `echo`
  - Options and arguments
    - Long versus short (convention)
    - `man`
  - Shell expansion
    - DIAGRAM: Command -> Shell -> Executable
    - Filename expansion (`*`)
    - Home expansion (`~`, as we've seen)
    - Quotation mark and backslash
  - Environment variables
    - VIDEO: "The Front Fell Off"
    - Built-in: HOME, PATH
    - `which`
    - `env`
    - Setting your own (with and without `export`)
    - Transitivity
  - **Exercise**: Invoker
- Process Management I
  - CTRL-C
  - CTRL-D
  - CTRL-Z and `fg`
- All about `sudo`
  - Intro to users and permissions
  - Dangers
  - Recognizing when it is necessary
  - Recognizing when it is *not* necessary

## 3 Improving your workflow

- File management
  - Organization: `mv`, `rm`, `mkdir`
  - Inspection: `wc`, `grep`, `find`
  - Manipulation: `nano`, `sed`, `awk`
- The edges of a process
  - Standard input, standard output, standard error
  - Input redirection from file
  - Output redirection to file (truncating)
  - Output redirection to file (appending)
  - Exit codes
- Process combination
  - Command substitution
  - Boolean logical operators: `&&`, `||`, `false`, `true`
  - Piping (plus `xargs`)
- Shells, scripting, and portability
  - Shebang
  - Formatting (comments, newlines)
  - Redirection to `/dev/null`
  - `chmod`
  - Built-ins: `if`, `[`, `exit`, `for`, `while`
  - Shell variables: `$0`, `$@`
- Customization
  - Startup scripts
    - Interactive vs. non-interactive shells
    - Login vs. non-login shells
    - `source`
  - Aliases 

## 4 Managing systems

- Process management II
  - Process IDs and `ps`, `top`
  - `kill`, `killall`
- Users and groups
  - `chown`, `groups`, `who`, `whoami`
- File system hierarchy standard
  - `/tmp` (and `mktemp`)
  - `/var/log` (and `tail`)
  - `/mnt`
  - `/opt`
- Scheduling (cron, upstart, init.d)
- Linux distributions & package managers
