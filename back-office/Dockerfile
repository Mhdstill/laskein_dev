# Étape de construction
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Étape de production
FROM node:16-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=build /app/.next ./.next

# EXPOSE 4202

CMD ["yarn", "start"]

