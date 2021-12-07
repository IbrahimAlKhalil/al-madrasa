FROM node:17-alpine AS Builder

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm
RUN cd ./api && pnpm install --no-optional --prefer-offline

RUN rm ./api/node_modules/@directus/app/dist/* -rf
RUN mv ./app/dist/* ./api/node_modules/@directus/app/dist/
RUN rm ./app -rf

RUN pnpm prune --prod --no-optional
RUN pnpm store prune

FROM node:17-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /usr/src/app

COPY --from=Builder /usr/src/app .

CMD ["node", "./am.mjs", "prod"]

EXPOSE 7000
