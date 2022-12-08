FROM debian:bullseye-slim

RUN apt-get -y update && apt-get -y upgrade
RUN apt-get -y install openscad
RUN apt-get install --fix-missing -y xvfb python3.10
RUN apt-get update && \
  apt-get install -y \
  g++ \
  make \
  cmake \
  unzip \
  libcurl4-openssl-dev

RUN apt-get install --fix-missing -y pip
RUN apt-get install --fix-missing -y sudo

RUN mkdir /app

# Install the function's dependencies
RUN pip3 install \
    --target /app \
        awslambdaric

RUN pip3 install \
    --target /app \
        boto3

RUN adduser geir
RUN usermod -aG sudo geir
RUN chown geir /tmp
RUN chmod 777 /tmp

COPY /app/* /app
COPY /loop.sh /app/loop.sh
COPY /start.sh /app/start.sh
COPY /gears.scad /app/gears.scad
COPY /test.txt /tmp/test.txt
COPY /.env /app/.env
WORKDIR /app

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION=us-west-2

USER geir

# ENTRYPOINT [ "python3", "-m", "awslambdaric" ]
# CMD [ "app.handler" ]

ENTRYPOINT ["/app/start.sh"]