import {
  store
} from 'react-easy-state'

const commandeStore = store({
  display: 'livraison',
  status: '20vw',
  livraison: 'domicile',
  reload: true
})

export default store(commandeStore);
