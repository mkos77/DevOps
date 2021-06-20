FROM node:alpine as mybuild

WORKDIR /opt/myapp

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM nginx

COPY --from=mybuild /opt/myapp/build /usr/share/nginx/html