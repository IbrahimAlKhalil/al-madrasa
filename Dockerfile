FROM node:17-alpine AS Builder

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm

# Install dependencies
RUN cd ./api && pnpm install --no-optional --prefer-offline

# Strip out dev-dependenceis
RUN cd ./api && pnpm prune --prod --no-optional

# Install pg
RUN cd ./api && pnpm add pg --save-prod

RUN rm ./api/node_modules/@directus/app/dist/* -rf
RUN mv ./app/dist/* ./api/node_modules/@directus/app/dist/
RUN mv ./scripts/prod.js ./api/
RUN mv ./scripts/ ./database/ ./api/

FROM node:17-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /usr/src/app

COPY --from=Builder /usr/src/app/api .

RUN cd ./node_modules/@directus/app/dist && ls

CMD ["node", "./prod.js"]

EXPOSE 7000
