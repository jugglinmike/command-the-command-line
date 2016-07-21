`invoker` is the name of a program installed in the virtual machine. You can
execute it as follows:

    vm$ invoker

You'll find that it is picky about its expected input. If get lost, invoke the
program with the `--help` option, as in:

    vm$ invoker --help

...or read the instructions below. If you'd like to start from the beginning,
invoke the program with the `--reset` option, as in:

    vm$ invoker --reset

---

1. Please invoke me with every file in the "/bin" directory that contains the
   letter "t" and/or that ends with the letter "s".

2. Please invoke me with the value "Making the big $bucks."

3. I support the "--word" option and the "short" version "-w". I also support
   the "-x" option. There are six unique ways to specify these options, even
   though each version means the same thing. Can you invoke me with all of
   them?

4. Please invoke me with the "foo" environment variable set to "bar" and the
   "LIMIT" environment variable to "max".
