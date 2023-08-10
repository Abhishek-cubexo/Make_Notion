
FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/server .

COPY package.json package-lock.json ./

ENV PORT=3333

EXPOSE ${PORT}

RUN npm install 

CMD node ./main.js




