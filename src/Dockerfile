FROM node:20-alpine
WORKDIR /llvm-flow-frontend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
