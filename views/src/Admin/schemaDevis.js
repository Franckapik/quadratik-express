const schema = {
  "title": "Devis/Facturation Client",
  "description": "Création sous format PDF",
  "type": "object",
  "properties": {

    "Date_validite": {
      "type": "string",
      "title": "Date de validité",
    },

    "entreprise": {
      "title": "Coordonnées Entreprise",
      "type": "object",
      "properties": {
        "Nom_entreprise": {
          "type": "string",
          "title": "Nom de l'entreprise",
        },

        "Siret": {
          "type": "string",
          "title": "N° SIRET",
        },
        "Adresse": {
          "type": "string",
          "title": "Adresse",
        },
        "Code_postal": {
          "type": "string",
          "title": "Code Postal",
        },
        "Ville": {
          "type": "string",
          "title": "Ville",
        },
        "Pays": {
          "type": "string",
          "title": "Pays",
        },
        "Mail": {
          "type": "string",
          "title": "Mail",
        },
        "Telephone": {
          "type": "string",
          "title": "Telephone",
          "minLength": 10
        }

      }
    },

    "client": {
      "title": "Coordonnées Client",
      "type": "object",
      "properties": {
        "Nom_client": {
          "type": "string",
          "title": "Nom",
        },
        "Prenom_client": {
          "type": "string",
          "title": "Prenom",
        },

        "Adresse": {
          "type": "string",
          "title": "Adresse",
        },
        "Code_postal": {
          "type": "string",
          "title": "Code Postal",
        },
        "Ville": {
          "type": "string",
          "title": "Ville",
        },
        "Pays": {
          "type": "string",
          "title": "Pays",
        },
        "Mail": {
          "type": "string",
          "title": "Mail",
        },
        "Telephone": {
          "type": "string",
          "title": "Telephone",
          "minLength": 10
        }

      }
    },


    "produits": {
      "type": "array",
      "title": "Liste de Produits",
      "items": {
        "type": "array",
        "title": "Produit",
        "items": [{
            "title": "Nom",
            "type": "string",
            "enum": ["one", "two", "three"],
          },
          {
            "title": "Quantité",
            "type": "number",
            "default": 42
          }
        ]
      }
    },


    "banque": {
      "title": "Coordonnées Bancaires",
      "type": "object",
      "properties": {
        "bio": {
          "type": "string",
          "title": "Bio"
        },
      }
    },

    "livraison": {
      "title": "Livraison",
      "type": "object",
      "properties": {

      }
    }
  }
};






module.exports = {
  schema,
  uiSchema
};
