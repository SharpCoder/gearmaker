#!/bin/bash

source .env
sudo -i -u geir

echo "I am groot" && id

rm -rf /tmp/.X99-lock 
export DISPLAY=:99
Xvfb :99 -screen 0 800x600x24 -once&
python3 -m awslambdaric app.handler