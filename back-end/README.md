## Configuration du projet

1. Copier le fichier **env.exemple** et renomer le copie du fichier **env.exemple** en **.env** .
2. Changer la valeur de la variable **DATABASE_URL** dans le fichier **.env** vers l'url de votre base de donnée MongoDB.

- `DATABASE_URL="mongodb://<Utilisateur>:<Mot de passe>@<Url Serveur>:<Port>/<Base de donnée>" `

> Section **Optionnel**. 3. **_(OPTIONNEL)_** Si vous préfere utiliser BDD Atlas, la variable **DATABASE_URL** dans le fichier **.env** reste la valeur par defaut. Executer la commande suivante.

---

## Synchronisation du schéma Prisma avec la base de donnée MongoDB

> **NB**.
> Les commandes ci-dessous doit être exécutées.

```bash
yarn install

npx prisma generate

npx prisma db push

npx prisma db seed

```

---

## Demarrer le projet avec npm

```bash
yarn run start:dev
```

Ouvrir [http://localhost:5005/api](http://localhost:5005/api) avec votre navigateur pour voir le résultat.
