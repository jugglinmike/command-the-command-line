1. Use `cd` to move into the `island` directory.

       vm$ cd island

   Next, use `cat` to read the contents of `turtle.txt` (to "talk" with the
   turtle):

       vm$ cat turtle.txt

2. The steps through the footpath are just directory names. Use `cd` to move
   through them:

       vm$ cd footpath/right/straight/left/right

   There is apparently a "sign" in this directory; we can "see" it using `ls`:

       vm$ ls
       left  right  sign.txt  straight
       vm$

   The file is named `sign.txt`. Use `cat` to read it:

       vm$ cat sign.txt

3. In this context, we'll interpret "go back," to mean "move to the parent
   directory." We'll use `..` to express this. We have to do that twice, then
   travel into two `straight` directories:

       vm$ cd ../../straight/straight

   ...and then read the `sign.txt` file there:

       vm$ cat sign.txt

3. We'll "go to" the `$MAGIC_PORTAL` using `cd`:

       vm$ cd $MAGIC_PORTAL

4. We're out of instructions, so we'll use `ls` to "look around":

       vm$ ls

   This reveals a file named `sand.txt`. Once again, `cat` will display its
   contents:

       vm$ cat sand.txt

5. We can find the current directory using the `pwd` utility

       vm$ pwd

   Remember that the "forward slash" character (`/`) is the path separator,
   so we should note every digit that follows that character (and ignore the
   rest). We'll use `cd` to move to the appropriate sub-directory of the
   `/home/speaker/island/cave` directory.

6. We can "speak" to the cave dweller by reading the contents of the
   `cave-dweller` file:

       vm$ cat cave-dweller

7. After moving to the forest:

       vm$ cd ../../forest

   We can inspect the contents with `ls`:

       vm$ ls

   Sure enough, there is a file named `inventory`. Use `cat` to read the
   contents:

       vm$ cat inventory

   We could find the last item by comparing them all ourselves, but we know
   that the `sort` tool will display a file's contents in sorted order:

       vm$ sort inventory

   The last item in that output is our next step.

8. We'll use `cat` to read the contents of the item from the previous step.
   It looks like we need to find a file inside one of the "tree" directories.
   There's a lot of sub-directories there, and searching them one-by-one could
   take a long time. We should use `tree` to get a visual overview of the whole
   "forest" directory:

       vm$ tree

   Now it's clear where that file is. Based on the contents, this is the file
   we've been searching for, so we're done!
