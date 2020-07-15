FROM node:12.18.2-alpine3.12

WORKDIR /front

COPY package.json /front
COPY package-lock.json /front

RUN npm install

COPY . /front

ENTRYPOINT [ "npm", "run", "start" ]