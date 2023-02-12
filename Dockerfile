FROM node:18-alpine AS builder
COPY . .
WORKDIR /server
RUN npm i
WORKDIR /client
RUN npm i

FROM nginx:latest as ngi
COPY --from=builder /client/dist/ /usr/share/nginx/html
COPY --from=builder /nginx.conf  /etc/nginx/conf.d/default.conf
