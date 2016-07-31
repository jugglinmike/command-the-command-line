---
title: File Management
layout: chapter.html
---

???

Unix-like systems trade in files. A great deal of their configuration and even
their *state* is stored in files spread across the file system. This is
distinct from Microsoft Windows, for instance, where much of the analogous
information is stored in a global "registry" database.

So not only is comfort with files an essential part of improving your workflow,
its also crucial to understanding and interacting with the operating system
itself.

---

# Overview

- File organization: `mv`, `rm`, `mkdir`
- File inspection: `wc`, `grep`, `find`
- File manipulation: `nano`, `sed`, `awk`

???

We're going to cover a whole bunch of utilities in this section. With the
exception of `nano`, these programs are included in the POSIX standard. For
this course, we're concerned with the mainline use cases; you can consult the
`man` pages for details on all the capabilities of each tool.

---

# `mv`

```
vm$ ls good-guys
dent-harvey.jpg
fries-victor.jpg
gordon-jim.jpg
kyle-selina.jpg
nigma-edward.jpg
vm$ ls bad-guys
vm$ mv good-guys/dent-harvey.jpg bad-guys
vm$ ls good-guys
fries-victor.jpg
gordon-jim.jpg
kyle-selina.jpg
vm$ ls bad-guys
dent-harvey.jpg
vm$
```

???

We'll use the `mv` utility to **m**o**v**e files and directories around. The
first option is the source and the second is the destination.

---

:continued:

```
vm$ mv good-guys/fries-victor.jpg good-guys/kyle-selina.jpg bad-guys
vm$ ls good-guys
gordon-jim.jpg
vm$ ls bad-guys
dent-harvey.jpg
fries-victor.jpg
kyle-selina.jpg
vm$
```

???

We can use `mv` to move multiple files at once. If there are more than two file
options, the very last will be interpreted as the destination directory for all
of the others. This feature can be very helpful when used with the `*` shell
expansion character.

---

:continued:

```
vm$ cd bad-guys
vm$ mv dent-harvey.jpg twoface.jpg
vm$ ls
fries-victor.jpg
kyle-selina.jpg
twoface.jpg
```

???

`mv` is also commonly used to rename files. This might seem a little
counter-intuitive, though. Just remember that renaming a file is no different
from "moving" it between two names.

---

:continued:

```
vm$ cd ..
vm$ mv bad-guys/twoface.jpg good-guys/dent-harvey.jpg
```

???

...and there is nothing stopping us from renaming a file as we change its
directory.

---

# `rm`

```
vm$ ls
my-directory
my-first-file
my-second-file
vm$ rm my-first-file my-second-file
vm$ ls
my-directory
vm$
```

???

We'll use `rm` to **r**e**m**ove files and directories.

---

:continued:

```
vm$ ls
my-directory
vm$ rm my-directory
rm: cannot remove ‘dir’: Is a directory
vm$ rm -r my-directory
vm$ ls
vm$
```

???

By default, `rm` will *not* remove directory--we'll need to use the `r` option
to remove **r**ecursively. This extra option may seem inconvenient, but it
often protects you from accidentally deleting things.

---

# `mkdir`

```
vm$ mkdir my-new-directory
vm$ ls
my-new-directory
vm$ ls my-new-directory
vm$
```

???

`mkdir` creates a new empty directory.

---

# Overview

- File organization:
  - `mv` - change the location of files and directories (as in "**m**o**v**")
  - `rm` - delete files and directories (as in "**r**e**m**ove")
  - `mkdir` - create directories (as in "**m**a**k**e **dir**ectories")
- File inspection: `wc`, `grep`, `find`
- File manipulation: `nano`, `sed`, `awk`

???

Now that we know a little more about organizing files, we'll learn about a few
ways to inspect their contents.

---

# `wc`

```
vm$ cat just-another-file.txt
This is the first line of just-another-file.txt
This is the second line of the file!
The file only has three lines, and this is the last one!
vm$ wc just-another-file.txt
  3  27 142 just-another-file.txt
vm$
```

The `wc` utility (short for "**w**ord **c**ount") displays the number of
newlines, words, and bytes in a given file. The output is pretty terse, though!

---

# `grep`

```
vm$ grep CSSConf index.html
<h3 class="work-hed"><a href="http://2016.cssconf.com">CSSConf</a></h3>
CSSConf is a conference dedicated to the designers, developers and engineers
edge techniques, and tools. CSSConf US part of the international family of
CSSConfs, and is organized by Bocoup in collaboration with conference founder
```

???

`grep` allows us to search for text inside a file. By default, it displays each
line of text that contains the provided value.

`grep`'s name comes from its historic context (based on a command for the `ed`
text editor), so this is a case where rote memorization may be necessary.

---

:continued:

```
vm$ grep -E '<h[1-5]' index.html
<h1 class="logo">
<h2 class="mission">Open Design & Technology Services for
<h3 class="section-hed"><strong>Partner with us</strong>
<h3 class="work-hed"><a href="https://bocoup.com/services
<h3 class="work-hed"><a href="https://bocoup.com/services
<h3 class="work-hed"><a href="https://bocoup.com/services
<h3 class="section-hed">We work across industries to brin
<h3 class="work-hed"><a href="https://bocoup.com/work/lyr
<h3 class="work-hed"><a href="https://bocoup.com/work/jsi
<h3 class="work-hed"><a href="https://bocoup.com/work/hbr
<h3 class="work-hed"><a href="https://bocoup.com/work/rue
<h3 class="section-hed">We create events to bring communi
<h3 class="work-hed"><a href="http://2016.cssconf.com">CS
<h3 class="section-hed">Our team <strong>creates, champio
<h2 class="section-hed">We'd love to hear from you. <stro
<h2>Join our newsletter for Bocoup news you can use!</h2>
vm$
```

???

`grep` also accepts regular expressions, which are a very powerful way to
express text queries. Regular expressions are beyond the scope of this course,
though, so don't worry if you're not comfortable using them.

---

# `find`

```
vm$ find src -name index.html
src/index.html
src/birds/index.html
src/birds/penguins/index.html
src/birds/puffins/index.html
src/cereal/index.html
src/cereal/capn-crunch/index.html
src/cereal/fruit-loops/index.html
vm$ 
```

???

`find` is also useful for locating files. Unlike `grep` (which is geared
towards searching through files by their content), `find` is built to search
for files according to meta-data such as file name and file type. If the
provided path is a directory, `find` will search through all the files and
directories inside.

Remember that every utility defines its own rules for command-line options. As
mentioned in the previous chapter, this allows for some inconsistency. `find`
is an example--notice how `-name` is a "long" option with only *one* leading
hyphen character.

This is one small case where Unix's complicated history has negatively impacted
the user experience.

---

:continued:

```
vm$ find documents/recipes -name *carrot*
vm$ echo *carrot*
giant-carrot.jpg
vm$ echo \*carrot\*
*carrot*
vm$ find documents/recipes -name \*carrot\*
documents/recipes/appetizers/cold-carrot-soup.pdf
documents/recipes/carrot-free
documents/recipes/desserts/carrot-cake.odt
documents/recipes/sides/carrots.pdf
vm$ 
```

???

`find` interprets the asterisk character (`*`) in the same way that our shell
does. As we've seen, though, the shell normally substitutes that pattern
*before* invoking the command. Because we want the asterisk character to make
it all the way to the `find` program, we need to escape it with the backslash
character (`\`).

---

# Overview

- File organization:
  - `mv` - change the location of files and directories (as in "**m**o**v**")
  - `rm` - delete files and directories (as in "**r**e**m**ove")
  - `mkdir` - create directories (as in "**m**a**k**e **dir**ectories")
- File inspection
  - `wc` - display statistics for a text file, including details like number of
    words and number of lines ("**w**ord **c**ount")
  - `grep` - find text within a file
  - `find` - find files and directories based on meta data
- File manipulation: `nano`, `sed`, `awk`

???

Finally, we'll take a look at a few tools for modifying file contents.

---

# `nano`

```
vm$ nano hello.txt
  GNU nano 2.2.6        File: hello.txt                      

Hello, world!




                       [ Read 1 line ]
^G Get Hel^O WriteOu^R Read Fi^Y Prev Pa^K Cut Tex^C Cur Pos
^X Exit   ^J Justify^W Where I^V Next Pa^U UnCut T^T To Spell
```

???

`nano` is a text editor program that is available on many systems. There are a
great number of alternative editors available (for instance, `vim` and `emacs`),
but `nano` is commonly considered the most straightforward. This makes it a great
choice when first getting started.

Editor commands are performed using the `Ctrl` modifier key. `nano` displays
the most essential commands at the very bottom of the terminal window. These are
somewhat truncated in the example above due to space limitations.

---

# `sed`

```
vm$ cat quote.txt
It's 106 miles to Chicago, we got a full tank of gas, half a pack of
cigarettes, it's dark... and we're wearing sunglasses. 
vm$ sed s/Chicago/Boston/ quote.txt
It's 106 miles to Boston, we got a full tank of gas, half a pack of
cigarettes, it's dark... and we're wearing sunglasses. 
vm$ 
```

???

The `sed` utility allows us to replace text matching one pattern with another.
The search pattern is the string between the first and second forward slash
character (`/`), and the replacement pattern the string between the second and
third forward slash character.

---

:continued:

```
vm$ cat quote.txt
It's 106 miles to Chicago, we got a full tank of gas, half a pack of
cigarettes, it's dark... and we're wearing sunglasses. 
vm$ sed --in-place s/Chicago/Boston/ quote.txt
vm$ cat quote.txt
It's 106 miles to Boston, we got a full tank of gas, half a pack of
cigarettes, it's dark... and we're wearing sunglasses. 
vm$ 
```


???

By default, `sed` prints the result on the terminal. Because it is such a
powerful tool, we may want to verify the effect of our command before actually
changing any files. Once we're confident that the change meets our expectation,
we can instruct `sed` to modify the file "in place" with the `-i`/`--in-place`
option.

---

:continued:

```
vm$ sed -r s/(moz|webkit)R(equestAnimationFrame)/r\2/ -i src/utils/raf.js
```

???

Like `grep`, `sed` recognizes regular expressions. Actually, the behavior of
`sed` can be controlled with an entire scripting language! The topic of writing
`sed` scripts is outside the scope of this course, but it is an extremely
powerful way to automate text file transformations.

---

# `awk`

```
vm$ cat src/foo.css 
body {
  margin-left: 0;
  padding: 0;
}
table.data {
  color: red;
  margin: 0 1em;
}
vm$ awk '/\{/ { s = $0 } /margin/ { print s "\n" $0 "\n}" }' src/foo.css
body {
  margin-left: 0;
}
table.data {
  margin: 0 1em;
}
vm$ 
```

???

The `awk` utility performs a similar function to `sed`, but it implements a
programming language that some feel is much more maintainable. We won't go into
the details of using `awk` in the course, but this is a good tool to reach for
when you need to perform advanced text manipulation.

---

# In Review

- File organization:
  - `mv` - change the location of files and directories (as in "**m**o**v**")
  - `rm` - delete files and directories (as in "**r**e**m**ove")
  - `mkdir` - create directories (as in "**m**a**k**e **dir**ectories")
- File inspection
  - `wc` - display statistics for a text file, including details like number of
    words and number of lines ("**w**ord **c**ount")
  - `grep` - find text within a file
  - `find` - find files and directories based on meta data
- File manipulation
  - `nano` - text editor
  - `sed` - find and replace text (as in "**s**tream **ed**itor")
  - `awk` - find and replace text
