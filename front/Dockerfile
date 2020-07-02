FROM node:12.18.2-alpine3.12

WORKDIR /front

COPY . /front/

RUN yarn install

ENTRYPOINT [ "yarn", "run", "serve-prod" ]