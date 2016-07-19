1. First, we need to make a temporary directory using the `mktemp` utility

       $ mktemp -d

   That command should print a directory name to the screen. This is the path
   to the new temporary directory. We'll use that as the destination for the
   files--replace `{destination}` with the path to the temporary directory in
   the following command:

       $ mv layout.html style.css {destination}

2. The `mkdir` utility will create a directory at whatever path we provide:

       $ mkdir src/templates

   ...now we can move the HTML files. That's a lot of files, though! We could
   type them all out, but it will be much quicker to use the `*` character
   (remember: that tells our shell to substitute all the files that match)

       $ mv *.html src/templates

3. This sounds like a job for `rm`. We'll get an error if we try to use it on
   a directory without any options, so we need to explicitly say we're looking
   to delete a directory:

       $ rm -r src/flash

4. It's tempting to use the `*` character here, too, but that won't quite work.
   If we use `echo` to see how the expansion works...

       $ echo .*
       . .. .a .b .c .d

   ...we can see that this includes the `.` and `..` directories. Practically
   speaking, this is okay because `rm` will fail to delete those, report
   errors, and continue deleting the others. But if we want to be precise,
   we're better off explicitly deleting each of the others:

       $ rm -r .a .b .c .d

5. We'll use `grep` to find the references:

       $ grep blink src/styles/legacy.css

   There are a bunch of false positives here, though. They are easy to spot,
   but we can use a more advanced query to do that work for us:

       $ grep -E '\bblink\b' src/styles/legacy.css

6. This is a two-parter. First, we'll use `find` to locate the files we want to
   remove:

      $ find src -name '*~'

   Next, we'll remove each of those files:


   This was better than manually inspecting the contents of each directory with
   `ls`, but it was still a little bit of a hassle to remove each file. Later
   on, we'll see how we can wire these two commands together.

7. Whenever you want to replace text, `sed` should come to mind.

   $ sed s/stats/cupcakes/ readme.md

8. This is the reverse of the first step, just remember the name of the
   temporary directory!

       $ mv {destination}/layout.html .
       $ mv {destination}/style.css .
