FROM node:latest

EXPOSE 3333

WORKDIR /var/www/

ENTRYPOINT npm run dev
COPY package*.json /var/www/
COPY .env /var/www/
COPY ormconfig.js /var/www/
COPY tsconfig.json /var/www/
RUN npm install
RUN npm install pg pg-hstore