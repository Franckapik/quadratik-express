/**
 * Initialize Mollie Components instance
 */
const mollie = Mollie(
  "pfl_HgMrHhRAFm", // You can find your Profile ID in the Dashboard (https://www.mollie.com/dashboard/developers/api-keys)
  {
    locale: "en_US", // Optional. If not provided, we will determine the users' language by looking at the document and/or userAgent.
    testmode: false // Set to true to enable test mode.
  }
);

var cardHolder = mollie.createComponent('cardHolder');
cardHolder.mount('#card-holder');

var cardNumber = mollie.createComponent('cardNumber');
cardNumber.mount('#card-number');

var expiryDate = mollie.createComponent('expiryDate');
expiryDate.mount('#expiry-date');

var verificationCode = mollie.createComponent('verificationCode');
verificationCode.mount('#verification-code');
