Ce projet a été construit avec Create React App (frontend) et Express (backend) .

## Quadratik express

Démarrage de l'application :

### Express

`PORT=3005 npm start`

Framework minimaliste pour Node.js

`npm install express --save`

Lancement du fichier app.js.

Developpement : [http://localhost:3005](http://localhost:3005)

Production : 3005 [http://localhost:3005](http://localhost:3005)

### React

`npm start`

En developpement, l'application s'execute sur le port 3000.

`npm run build`

Les fichiers compilés et minifiés grace à Webpack (CRA) sont placés dans le dossier build pour le transfert vers le serveur de production.

### NPM

`npm update --save`

Scripts supplémentaires :

`npm run [...]`

```    
    "start": "node ./bin/www", 
    "zipit": "tar -zcvf quadra.tar.gz -X exclude_list.txt .",
    "lint": "node --max_old_space_size=4096 ./node_modules/eslint/bin/eslint.js .",
    "ssl": "python -m sslyze --regular www.quadratik.fr",
    "snyk-protect": "snyk protect",
    "prepare": "npm run snyk-protect",
    "test": "snyk test"
```

Mise à jour des packages installés via le gestionnaire de packets officiel de Node.js.

### Create React App

`npm init react-app quadratik-express`

Permets la création d'une API React avec une configuration basique utilisant Webpack (compilation) et Babel (convertion Ecmascript 6 vers ES5 pour la ocmpatibilité des navigateurs).

### ESlint
`npm install eslint --save-dev`

Javascript linter utilisé en local avec le fichier de configuration JSON eslintrc.js (eslint --init)

CLI : `eslint file.js` `eslint dir/`

### Winston Logger

`const winston = require('winston')`

Deux fichiers de log sont créés : combined.log (ensemble des logs) et error.log (erreurs seulement).

Configuration selon les deux environnements sur log/logger.js.

##PM2

`pm2 start ecosystem.config.js`

Gestionnaire d'application (process manager) écrit entièrement en Node.js.
Fichier de configuration permettant de gerer plusieurs applications ainsi que les variables d'environnement.

## Snyk

`snyk wizard`

Complémentaire de `npm audit`
Permets la detection open source des vulnérabilités des packages installés en scannant les fichiers package.json (express et react). Intégration dans Github.
Rapporte les vulnérabilités selon 3 niveaux.

Le fichier snyk policy .snyk permets d'enregistrer les diférentes règles (upgrade,patch or ignore) validées pour chaques dépendances.

## Github

`git init`

Hebergement web de l'api en lien avec le gestionnaire de version Git linux.

```git add *
git commit -m "up"
git push origin master
```

Le fichier .gitignore exclut les fichiers/dossiers.

#PostgresQL

Moteur de base de donnée relationelle open source.
