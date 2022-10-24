FROM node:15-alpine


WORKDIR /usr/src/app
RUN apk --no-cache add --virtual build-dependencies python make git gcc g++

ADD package.json package-lock.json /usr/src/app/
RUN npm install
RUN apk del build-dependencies

ADD . /usr/src/app
RUN npm run tsc

ARG commit_hash='00000000'
ENV commit_hash=$commit_hash

ENTRYPOINT [ "node", "lib/server.js" ]
