FROM node:14 AS react-build

COPY package.json package-lock.json /usr/src/app/
WORKDIR /usr/src/app
RUN npm install


COPY . /usr/src/app/
RUN npm run build:staging

#// df 3rd tutorial
FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --from=react-build /usr/src/app/build/ /usr/share/nginx/html
COPY --from=react-build /usr/src/app/env.template.js /usr/share/nginx/html/env.template.js

EXPOSE 4200 80

# ENTRYPOINT ["nginx", "-g", "daemon off;"]
# Inject ENVs when running server and start nginx
# I gave up looking for env.template.js
ENTRYPOINT ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js && exec nginx -g 'daemon off;'"]
