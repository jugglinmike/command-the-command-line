# A Brief History of Unix

---

# MULTICS

???

AT&T, General Electric, and MIT collaborated on a time-sharing operating system
with the goal of security, reliability, and robustness. AT&T eventually left
the project.

---

# Bell Labs, 1970

![AT&T Bell Labs](bell-labs.jpg)

"[Bell Labs - Eero
Saarinen](https://www.flickr.com/photos/sodapop81/2412025709/)" by [s o d a p o
p](https://www.flickr.com/photos/sodapop81/) is licensed under [CC BY-ND
2.0](https://creativecommons.org/licenses/by-nd/2.0/)

???

The team at AT&T's Bell Labs decided to start from scratch on a new project
with similar goals but a smaller scope. The result was the first version of the
Unix operating system.

The system was modified to run on various machines, first within Bell Labs,
then at various universities, and then (under software licensing agreements) to
commercial workstation manufacturers.

---

# The Unix Wars

???

The differences between these modified versions of Unix effected the way that
programmers wrote application code. A program written for one "flavor" of Unix
might not work on another.

This situation caused many to call for a formal standard. Each workstation
manufacturer had a vested interest in their particular version to be recognized
as the standard implementation. This led to overt competition between the
manufacturers, each vying for industry recognition.

---

# Standardization

???

Over the course of many years, vendors formed two separate open standards
groups. These groups ultimately joined to become the Common Open Software
Environment alliance. They produced a standard for a set of utilities and
programming interfaces named POSIX. Any system that adheres to this standard is
today considered "a Unix."

---

# "Unix-like"

![Linux Penguin](penguin.svg)

"[Penguin](http://www.home.unix-ag.org/simon/penguin/)" by [Larry
Ewing](http://www.isc.tamu.edu/~lewing/) & [Garrett
LeSage](https://github.com/garrett/Tux) is licensed under
[CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en)

???

Meanwhile, the proprietary code in the Unix-derived BSD operating system was
re-written, making it a completely standalone project. Separately, the Linux
kernel was written from scratch and eventually incorporated into the GNU
project to form the GNU/Linux operating system.

While these systems generally target compatibility with the POSIX standard,
they are not officially compliant. Because the name "Unix" is a trademark
currently registered to the Open Group, these systems cannot be legally
referred to as Unix implementations. So we use the term "Unix-like" or "\*nix"
to describe them.

---

![A diagram showing the key Unix and Unix-like operating systems](unix-history.svg)

"[Unix
history-simple.svg](https://en.wikipedia.org/wiki/File:Unix_history-simple.svg)"
by [Eraserhead1](https://commons.wikimedia.org/wiki/User:Eraserhead1),
[Infinity0](https://commons.wikimedia.org/wiki/User:Infinity0), &
[Sav_vas](https://commons.wikimedia.org/wiki/User:Sav_vas) is licensed under
[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

???

The result is an ecosystem of platforms with intertwined histories and
sometimes-incompatible features. "Speaking \*nix" doesn't require familiarity
with all the edges, but like any pidgin language, it benefits from some
appreciation of the history. Hopefully this brief introduction has given you
the context you'll need to appreciate the nuances of these systems.
