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

2. We'll make the file with output redirection again:

       vm$ echo true > penguins.sh

   There is no file permission that allows/disallows deleting specifically; any
   user with "write" permission to a file may also delete that file. There's a
   good reason for this: any user who can edit a file is able to remove all of
   that file's contents. In other words, they can essentially delete the file.
   So there's not much use in defining a separate "delete" permissions.
   Permissions are already complicated enough!

   That means we can rewrite this exercise to say, "Create a file that only
   members of the group named `sudo` can **modify**." If we want to grant
   access to a file for a specific group, that file needs to "below" to the
   group. Setting file ownership is a job for `chown`:

       vm$ chown :sudo penguins.sh

   We can verify using `ls`:

       vm$ ls -l penguins.sh
       -rw-r--r-- 1 sally sudo 5 Dec  8 17:42 penguins.sh

  The word `sudo` in the fourth column proves that the file now belongs to the
  group named `sudo`.

  We use the `chmod` utility to set the permissions for files. In this case,
  we want to target the file's group (so we'll use `g`), we want to add a
  permission (so we'll use the plus sign, `+`), and we want the select the
  "write" permission (so we'll use `w`):

      vm$ chmod g+w penguins.sh

  Once again, `ls` will let us review the permission information:

      vm$ ls -l penguins.sh
      -rw-rw-r-- 1 sally sudo 5 Dec  8 17:42 penguins.sh

  That's almost right, but the instructions say that *only* members of the
  `sudo` group should be able to delete the file. The permissions field reads
  `-rw-rw-r--`. The first `rw-` means that the owner is also allowed to modify
  (and therefore delete) the file. We'll need to use `chmod` to revoke that
  permission: `u` to target the file's owner, `-` to remove the permission, and
  `w` to select the "write" permission:

      vm$ chmod u-w penguins.sh

  Now (finally), we should have a file in the desired state.

      vm$ ls -l penguins.sh
      -r--rw-r-- 1 sally sudo 5 Dec  8 17:42 penguins.sh
