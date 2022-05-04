FROM node:14 AS base

RUN mkdir -p /app
WORKDIR /app

FROM base as builder

ARG REACT_APP_API_URL
ARG REACT_APP_SENTRY_DSN
ARG REACT_APP_SITE_TITLE
ARG REACT_APP_GA_ID
ARG REACT_APP_FRONTEND_URL
ARG NODE_PATH=src/

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine as prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
