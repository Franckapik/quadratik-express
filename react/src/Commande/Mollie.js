import React from "react";
import DropIn from "braintree-web-drop-in-react";
import commandeStore from '../Store/commandeStore';
import Success from './Success';
import client from '../Store/client';
import Mollie from './mollie'


class MollieComp extends React.Component {

  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.formData = {
    };

    this.mollie = Mollie(
          "pfl_q4BKtpjb5P", // You can find your Profile ID in the Dashboard (https://www.mollie.com/dashboard/developers/api-keys)
          {
            locale: "fr_FR", // Optional. If not provided, we will determine the users' language by looking at the document and/or userAgent.
            testmode: true // Set to true to enable test mode.
          }
        );
  }

  componentDidMount() {

    const cardHolder = this.mollie.createComponent("cardHolder");
    cardHolder.mount("#card-holder");

    const cardHolderError = document.getElementById("card-holder-error");

    cardHolder.addEventListener("change", event => {
      if (event.error && event.touched) {
        cardHolderError.textContent = event.error;
      } else {
        cardHolderError.textContent = "";
      }
    });

    const cardNumber = this.mollie.createComponent("cardNumber");
    cardNumber.mount("#card-number");

    const cardNumberError = document.getElementById("card-number-error");

    cardNumber.addEventListener("change", event => {
      if (event.error && event.touched) {
        cardNumberError.textContent = event.error;
      } else {
        cardNumberError.textContent = "";
      }
    });

    const expiryDate = this.mollie.createComponent("expiryDate");
    expiryDate.mount("#expiry-date");

    const expiryDateError = document.getElementById("expiry-date-error");

    expiryDate.addEventListener("change", event => {
      if (event.error && event.touched) {
        expiryDateError.textContent = event.error;
      } else {
        expiryDateError.textContent = "";
      }
    });

    const verificationCode = this.mollie.createComponent("verificationCode");
    verificationCode.mount("#verification-code");

    const verificationCodeError = document.getElementById("verification-code-error");

    verificationCode.addEventListener("change", event => {
      if (event.error && event.touched) {
        verificationCodeError.textContent = event.error;
      } else {
        verificationCodeError.textContent = "";
      }
    });

  }

  submit(e) {
   this.mollie.createToken()
    .then(
      (result) => {
        if (result.token) {
          client.createPayment(result.token)
          .then(res => {
              if (res.payment.status === 'open') {
                window.location = res.redirect;
              } else {
                window.location = '/500';
              }
        });
        } else {
          console.log(result.error);
        }
      }
  );
  }

  render() {
    return (
      <form>
        Titulaire de la carte
  <div id="card-holder"></div>
  <div id="card-holder-error"></div>
Numéro de carte
  <div id="card-number"></div>
  <div id="card-number-error"></div>
Date d'expiration
  <div id="expiry-date"></div>
  <div id="expiry-date-error"></div>
Code de vérification
  <div id="verification-code"></div>
  <div id="verification-code-error"></div>

  <button type="button" onClick ={this.submit}>Régler la commande</button>
</form>
  )
  }
}

export default MollieComp;
