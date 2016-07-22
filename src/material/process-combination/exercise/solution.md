1. Let's break this down into parts:
   1. List the contents of some directory X.
   2. Find the directory name of some file Y.
   3. Find the path to the `tree` utility.

   To solve this, we'll need to start with the last step and work backwards:

   - **Find the path to the `tree` utility.** The instructions mentioned a
     utility named `which`. The `man` page describes it tersely: "locate a
     command."

         vm$ which tree
         /usr/bin/tree

   - **Find the directory name of some file Y.** The instructions also
     mentioned a utility named `dirname`. The `man` page for this one is a
     little more descriptive: "strip last component from file name." We'll

         vm$ dirname /usr/bin/tree
         /usr/bin

   - **List the contents of some directory X.** The `ls` utility was one of the
     first we learned about--it lists directory contents.

         vm$ ls /usr/bin

   We've technically found the solution, but the prompt requires that we use
   command substitution. We can re-write these three commands, feeing the
   output of one into the input of the text, as follows:

       vm$ ls $(dirname $(which tree))

   As discussed in this chapter, the shell will also expand commands we write
   within "backtick" characters (<code>\`</code>), but we can't "nest" commands
   written that way. If really want to use it, we could split the command into
   separate variable assignments:

       vm$ treepath=`which tree`
       vm$ treedir=`dirname $treepath`
       vm$ ls $treedir

   Even though the command substitution syntax is shorter, using it here
   requires a lot more text. There are some merits to the longer form,
   though--here, the intermediate values are stored in variable names that may
   help the reader understand what is going on.

   The substitution operations are completely independent, so we can use both
   if we wish:

       vm$ ls $(dirname `which tree`)
       vm$ ls `dirname $(which tree)`

   ...although it's not clear why this would be desirable.

2. Whenever we want to use output of one process as the options to another, we
   should think of `xargs`. Because `booboo` writes to standard error, direct
   application won't work:

       vm$ booboo | xargs fixer
       fe2c245c8cb742e854faef9b7a3970063583b5cd
       Expected exactly 1 argument but received 0.
       Usage: fixer "value-from-booboo"
       Invoke this program with the value that the 'booboo' program writes to the
       standard error stream.
       vm$

   The first line of the output above is the value from the `booboo` process;
   this was written to the standard error stream, which was *not* redirected
   into the pipeline. `xargs`, receiving no input on its standard input stream,
   simply invoked `fixer` without any options.

   To correct this, we'll need to redirect `fixer`'s standard error stream
   before creating the pipeline:

       vm$ booboo 2>&1 | xargs fixer
       You got it!

   Using process substituion is also possible, but once again, we'll have to
   account for the source of the value--redirecting from standard error to
   standard output:

       vm$ fixer $(booboo)
       fe2c245c8cb742e854faef9b7a3970063583b5cd
       Expected exactly 1 argument but received 0.
       Usage: fixer "value-from-booboo"
       Invoke this program with the value that the 'booboo' program writes to the
       standard error stream.
       vm$ fixer $(booboo 2>&1)
       You got it!
       vm$

3. In a previous chapter, we discussed redirecting input and output to a file.
   We can simulate a pipeline by writing one process's output stream to a file,
   and then using that file as the input stream for a subsequent process.

       vm$ ls movies > movies.txt
       vm$ grep squirrel < movies.txt
       movies/get-squirrely.mp4
       movies/squirrel-boy.mp4
       movies/squirrels.mp4

   The end result is equivalent, but this approach is less efficient for a few
   reasons:

   1. Writing to a file involves transmitting data to the hard drive and
      waiting for the write operation to complete. Even with today's fancy
      solid state drives, this takes more time than a pipe (which buffers data
      in memory).
   2. The entire directory listing has to be created and stored before the
      `grep` operation can even begin. Directory listings are typically so
      small as to not present a problem, but this could be a more severe issue
      in other applications, where many gigabytes of data may pass through the
      stream.
