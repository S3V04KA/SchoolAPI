# dev
FROM node:20-alpine3.17
RUN apk add --no-cache tzdata
ENV TZ Asia/Yekaterinburg
ENV NODE_PATH /app/node_modules

WORKDIR /app

COPY ./*.json ./
COPY ./*.lock ./

RUN npm install -g npm && yarn install
#CMD npx prisma generate && npm run build &&  node ./dist/main.js
# CMD npx prisma generate && npm run build && npm run start:prod
CMD npx prisma generate && npm run start:dev