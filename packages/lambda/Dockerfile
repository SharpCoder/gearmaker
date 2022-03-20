# FROM public.ecr.aws/lambda/nodejs:14
FROM debian:latest
# Alternatively, you can pull the base image from Docker Hub: amazon/aws-lambda-nodejs:12

# Assumes your function is named "app.js", and there is a package.json file in the app directory 
COPY app /
RUN touch hi

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

# Install openscad
# RUN yum install flatpak
# RUN flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo
# RUN flatpak install flathub org.openscad.OpenSCAD -y

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "node", "app.js" ]  
# ENTRYPOINT ["tail", "-f", "/dev/null"]