FROM node:18-slim
ARG NEXT_PUBLIC_PRODUCTION_ADDRESS
WORKDIR /frontapp
COPY package.json /frontapp/
COPY yarn.lock /frontapp/
RUN yarn install --legacy-peer-deps next
COPY . /frontapp/
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]

