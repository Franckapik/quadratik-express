import React from 'react'
import {Redirect, Router, Route, Switch} from 'react-router-dom'
import Home from './Home/Home'
import Shop from './Shop/Shop'
import Header from './Header'
import PanelDetails from './Shop/PanelDetails';
import Guide from './Guide';
import Quadralab from './Quadralab/Quadralab';
import Commande from './Commande/Commande';
import CartWidget from './Shop/CartWidget';
import PanelInfo from './Home/PanelInfo';
import Burger from './Burger';
import ReactGA from 'react-ga';
import Admin from './Admin/Admin';
import NotFoundPage from './404';
import Login from './Admin/Login';
import withAuth from './Admin/withAuth';
import InternalServerError from './500';
import ClientDashboard from './Admin/ClientDashboard';

import history from './History';



export default function MainRouter() {
  return (<Router history={history} >
    <div className="app_container">
      {ReactGA.initialize('UA-112792874-1')}
      {ReactGA.pageview(window.location.pathname + window.location.search)}
      <Header></Header>
      <Burger></Burger>
      <Switch><Route exact path="/" component={Home}/>
      <Route path="/shop" component={Shop}/>
      <Route path="/guide" component={Guide}/>
      <Route path="/quadralab" component={Quadralab}/>
      <Route path="/commande" component={Commande}/>
      <Route path="/admin" component={withAuth(Admin)} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={withAuth(ClientDashboard)} />
      <Route path="/404" component={NotFoundPage} />
      <Route path="/500" component={InternalServerError} />
      <Route component={NotFoundPage} /></Switch>
      <PanelDetails/>
      <CartWidget></CartWidget>
      <PanelInfo></PanelInfo>

    </div>
  </Router>)
}
