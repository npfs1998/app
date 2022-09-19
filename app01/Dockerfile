FROM node:15 as angular
WORKDIR /app
COPY package.json /app
RUN npm install --silent
COPY . .
RUN npm run build --prod

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=angular app/dist/neo-teste /usr/share/nginx/html
COPY ./config/nginx.conf /etc/ngix/conf.d/default.conf