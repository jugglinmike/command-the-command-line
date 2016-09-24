#!/bin/bash

function footpath_branch() {
  local current=$1
  cat > sign.txt <<SIGN
            .--.
.-----------|__|------------.
|                           |
| This is a useless sign.   |
|             Keep looking! |
|                           |
'---------------------------'
            |  |
            |  |
            |  |
            |  |
            |  |
           .|__|.
SIGN
  if [ "$current" = 0 ]; then
    return
  fi
  local next=$(($current - 1))
  mkdir left
  (cd left; footpath_branch $next)
  mkdir straight
  (cd straight; footpath_branch $next)
  mkdir right
  (cd right; footpath_branch $next)
}

function footpath() {
  footpath_branch 5

  cat > right/straight/left/right/sign.txt <<SIGN
            .--.
.-----------|__|------------.
|                           |
|    Go back 2 steps and    |
|    straight two more.     |
|                           |
'---------------------------'
            |  |
            |  |
            |  |
            |  |
            |  |
           .|__|.
SIGN

  cat > right/straight/straight/straight/sign.txt <<SIGN
            .--.
.-----------|__|------------.
|                           |
|    Go to \$MAGIC_PORTAL    |
|                           |
|                           |
'---------------------------'
            |  |
            |  |
            |  |
            |  |
            |  |
           .|__|.
SIGN
}

function cave() {
  local places="2 3 4 5 6 8 12 15 16 17 21 22 25 23"
  local portal=''

  for place in $places; do
    mkdir $place
    touch $place/cave-dweller
    cat > $place/cave-dweller <<SPEECH
 .--------------------------------------.
/                                        \ 
|   Welcome to my cave! I have nothing   |
|       interesting to tell you.         |
\                                        /
 '--. .---------------------------------'
    |/
SPEECH
  done
  cat > 22/cave-dweller <<HERE
 .--------------------------------------.
/                                        \ 
|   The forest contains a great many     |
|   things. I tried to take stock of     |
|    them all, but I quickly became      |
|   overwhelmed. Now it's just simple    |
|   cave life for me. Anyway, I left     |
|   my "inventory" behind--you might     |
|         find it interesting.           |
\                                        /
 '--. .---------------------------------'
    |/
HERE

  mkdir -p '2/4?4/5\|5-9/9:4[]4/0))1/2@!3'
  cat > '2/4?4/5\|5-9/9:4[]4/0))1/2@!3/sand.txt' <<HERE
You find yourself in an enclosed space, many directories inside the
'island/cave/'.

As you know, your current location is a directory on the file system. That
directory is within another directory, which is in another directory, and so
on.

Your next location must be derived from your current location. Each directory
that makes up your current location starts with a numeric digit.  If 'X' is the
sum of those digits, go to 'island/cave/X' and speak to the cave dweller you
find there.
HERE
}


# Generate random character string (lowercase letters only)
function random_letters() {
  cat /dev/urandom | tr -dc 'a-z' | fold -w $1 | head -n 1
}

function forest() {
  local things="dirt stone rock mud ant caterpillar aardvark butterfly bee
  cardinal stream leaf grass moss mushroom thorn bush flower twig stick stem
  petal berry squirrel sap bark briar breeze pollen seed egg honey nest creek
  river mist fire pinecone robin ash thicket dew water bear"

  local things=$(echo $things | tr ' ' '\n')
  local count=$(($(echo "$things" | wc -l) / 2))

  local half_things=$(echo "$things" | head --lines $(($count / 2)))

  range=$(($count * 4))-$(($count * 8))
  for thing in $things; do
    length=$(shuf -i $range -n 1)
    random_letters $length > $thing
  done

  cat > inventory <<HERE
> This is a partial inventory of the forest, in no particular order. The next
> instruction is in the item that would appear last if the items were arranged
> alphabetically.

$half_things
HERE

  echo "The item you seek is in the branch of a tree." >> stream

  for idx in $(seq 1 20); do
    mkdir tree$idx
    mkdir tree$idx/branch1
    mkdir tree$idx/branch2
    mkdir tree$idx/branch3
    mkdir tree$idx/branch4
    mkdir tree$idx/branch5
  done

  cat > tree14/branch2/item <<HERE
You found the treasure! Congratulations!

                   _.--.
               _.-'_:-'||
           _.-'_.-::::'||
      _.-:'_.-::::::'  ||
    .' -.-:::::::'     ||
   /.' ;|:::::::'      ||_
  ||   ||::::::'     _.;._'-._
  ||   ||:::::'  _.-!oo @.!-._'-.
  ''.  ||:::::.-!()oo @!()@.-'_.|
   '.'-;|:.-'.&#@.& ()$%-'o.'\U||
     '>'-.!@%()@'@_%-'_.-o _.|'||
      ||-._'-.@.-'_.-' _.-o  |'||
      ||=[ '-._.-\U/.-'    o |'||
      || '-.]=|| |'|      o  |'||
      ||      || |'|        _| ';
      ||      || |'|    _.-'_.-'
      |'-._   || |'|_.-'_.-'
       '-._'-.|| |' '_.-'
           '-.||_/.-'
HERE
}

mkdir island
cd island

cat > turtle.txt <<HERE
I am a talking turtle, hello.

Your quest for the treasure begins at the "footpath" directory. Go there, and
proceed to walk right, straight, left, and right. Read the sign at that spot.

(The turtle walks away very slowly.)
HERE

(mkdir footpath && cd footpath && footpath)
(mkdir cave && cd cave && cave)
(mkdir forest && cd forest && forest)
