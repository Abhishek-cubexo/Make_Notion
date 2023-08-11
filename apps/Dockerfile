FROM node:lts-alpine

WORKDIR /app

#COPY ./dist/apps/client .
RUN apk update && apk add bash

#COPY package*.json ./
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add --no-cache make
RUN apk add build-base

COPY . .
RUN npm install
COPY . .
RUN npm install -g @nestjs/cli
RUN npm i -g nx

ENV PORT=3333

EXPOSE ${PORT}

ENTRYPOINT ["nx", "serve", "server"]





