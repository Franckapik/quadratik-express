import * as moment from 'moment';


const devisSchema = {
  uiSchema : {
    "listeProduits" : {
      "items" : {
        "ui:field": "prod"
      }
    },
    parametres : {
      autres : {
        reduction : {
          classNames: "display_title"
        },
        acompte : {
          classNames: "display_title"
        }
      }
    }

  },

  schema : {
    title: "Devis Client",
    type: "object",
    required: [
      "listeProduits"
    ],
    properties: {
      Numero: {
        "type": "number",
        "title": "Numéro Devis",
        "default": Math.floor(Math.random() * (15000 - 1000) + 1000)
      },

      coordonnées : {
        title : "",
        type: "object",
        properties: {
          entreprise: {
            title: "Coordonnées Entreprise",
            type: "object",
            properties: {
              Nom_entreprise: {
                type: "string",
                title: "Nom de l'entreprise"
              },
              Siret: {
                type: "string",
                title: "N° SIRET"
              },
              Adresse: {
                type: "string",
                title: "Adresse"
              },
              Code_postal: {
                type: "string",
                title: "Code Postal"
              },
              Ville: {
                type: "string",
                title: "Ville"
              },
              Pays: {
                type: "string",
                title: "Pays"
              },
              Mail: {
                type: "string",
                title: "Mail"
              },
              Telephone: {
                type: "string",
                title: "Telephone",
                minLength: 10
              }
            }
          },
          client: {
            title: "Coordonnées Client",
            type: "object",
            properties: {
              lastName: {
                type: "string",
                title: "Nom"
              },
              firstName: {
                type: "string",
                title: "Prenom"
              },
              adresse: {
                type: "string",
                title: "Adresse"
              },
              codepostal: {
                type: "string",
                title: "Code Postal"
              },
              ville: {
                type: "string",
                title: "Ville"
              },
              pays: {
                type: "string",
                title: "Pays"
              },
              email: {
                type: "string",
                title: "Mail"
              },
              telephone: {
                type: "string",
                title: "Telephone",
                minLength: 10
              }
            }
          }
        }
      },

      listeProduits: {
        type: "array",
        title: "Liste de Produits",
        items: {
          type: "object",
          title: "Produit"
        }
      },

      parametres : {
        type: "object",
        title: "",
        properties: {
          banque: {
            title: "Coordonnées Bancaires",
            type: "object",
            properties: {
              titulaire: {
                type: "string",
                title: "Titulaire du compte"
              },
              iban: {
                type: "string",
                title: "IBAN"
              },
              bic: {
                type: "string",
                title: "BIC/SWIFT"
              }
            }
          },
          autres: {
            title:"",
            type: "object",
            properties: {
              mode: {
                title: "Moyen de Paiement",
                type: "string",
                enum: ["Virement", "Carte bancaire", "Cheque"]
              },
              status: {
                title: "Statut du Devis",
                type: "string",
                default: "En attente de reglement"
              },
              acompte: {
                title: "Acompte (en %)",
                type: "number",
                default: 0
              },
              reduction: {
                type: "number",
                title: "Réduction (en euros)",
                default: 0
              },
              logo: {
                title: "Affichage du logo",
                type: "boolean",
                default: true
              },
              Date_devis: {
                "type": "string",
                "title": "Date du devis",
                "default": moment().format('MM/DD/YYYY')
              },
              Date_validite: {
                "type": "string",
                "title": "Date de fin validité",
                "default": moment().add(30, 'days').calendar()
              }
            }
          },

          livraison: {
            title: "Livraison",
            type: "object",
            properties: {
              mode: {
                title: "Mode de Livraison",
                type: "string",
                enum: ["Domicile", "Point Relais", "Autre adresse"]
              },
              service: {
                title: "Transporteur",
                type: "string",
                default: "Relais Colis"
              },
              estimation: {
                title: "Estimation du temps de livraison",
                type: "string",
                default: "3 semaines"
              }
            }
          }
        }
      }


    }
  }
}

export default devisSchema;
