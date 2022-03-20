# FROM public.ecr.aws/lambda/nodejs:14
FROM debian:latest
# Alternatively, you can pull the base image from Docker Hub: amazon/aws-lambda-nodejs:12

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY app /
RUN apt-get update
RUN apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_current.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y \
    openscad \
    nano \
    wget \
    git

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "node", "app.js" ]  
# ENTRYPOINT ["tail", "-f", "/dev/null"]