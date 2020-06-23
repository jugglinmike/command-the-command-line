1. To "background" a process, hold the `Ctrl` key and then press the `z` key.
   The terminal will print out a message telling you that the process is
   stopped; the job ID is the number enclosed in square braces, e.g. `[1]`.

2. See above. The job ID for this process should be different than the ID
   assigned to the first one (most likely one greater), e.g. `[2]`.

3. Type `fg`, followed by a space, followed by the job ID from step one, and
   then finally `Enter`/`Return`.

4. To send the "SIGINT" signal, hold the `Ctrl` key and then press the `c` key.
   After receiving this signal, the process should exit without printing
   anything to the screen.

5. Type `fg` followed by a space, followed by the job ID from step two, and
   then finally `Enter`/`Return`.

6. To send the "end of file" character, hold the `Ctrl` key and then press the
   `d` key. After receiving this character, the `tac` program should print out
   each line you entered in reverse. Remember that this is the same process you
   created in step 2, so the complete output will include the lines you entered
   back then:

       d
       c
       b
       a
