# Speaking \*nix outline

## 1 Introduction

- History
  - What is "\*nix", anyway?
  - Why are things so messed up?
  - It's "okay" to be critical
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

- TOPIC: Traversing and inspecting the file system
  - `cd`, `ls`, `pwd`, `tree` (where available)
  - Special paths: `.`, `..`, `/`, `~`
  - `cat`, `less`, `wc`, `sort`, `head`, `tail`
- EXERCISE: Treasure hunt
- TOPIC: Command invocation
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
  - EXERCISE: Invoker
- Exiting processes
  - CTRL-C
  - CTRL-D
  - CTRL-Z and `fg`
- All about `sudo`
  - Intro to users and permissions
  - Dangers
  - Recognizing when it is necessary
  - Recognizing when it is *not* necessary

## 3 Improving your workflow

- Process management
  - Exit codes and `$?`
  - Process IDs and `ps`, `top`, `kill`, `killall`
  - Standard in/out/err redirection
- Essential utilities
  - File management: `mv`, `rm`, `touch`, `mktmp`
  - Inspection: `grep`, `find`
  - Manipulation: `sed`, `awk`
- Combining
  - Command substitution
  - Boolean logical operators: `&&`, `||`
  - Piping (plus `xargs`)
- Shells, scripting, and portability
  - Shebang
  - Formatting (comments, newlines)
  - `chmod`
  - Built-ins: `if`, `[`, `exit`, `for`, `while`
  - Substitions: `$0`, `$@`
- Customization
  - Startup scripts
    - Interactive vs. non-interactive shells
    - Login vs. non-login shells
    - `source`
  - Aliases 

## 4 Managing systems

- Users and groups
  - `chown`, `groups`, `who`, `whoami`
- File system hierarchy standard
- Scheduling (cron, upstart, init.d)
- Linux distributions & package managers
