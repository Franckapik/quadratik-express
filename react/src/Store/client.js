const getOptions = {
  credentials: 'include',
  method: 'GET',
  mode: "cors" // no-cors, cors, *same-origin
};

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}



function json(response) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else if (contentType && contentType.indexOf('text/html') && contentType.indexOf('application/rss+xml') !== -1) {
    return response.text();
  }
  else {
    return response // non json data
  }
}

function getData(url, getOptions){
  return fetch(url, getOptions)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      return data
    }).catch(function(error) {
      console.log(error);
    //  window.location ='/500' ;
      return error
    });
}

function postData(url, body){
  return fetch(url, {
    credentials: 'include',
    method: 'post',
    body: JSON.stringify(body),
    headers: new Headers({'Content-Type': 'application/json'})
  })
  .then(response => {

    return response
  });
}


const client = {
  shopFetch: () => getData('/getFromDB/shopDB'),
  newsFetch: (index) => getData('/getFromDB/newsDB?index=' + index),
  adminFetch: () => getData('/getFromDB/adminData'),
  userFetch: () => getData('/getFromDB/user'),
  infoFetch: () => getData('/getFromDB/info'),
  cartFetch: (cartid) => getData('/getFromDB/getDBCart?cartid='+cartid),
  commandeFetch: (id) => getData('/getFromDB/commande?orderid=' +id),
  adminUserFetch: (id) => getData('/getFromDB/adminUser?sessid='+id),
  cotationFetch: (param) => getData('/boxtal/cotation?transporteur=' + param.transporteur + '&poids=' + param.poids + '&longueur=' + param.longueur + '&largeur=' + param.largeur + '&hauteur=' + param.hauteur + '&code_postal=' + param.code_postal + '&ville=' + param.ville + '&adresse=' + param.adresse),
  livraisonPost: (body) => postData('/saveInDB/livraison', body),
  enregistrementPost: (body) => postData('/saveInDB/enregistrement', body),
  devisPost: (body) => postData('/saveInDB/devis', body),
  devisFetch: (id) => getData('/getFromDB/devis?sessid='+id),
  createEtiquetteFetch: (id) => getData('/boxtal/etiquette?sessid=' + id),
  dataSheetFetch: (src, locale) => getData('/createPDF/dataSheet?productsrc='+src+'&locale='+locale),
  devisPdfFetch: (id, type) => getData('/createPDF/devis?sessid='+id+'&type='+type),
  getSuiviFetch: (ref) => getData('/boxtal/suiviColis?ref=' + ref),
  getReferenceFetch:(id) => getData('/boxtal/getRefFromId?sessid=' + id),
  getProductsFetch:() => getData('/getFromDB/getProduits'),
  getProductFetch:(src) => getData('/getFromDB/getProduitFromSrc?productsrc=' + src),
  createFactureFetch: (id) => getData('/createPDF/createFacture?sessid=' + id),
  getFactureFetch: (id) => getData('/createPDF/getFacture?sessid=' + id),
  loginPost: (body) => postData('/auth/login', body),
  adminCartFetch: (id) => getData('/getFromDB/adminCart?sessid=' + id),
  adminLivraisonFetch: (id) => getData('/getFromDB/adminLivraison?sessid=' + id),
  adminPaiementFetch: (id)  => getData('/getFromDB/adminPaiement?sessid=' + id),
  checkTokenFetch: (adminToken) => getData('auth/checkToken?admin_token='+adminToken),
  getTokenFetch: () => getData('/paiement/client_token'),
  relaisFetch: (code)=> getData('/boxtal/relais?pickup_code=' + code),
  mailPost : (body) => postData('/sendMail/mailcontact', body),
  newsletterPost : (body) => postData('/sendMail/newsletter', body),
  questionnairePost : (body) => postData('/sendMail/questionnaire', body),
  saveCartPost : (panier) => postData('/saveInDB/saveCartOnDB', panier),
  reductionfetch: (code)=> getData('getFromDB/getreduction?code=' + code),
  resetCartPost : () => getData('/saveInDB/resetsession'),
  createPayment : (token) => getData('/paiement/create?token=' + token),
  virement : (token) => getData('/paiement/virement'),
  sendMailStatus : (id, envoi, type) => getData('/sendMail/commandeStatus?sessid=' + id + '&envoi=' + envoi + '&type=' + type),
  getRss : () => getData('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffr.audiofanzine.com%2Fnews%2Fa.rss.xml', { credentials: 'omit', method: 'GET', mode: "cors" })
}

export default client;
