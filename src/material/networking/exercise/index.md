1. Move into the directory named `/var/www/my-site` and start a server on port
   `1234`. Verify that the server is running correctly by comparing the results
   of the following commands:

   - `curl`, when run with your server's name and port
   - `cat`, when run with the `index.html` file contained in that directory

2. Can you start a second server from the same directory but using a different
   port number? Why or why not? Can you start a second server from a different
   directory but using the same port number? Why or why not?

3. Stop any server jobs you have running (recall the `jobs` command from
   :chapter:process-mgmt-1:). Can you configure your system such that the
   command `curl speaker.local` returns the contents of
   `/var/www/my-site/index.html`?
