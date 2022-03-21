#!/bin/sh

docker build -t 3dgearmaker .
docker tag 3dgearmaker:latest 996737042245.dkr.ecr.us-west-2.amazonaws.com/3dgearmaker:latest
docker push 996737042245.dkr.ecr.us-west-2.amazonaws.com/3dgearmaker:latest