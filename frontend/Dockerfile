FROM node:18-slim
ENV PRODUCTION_ADDRESS=PRODUCTION_ADDRESS
WORKDIR /frontapp
COPY package.json /frontapp/
RUN npm install --legacy-peer-deps next
COPY . /frontapp/
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

