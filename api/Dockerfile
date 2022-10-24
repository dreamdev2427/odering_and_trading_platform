FROM node:14

ADD package.json package-lock.json /usr/src/app/
WORKDIR /usr/src/app

RUN npm install

ADD . /usr/src/app/

ARG commit_hash='00000000'
ENV commit_hash=$commit_hash

ENTRYPOINT [ "npm", "start" ]
