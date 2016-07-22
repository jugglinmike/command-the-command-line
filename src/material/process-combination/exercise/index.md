1. Use command substitution to list the contents of the directory that contains
   the `tree` utility. (Hint: you'll need a few new tools to do this; check out
   the man pages for `which` and `dirname`.) Remember that the shell performs
   command substitution when it encounters either of two separate syntaxes. Try
   to express your solution in two forms--one for each syntax. Is it possible
   to write a solution that uses both syntaxes at the same time?

2. The virtual machine includes a utility named `booboo` that simply writes a
   dynamic value to standard error.

       vm$ booboo
       fe2c245c8cb742e854faef9b7a3970063583b5cd
       vm$ booboo
       e1f18ddfe4698796e2f3178ce92c131e06b3ccb0
       vm$

   The virtual machine also includes a utility named `fixer` that expects to be
   invoked with the value from `booboo` as its only option.

   Can you satisfy `fixer` by using a pipe? What about by using command
   substitution?

3. As we've seen, pipelines are a powerful way to "wire together" independent
   processes.

       vm$ ls movies | grep squirrel
       movies/get-squirrely.mp4
       movies/squirrel-boy.mp4
       movies/squirrels.mp4

   It's also possible to set up a similar "wiring" using only input
   and output redirection (i.e. without using the "pipe" operator). Do you know
   how this could be done? Are there any performance considerations to be made?
