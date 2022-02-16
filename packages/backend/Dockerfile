FROM node:16-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run transpile

FROM node:16-alpine

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist/ ./dist/

RUN npm ci --only=production

CMD ["npm", "run", "serve"]

EXPOSE 3000