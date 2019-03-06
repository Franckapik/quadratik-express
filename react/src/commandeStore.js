import {
  store
} from 'react-easy-state'

const commandeStore = store({
  display: 'enregistrement',
  status: '20vw',
  livraison: 'domicile',
  facture: null,
  reload: true
})

export default store(commandeStore);
