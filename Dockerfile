#----------------------------------------------------------------
#build from source
#----------------------------------------------------------------
FROM node:18 AS build

WORKDIR /app

COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

#----------------------------------------------------------------
#run with nginx
#----------------------------------------------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/zerti /usr/share/nginx/html

EXPOSE 80
