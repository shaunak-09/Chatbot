FROM node:20

WORKDIR /usr/src/app

COPY ./package*.json ./
# COPY ./package-lock.json ./
RUN npm install --force

# FROM base as development

COPY . .

# RUN npm run build
# CMD ["npm","run","dev"]  

# FROM base as production

# COPY . .

# RUN npm prune --production

EXPOSE 5000

CMD ["npm","run","start"]