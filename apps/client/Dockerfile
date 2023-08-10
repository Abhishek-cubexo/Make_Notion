

FROM node:lts-alpine

WORKDIR /app

COPY ./dist/apps/client . 
 
COPY package*.json ./

RUN npm install

COPY package.json package-lock.json ./

ENV PORT=3000

EXPOSE ${PORT}

RUN npm install 

CMD ["npm", "run", "dev"]















# npx nx docker-build server