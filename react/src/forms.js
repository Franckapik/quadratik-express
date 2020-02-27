import * as moment from 'moment';

const enregistrementSchema = {
  uiSchema : {
  },
  formData : {
  },

  schema : {
    title: "Enregistrement",
    type: "object",
    properties: {
      lastName: {
        "type": "string",
        "title": "Nom"
      },
      firstName: {
        "type": "string",
        "title": "Prenom"
      },
      adresse: {
        type: "string",
        title: "Adresse"
      },
      ville: {
        type: "string",
        title: "Ville"
      },
      codepostal: {
        type: "string",
        title: "Code Postal"
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

const livraisonDomicileSchema = {
  uiSchema : {
  },

  schema : {
    title: "Livraison",
    type: "object",
    properties: {
      firstName: {
        "type": "string",
        "title": "Nom"
      },
      adresse: {
        type: "string",
        title: "Adresse"
      },
      ville: {
        type: "string",
        title: "Ville"
      },
      codepostal: {
        type: "string",
        title: "Code Postal"
      },
      pays: {
        type: "string",
        title: "Pays"
      }
    }
  }
}

const rechercheRelaisSchema = {
  uiSchema : {
  },
  schema : {
    title: "Recherche Relais",
    type: "object",
    properties: {
      poids: {
        "type": "number",
        "title": "Poids"
      },
      longueur: {
        "type": "number",
        "title": "Longueur"
      },
      largeur: {
        "type": "number",
        "title": "Largeur"
      },
      hauteur: {
        "type": "number",
        "title": "Hauteur"
      },
      adresse: {
        type: "string",
        title: "Adresse"
      },
      ville: {
        type: "string",
        title: "Ville"
      },
      code_postal: {
        type: "number",
        title: "Code Postal"
      },

      transporteur: {
        type: "string",
        title: "Transporteur",
        enum: ["SOGP", "MONR", "UPSE","CHRP","POFR"]
      }
    }
  }
}

const rechercheRelaisSchemaClient= {
  uiSchema : {
  },
  schema : {
    title: "Recherche Relais",
    type: "object",
    properties: {
      adresse: {
        type: "string",
        title: "Adresse"
      },
      ville: {
        type: "string",
        title: "Ville"
      },
      code_postal: {
        type: "number",
        title: "Code Postal"
      }
    }
  }
}


export default enregistrementSchema;
export {livraisonDomicileSchema};
export {rechercheRelaisSchema};
export {rechercheRelaisSchemaClient};
