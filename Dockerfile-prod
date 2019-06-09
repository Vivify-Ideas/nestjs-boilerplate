FROM node:lts-alpine

WORKDIR /app

ENV NODE_ENV production
COPY package.json yarn.lock ./
RUN set -x && yarn

COPY . .
RUN set -x && yarn run prestart:prod

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
