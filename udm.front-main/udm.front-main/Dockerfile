FROM node:16.20.2 as build

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /var/www
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
