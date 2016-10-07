The project in the `/var/www/sportistician` directory is a mess! Let's clean it
up a bit.

1. The files `layout.html` and `style.css` look like temporary work. Maybe you
   were in the middle of an experiment? We don't want to lose that work, so
   lets get them out of the way for now. Create a temporary directory and move
   those two files into it.

2. The rest of the HTML files look good, but they probably shouldn't be strewn
   about in this directory. Make a directory within `src` named `templates`,
   and move all the HTML files there.

3. The `src` directory has a `flash` sub-directory that no one has used in
   eight years. Lets delete it and everything inside.

4. This directory has a bunch of hidden files. They aren't being used for
   anything, so please remove them.

5. We maintain the `src/styles/legacy.css` file to support older web browsers.
   How many declarations does that file have for the `<blink>` tag?

6. Another programmer left their editor's temporary files hanging around.
   They're all over the place, but at least all their names look similar--they
   all end in the tilde character (`~`). Could you remove them?

7. This used to be a web application for tracking sports statistics, but the
   company pivoted and it is now a baking application. Let's update the
   `readme.md` file to reflect this--replace all occurrences of the word
   "stats" with "cupcakes".

8. Finally, lets retrieve those experimental files. Move them from the
   temporary directory you created back to the project directory.
