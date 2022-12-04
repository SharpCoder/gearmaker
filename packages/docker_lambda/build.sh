#!/bin/bash

if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

set -a
source .env
set +a


docker build -t 3dgearmaker --build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID --build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY . 
docker tag 3dgearmaker:latest 996737042245.dkr.ecr.us-west-2.amazonaws.com/3dgearmaker:latest
docker push 996737042245.dkr.ecr.us-west-2.amazonaws.com/3dgearmaker:latest
