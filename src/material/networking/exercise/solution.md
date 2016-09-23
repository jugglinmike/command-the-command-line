1. We'll start by moving into the appropriate directory:

   ```
   vm$ cd /var/www/my-site
   vm$
   ```

   and then modify the `python3` command used in this chapter to listen on port
   1234:

   ```
   vm$ python3 -m http.server 1234
   Serving HTTP on 0.0.0.0 port 1234 ...
   ```

   Before we can issue any more commands, we'll need to press `Ctrl` + `Z` to
   send the job to the background:

   ```
   vm$ python3 -m http.server 1234
   Serving HTTP on 0.0.0.0 port 1234 ...
   ^Z
   [1]+  Stopped                 python3 -m http.server 1234
   ```

   ...but we're not quite ready for `curl` yet. The server is "stopped", so
   requests sent to it will hang. We'll need to set it to "running" using `bg`
   with the job ID. We can see from the terminal history that the job has an ID of
   `1`, but we could always run `jobs` to verify:

   ```
   vm$ jobs
   [1]+  Stopped                 python3 -m http.server 1234
   vm$ bg 1
   [1]+ python3 -m http.server 1234 &
   vm$
   ```

   We can now `curl` the web server:

   ```
   vm$ curl localhost:1234
   127.0.0.1 - - [29/Jul/1970 18:51:28] "GET / HTTP/1.1" 200 -
   <!DOCTYPE>
   <html>
     <head>
       <meta charset="utf-8" />
       <title>Oh boy, a Web Site!</title>
     </head>
     <body>
       Hello, world!
     </body>
   </html>
   ```

   Compare this to the file's contents on disk:

   ```
   vm$ cat /var/www/my-site/index.html
   <!DOCTYPE>
   <html>
     <head>
       <meta charset="utf-8" />
       <title>Oh boy, a Web Site!</title>
     </head>
     <body>
       Hello, world!
     </body>
   </html>
   ```

   They match!

2. Starting a second server for this directory with a different port is no
   problem:

   ```
   vm$ jobs
   [1]+  Running                 python3 -m http.server 1234 &
   vm$ python3 -m http.server 5678
   Serving HTTP on 0.0.0.0 port 5678 ...
   ^Z
   [2]+  Stopped                 python3 -m http.server 5678
   vm$ bg 2
   [2]+ python3 -m http.server 5678 &
   vm$ jobs
   [1]-  Running                 python3 -m http.server 1234 &
   [2]+  Running                 python3 -m http.server 5678 &
   vm$
   ```

   This is because there are no restrictions on how many processes can access a
   directory.

   Sharing a port is another matter. If we move to another directory (our HOME
   directory, for example) and try to run a server on the same port, there will
   be trouble:

   ```
   vm$ cd ~
   vm$ python3 -m http.server 1234
   Traceback (most recent call last):
     File "/usr/lib/python3.4/runpy.py", line 170, in _run_module_as_main
       "__main__", mod_spec)
     File "/usr/lib/python3.4/runpy.py", line 85, in _run_code
       exec(code, run_globals)
     File "/usr/lib/python3.4/http/server.py", line 1230, in <module>
       test(HandlerClass=handler_class, port=args.port, bind=args.bind)
     File "/usr/lib/python3.4/http/server.py", line 1203, in test
       httpd = ServerClass(server_address, HandlerClass)
     File "/usr/lib/python3.4/socketserver.py", line 429, in __init__
       self.server_bind()
     File "/usr/lib/python3.4/http/server.py", line 133, in server_bind
       socketserver.TCPServer.server_bind(self)
     File "/usr/lib/python3.4/socketserver.py", line 440, in server_bind
       self.socket.bind(self.server_address)
   OSError: [Errno 98] Address already in use
   vm$
   ```

   The operating system is refusing to bind the new server to a port that is
   already in use. This makes sense because the purpose of ports is to direct
   requests to a specific process. If two processes shared the same port,
   requests on that port would be ambiguous.

3. We'll start by cleaning up the active jobs. Use `fg` to bring them to the
   foreground and `Ctrl` + `C` to terminate them with the `SIGINT` signal:

   ```
   vm$ jobs
   [1]-  Running                 python3 -m http.server 1234 &  (wd: /var/www/my-site)
   [2]+  Running                 python3 -m http.server 5678 &  (wd: /var/www/my-site)
   vm$ fg
   python3 -m http.server 5678	(wd: /var/www/my-site)
   ^C
   Keyboard interrupt received, exiting.
   vm$ fg
   python3 -m http.server 1234	(wd: /var/www/my-site)
   ^C
   Keyboard interrupt received, exiting.
   vm$ jobs
   vm$
   ```

   This step specifies that the host name `commander.local` should resolve to
   our own system. This sounds like a job for the `/etc/hosts` file.

   If we try to modify it as the "vagrant" user, `nano` will report an error:
   "Permission denied."

   ```
   vm$ nano /etc/hosts
   ```

   So we'll need to use `sudo` with the `nano` command:

   ```
   vm$ sudo nano /etc/hosts
   ```

   We'll add the line `127.0.0.1 commands.local`, which means "redirect
   requests for the host `commander.local` to the loopback address." When we're
   done, the `/etc/hosts` file should look like this:

   ```
   127.0.0.1	localhost
   127.0.0.1	commander.local
   ```

   With the system configured correctly, all that's left is to run the server
   process. Since it is expected to server `/var/www/my-site/index.html`, we
   should be in the `/var/www/my-site` directory when we start it:

   ```
   vm$ cd /var/www/my-site
   ```

   And since the provided `curl` command has no explicit port, we should run
   the server on port 80:

   ```
   vm$ python3 -m http.server 80
   Traceback (most recent call last):
     File "/usr/lib/python3.4/runpy.py", line 170, in _run_module_as_main
       "__main__", mod_spec)
     File "/usr/lib/python3.4/runpy.py", line 85, in _run_code
       exec(code, run_globals)
     File "/usr/lib/python3.4/http/server.py", line 1230, in <module>
       test(HandlerClass=handler_class, port=args.port, bind=args.bind)
     File "/usr/lib/python3.4/http/server.py", line 1203, in test
       httpd = ServerClass(server_address, HandlerClass)
     File "/usr/lib/python3.4/socketserver.py", line 429, in __init__
       self.server_bind()
     File "/usr/lib/python3.4/http/server.py", line 133, in server_bind
       socketserver.TCPServer.server_bind(self)
     File "/usr/lib/python3.4/socketserver.py", line 440, in server_bind
       self.socket.bind(self.server_address)
   PermissionError: [Errno 13] Permission denied
   vm$
   ```

   Port 80 is "privileged," though, so we'll actually need to run this server
   with `sudo`:

   ```
   vm$ sudo python3 -m http.server 80
   Serving HTTP on 0.0.0.0 port 80 ...
   ```

   We can now verify the solution by placing the server process in the
   background and running the provided `curl` command:

   ```
   vm$ sudo python3 -m http.server 80
   Serving HTTP on 0.0.0.0 port 80 ...
   ^Z
   [1]+  Stopped                 sudo python3 -m http.server 80
   vm$ bg 1
   [1]+ sudo python3 -m http.server 80 &
   vm$ curl commander.local
   127.0.0.1 - - [29/Jul/1970 19:22:39] "GET / HTTP/1.1" 200 -
   <!DOCTYPE>
   <html>
     <head>
       <meta charset="utf-8" />
       <title>Oh boy, a Web Site!</title>
     </head>
     <body>
       Hello, world!
     </body>
   </html>
   vm$
   ```

   Using `sudo` like this is a fine solution for our local development
   environment, but don't forget the security risks of running a server with
   advanced permissions.
