FROM node:24-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

ENV NODE_ENV=development

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev"]
