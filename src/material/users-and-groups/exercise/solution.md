1. You can create a file however you like. Here, we'll use output redirection
   (discussed in :chapter:process-bounds:):

       vm$ echo Hello > announcements.txt

   Next, we'll remove "write" permissions for the file's group:

       vm$ chmod g-w announcements.txt

   And also remove "write" permissions for everyone else:

       vm$ chmod o-w announcements.txt

   Since we want to control access for one specific user, we'll have to make
   that user the owner:

       vm$ chown root announcements.txt

   That's it! We can verify using the `ls` utility or by trying to read to and
   write from the file as a non-root user.

       vm$ ls -l announcements.txt
       -rw-r--r-- 1 root sally 6 Nov 24 18:08 announcements.txt

   This is telling us that the owner is allowed to read and write (`rw-`), that
   the group is only allowed to read (`r--`), and that all other users are only
   allowed to read (again, `r--`). It also shows that the file's owner is the
   `root` user.

   We can also verify experimentally by trying to read the file as a non-root
   user (which should work) and by trying to write to the file as a non-root
   user (which should not work):

       vm$ cat announcements.txt
       Hello
       vm$ echo 'Another line of text' >> announcements.txt
       -bash: announcements.txt: Permission denied
