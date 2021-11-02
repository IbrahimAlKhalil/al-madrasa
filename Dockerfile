FROM node:17-alpine AS Builder

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm

# Install dependencies
RUN cd ./api && pnpm install --prefer-offline

# Strip out dev-dependenceis
RUN cd ./api && pnpm prune --prod --no-optional

RUN rm ./api/node_modules/@directus/app/dist/* -rf
RUN mv ./app/dist/* ./api/node_modules/@directus/app/dist/

FROM node:17-alpine

WORKDIR /usr/src/app

COPY --from=Builder /usr/src/app/api .

RUN cd ./node_modules/@directus/app/dist && ls

CMD ["node", "./cli.js", "start"]

EXPOSE 7000
