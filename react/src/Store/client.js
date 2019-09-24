const getOptions = {
  credentials: 'include',
  method: 'GET',
  mode: "cors" // no-cors, cors, *same-origin
};

function status(response) {
  console.log('reponse', response);
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
  } else {
    return response // non json data
  }
}

function getData(url){
  return fetch(url, getOptions)
    .then(status)
    .then(json)
    .then(function(data) {
      console.log('Request succeeded with JSON response', data);
      return data
    }).catch(function(error) {
      console.log('Request failed', error);
      window.location ='/500' ;
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
  adminFetch: () => getData('/getFromDB/adminData'),
  userFetch: () => getData('/getFromDB/user'),
  commandeFetch: () => getData('/getFromDB/commande'),
  adminUserFetch: (id) => getData('/getFromDB/adminUser?sessid='+id),
  cotationFetch: (param) => getData('/boxtal/cotation?transporteur=' + param.transporteur + '&poids=' + param.poids + '&longueur=' + param.longueur + '&largeur=' + param.largeur + '&hauteur=' + param.hauteur + '&code_postal=' + param.code_postal + '&ville=' + param.ville + '&adresse=' + param.adresse),
  livraisonPost: (body) => postData('/saveInDB/livraison', body),
  enregistrementPost: (body) => postData('/saveInDB/enregistrement', body),
  createEtiquetteFetch: (id) => getData('/boxtal/etiquette?sessid=' + id),
  createFactureFetch: (id) => getData('/facture/createFacture?sessid=' + id),
  getFactureFetch: (id) => getData('/facture/getFacture?sessid=' + id), //a resoudre
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
  cartsessionPost : (body) => postData('/saveInDB/savesessioncart', body),
  cartsessionFetch: () => getData('/getFromDB/getsessioncart'),
  saveCartPost : (body) => postData('/saveInDB/saveCartOnDB', body),
  reductionfetch: (code)=> getData('getFromDB/getreduction?code=' + code),
  resetCartPost : () => postData('/saveInDB/resetcart'),
  nonceFetch : (nonce) => getData(`/paiement/nonce/${nonce}`),




}

export default client;
