FROM node:12.18.2-alpine3.12

WORKDIR /front

COPY package.json /front
COPY yarn.lock /front

RUN yarn install

COPY . /front

ENTRYPOINT [ "yarn", "run", "start" ]