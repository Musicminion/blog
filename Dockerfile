FROM node:20.11.0 as build

WORKDIR /app

COPY . .

RUN npm install && npm run build

FROM nginx:1.19.4-alpine

COPY --from=build /app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
