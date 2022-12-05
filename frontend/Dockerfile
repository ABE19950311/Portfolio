FROM node:18-slim
WORKDIR /frontapp
COPY package.json /frontapp/
RUN npm install --legacy-peer-deps next
COPY frontend /frontapp/
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]

