FROM node:16.15

WORKDIR /usr/src/drivent

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]

#Após rodar o docker build, rodar o image da seguinte forma "docker run -p 3000:3000 N°do image gerado". No caso do 3000:3000 são as portas do host e a porta do container, a porta do host pode trocar.


