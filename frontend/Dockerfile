FROM node:18-slim
WORKDIR /frontapp
COPY . /frontapp/
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
#CMD ["npm", "run", "dev"]

