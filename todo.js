page d'erreur à fabriquer pour les fetch

améliorer la page 404 et faire la page 500 avec cet exemple : https://code-maze.com/react-net-core-error-handling/#creating500
heure et date de transaction ?


supprimer ts les logs coté cllient
et eviter d'envoyer des infos de db en guise de success au client . (mais plutot un res.send(202) ou equivalent)
Auth0 est-il configuré du coté serveur? Puurquoi autant d'infos sur le auth de react ? Doublon? Sécurité ? Je crois qu'il est possible d'utiliser l'api directement du coté serveur avec des liens sur express et des génération de token coté sevreur uniquement .
https://auth0.com/docs/quickstart/backend/nodejs/01-authorization
A revoir donc !
Revoir aussi la redirection selon l'environnement: localhost ou https.


Réduire l'ombre des diffuseurs sur le mur .
Retirer le zoom et placer le png en icone avec les images de bonnes taille.
Controler pourquoi certaines images ne sont pas affichées en -b ou -c. (quadrablack)

Voir le systeme de template pour les mails :
ajouter bouton dans l'admin qui permet d'envoyer les mails automatiquement avec les pièces jointes.
être prévenu d'une commande avec le mail de succes.
Améliorer la lisibilité des polices.
Pourquoi le rose sur la boutique?

Inscrire le prix de livraison dans la bd. (si choix point relais ou autre )
Refaire un recap avant le paiment pour afficher le prix de livraison.


Ajouter une image de bannière et ,
Envoyer nouvelle version du site.

Faire un npm run lint --fix sur tout le dossier

-------

ajouter des packs avec l'absorbeur.
absorbeurs de différentes couleurs.
proposer des modèles 1D diffuseur.
--

Enregistrement possible de la commande boxtal dans la base de donnée avec toutes les informations sur les colis, prix, etc ...
resoudre le pb de child a du table
faire un instagram ?
lien pour devenir partenaire sur la section contact

plus tard pour les var :
[12:19] <graingert> Franckapik: don't mix .then and await
[12:19] <Franckapik> yeah i know sorry.. i have to change var also... :/
[12:19] <graingert> Franckapik: use eslint airbnb autofix
[12:19] <Franckapik> graingert: for var and const ?
[12:19] <graingert> !airbnb @ Franckapik
[12:19] <ecmabot> Franckapik: We tend to support airbnb's javascript style guide - it can be found here: https://github.com/airbnb/javascript you can enforce it in eslint with `npx install-peerdeps --dev eslint-config-airbnb-base && echo '{"extends": "airbnb-base"}' > .eslintrc` see also !eslint
[12:20] <graingert> Franckapik: yes eslint will autofix your vars for const/let as appropriate
