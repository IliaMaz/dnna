#
# Development build stage
#

FROM node:lts-alpine3.19 AS development

ARG API_PATH
ARG MODULES

WORKDIR $API_PATH

COPY --chown=node:node ./api/package*.json ./

RUN npm ci && chown -R node:node $MODULES/

COPY --chown=node:node ./api/ .

RUN mkdir dist && chown -R node:node dist

ENV NODE_ENV=development

USER node

#
# Production build stage
#

FROM node:lts-alpine3.19 AS build

ARG API_PATH

WORKDIR $API_PATH

COPY --chown=node:node --from=development $API_PATH ./

ENV NODE_ENV=production

RUN npm run build

RUN npm prune --omit=dev

USER node

#
# Production dist stage 
#

FROM node:lts-alpine3.19 AS production

ARG API_PATH
ARG TIMEZONE
ARG MODULES

RUN apk add --no-cache tzdata

RUN cp /usr/share/zoneinfo/$TIMEZONE /etc/localtime

WORKDIR $API_PATH

ENV NODE_ENV=production

RUN npm i -g pm2 && npm cache clean --force

COPY --chown=node:node --from=build $API_PATH/$MODULES ./$MODULES
COPY --chown=node:node --from=build $API_PATH/dist ./dist

USER node

CMD [ "pm2-runtime", "--instances", "4", "dist/main.js" ]

