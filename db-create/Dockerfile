FROM node:14

COPY package.json package-lock.json /usr/src/app/
WORKDIR /usr/src/app

RUN npm install

COPY . /usr/src/app/

ENTRYPOINT [ "npm", "run" ]
