--version v4-

Refactoriser toutes les query selon tablequery

Affichage actualité selon un nom definis dans la db.

erreur avec "Tous nos produits"


  rss : fetch avant le render ? ou bien faire un update de props dans la fonction stateless?

  ajouter le flux rss : https://www.npmjs.com/package/rss-parser

  streaming actualité d'AF.

être prévenu d'une commande avec le mail de success.

améliorer visibilité des deux contacts.


-- version 5 ---

Résoudre le pb suivant : admin. La fonction admindata utilise les autres query mais sans sessid. Possible ?

Parametrer le webhook du paiement. => maj de la db.


Option avec un select possible a la commande pour les couleurs. Mofgication du prix en fonction.


Quadralab avec un lien vers la boutique

faire avec email template tous les autres mails.

Gestion de login pour les clients via les userid enregsitrés lors de la cmde.


ajouter skyline et diffuseur à peindre soi meme

Montrer bandeau reduction pour les packs.

refaire la section valeurs

montrer le systeme d'Accroche et montrer un vrai diffuseur

Regarder un force scroll si c'est interessant ou pas :/!?
https://projects.lukehaas.me/scrollify/#examples

Graphique de la composition de prix d'un produit.

Confirmation automatique de la commande.

Remettre la carte leaflet en choix de point relais pour le client

Internationalisation du site avec ajout de la locale en : tout un travail de récriture et chaque partie texte du site doit etre en json.
Travail lourd et peu indispensable pour le moment. A faire probablement plus tard.
pour react et un peu de clarté : https://react.i18next.com/latest/usetranslation-hook

in the link i sent with the useTranslations hook, `t` is the `_` equivalent
the `_` convention comes from GNU gettext


Remplacer le react easy state par du Contexte React ou un simple import/export webpack pour les fonctions ne necessitant pas d'actualisation.

resoudre le pb de child a du table
faire un instagram ?
lien pour devenir partenaire sur la section contact

Utiliser chokidar au lieu de nodemon ?
----------------------------------------


TRES BONNE PAGE sur les promises :
https://dzone.com/articles/common-promise-mistakes

Attention au path relative des images pour le router /:id

le bordereau du suivi est-il l'etiquette a imprimer et coller ? Oui.

nettoyer les console.log avec un regex : console\.log\(([^)]+)\);

l'api relais colis en javascript existe a partir d'une iframe au cas ou boxtal devient compliqué.

Ajouter un id auto implémenté : ALTER TABLE public.devis ADD COLUMN ID SERIAL PRIMARY KEY;


L'adresse redirect url est celle qui est appelée suite à la transaction quoi qu'il arrive.
Le webhook est un lien qui permet de recevoir le statut du paiement lorsqu'il change from mollie. Lorsque l'argent est arrivé, un statut est envoyé et permet d'engager ensuite la livraison, les mails , etc ...
