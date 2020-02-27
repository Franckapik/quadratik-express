import {
  store
} from 'react-easy-state'

const commandeStore = store({
  display: 'livraison',
  admindisplay: 'panier',
  status: '20vw',
  livraison: 'domicile',
  reload: true,
  cotation: true,
  relais_selected: ""
})

export default store(commandeStore);
