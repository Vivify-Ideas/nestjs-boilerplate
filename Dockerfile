FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV development
COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 3000
CMD [ "yarn", "run", "start:dev" ]

