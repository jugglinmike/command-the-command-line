In order to complete these exercises, configure your environment to apply these
settings automatically.

1. Customize your shell to greet you when you first log in (but not when you
   run a script or execute a new shell in the same session).
2. Update your command prompt to include the current date, as provided by the
   `date` utility. This prompt should also be used if you execute `bash` from
   the command line.
3. The `ls` utility supports an option named `--color` that causes the program
   to display certain kinds of files with fancy colors. Override the built-in
   `ls` utility with a custom alias that enables this option.
4. Define an alias for the `alias` command that is named `alias`.
5. You may find that you are commonly leaving "to-do" notes to yourself in your
   files. `nano` can help you avoid forgetting about them by highlighting
   special text. Customize `nano` to `color` the text "TODO" in black with a
   yellow background.

   A few hints:

   - Start with `man nano`.
   - Your final solution will need a "regular expression" for file names--use
	 the value `".*"` (including quotation marks) to enable this highlighting
     for all files.
