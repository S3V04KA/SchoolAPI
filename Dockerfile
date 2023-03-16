# dev
FROM node:18-alpine
RUN apk add --no-cache tzdata
ENV TZ Asia/Yekaterinburg
ENV NODE_PATH /app/node_modules

WORKDIR /app

COPY ./*.json ./
COPY ./*.lock ./
COPY ./.env ./

RUN npm install -g npm && npm install && yarn install
#CMD npx prisma generate && npm run build &&  node ./dist/main.js
CMD npx prisma generate && npx prisma db push && npm run start:dev