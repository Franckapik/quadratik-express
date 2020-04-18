import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import Home from './Home/Home'
import Shop from './Shop/Shop'
import Header from './Header'
import Guide from './Guide';
import Quadralab from './Quadralab/Quadralab';
import Commande from './Commande/Commande';
import MiniPanier from './Shop/MiniPanier';
import PanelInfo from './Home/PanelInfo';
import Burger from './Burger';
import ReactGA from 'react-ga';
import Admin from './Admin/Admin';
import NotFoundPage from './404';
import Login from './Admin/Login';
import withAuth from './Admin/withAuth';
import InternalServerError from './500';
import SuiviSimple from './Admin/SuiviSimple';
import ProduitDetails from './Shop/ProduitDetails';
import DevisDisplay from './Admin/DevisDisplay';
import FactureDisplay from './Admin/FactureDisplay';
import Success from './Commande/Success';
import Panier from './Shop/Panier';
import Etiquette from './Admin/Etiquette';
import DevisCreate from './Admin/DevisCreate';
import Mail from './Admin/Mail';
import history from './History';

export default function MainRouter() {
  return (<Router history={history}>
    <div className="app_container">
      {ReactGA.initialize('UA-112792874-1')}
      {ReactGA.pageview(window.location.pathname + window.location.search)}
      <Header></Header>
      <Burger></Burger>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/shop" component={Shop}/>
        <Route path="/guide" component={Guide}/>
        <Route path="/quadralab" component={Quadralab}/>
        <Route path="/commande" component={Commande}/>
        <Route path="/panier" component={Panier}/>
        <Route path="/admin" component={withAuth(Admin)}/>
        <Route path="/login" component={Login}/>
        <Route path="/404" component={NotFoundPage}/>
        <Route path="/500" component={InternalServerError}/>
        <Route path="/suivi/:userid" component={SuiviSimple}/>
        <Route path="/mail/:userid" component={Mail}/>
        <Route path="/deviscreate/:userid" component={DevisCreate}/>
        <Route path="/devis/:userid" component={DevisDisplay}/>
        <Route path="/facture/:userid" component={FactureDisplay}/>
        <Route path="/etiquette/:userid" component={Etiquette}/>
        <Route path="/order/:orderid" component={Success}/>
        <Route path="/produit:productsrc" component={ProduitDetails}/>
        <Route component={NotFoundPage}/>
      </Switch>
      <MiniPanier></MiniPanier>
      <PanelInfo></PanelInfo>
    </div>
  </Router>)
}
