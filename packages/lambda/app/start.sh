#!/bin/sh
rm -rf /tmp/.X99-lock 
export DISPLAY=:99
Xvfb :99 -screen 0 800x600x24 -once& node lambda.js