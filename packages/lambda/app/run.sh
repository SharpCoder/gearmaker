#!/bin/sh

# First parameter is file input
INPUT=$1

# Second parameter is file output
OUTPUT=$2

# Kill al Xvfb processes
ps aux | grep Xvfb | awk '{system("kill "$2)}'
rm -rf /tmp/.X99-lock 

export DISPLAY=:99
Xvfb :99 -screen 0 800x600x24 -once& openscad -o $OUTPUT --colorscheme DeepOcean $INPUT