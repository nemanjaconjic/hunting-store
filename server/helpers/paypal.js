const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

module.exports = paypal;

//'Ab_NUcQqY_HXs84YQ1-IHJjaLH5FCM6DguxusAx1vRr4CBAphuCEQCpjhN_k71UPceTB2Fp2XvuXXFmP'
//"EEuiP0s4AQj6j3VTiy_SqYFYjGysA8JDAcprq2se5g9LHEs8jBqDjbcqt-FV813mMhLB9Tkg_Qh9k2q_"