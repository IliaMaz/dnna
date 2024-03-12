FROM nginx:1.24 as development

ARG API_PORT

COPY server/templates/default.dev.conf /etc/nginx/nginx.conf

RUN sed -i "s/server api:\$PORT;/server api:$API_PORT;/" /etc/nginx/nginx.conf

FROM nginx:1.24 as production

ARG API_PORT

RUN sed -i "s/server api:\$PORT;/server api:$API_PORT;/" /etc/nginx/nginx.conf

COPY server/templates/default.prd.conf /etc/nginx/nginx.conf
