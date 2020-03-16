import React from "react";
import DropIn from "braintree-web-drop-in-react";
import commandeStore from '../Store/commandeStore';
import Success from './Success';
import client from '../Store/client';



class Braintree extends React.Component {
  instance;
  state = {
    clientToken: null,
    transactionid: null
  };

  componentDidMount() {
    // Get a client token for authorization from your server
    client.getTokenFetch()
    .then(data => {
      this.setState({clientToken: data})
    });

  }

  buy = () => {
    this.instance.requestPaymentMethod()
    .then(
      ({nonce}) => client.nonceFetch(nonce)
      .then(res => {

          if (res.success) {
            commandeStore.display = 'success';
            commandeStore.status = '100vw';
          } else {
            window.location = '/500';
          }

    })
  );
};

  render() {
    return (<> {
      this.state.success
        ? <Success ></Success>
        : <div>{
              this.state.clientToken
                ? <div>
                    <DropIn options={{
                        authorization: this.state.clientToken,
                        locale: 'fr_FR,'
                      }} onInstance={instance => (this.instance = instance)}/>
                    <button className="button_light" onClick={this.buy.bind(this)}>Régler la commande</button>
                  </div>
                : 'Chargement...'
            }</div>
    }</>)
  }
}

export default Braintree;
