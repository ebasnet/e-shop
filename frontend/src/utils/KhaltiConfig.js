import KhaltiCheckout from "khalti-checkout-web";

const config = {
  publicKey: "test_public_key_xxxxx", // replace with yours
  productIdentity: "1234567890",
  productName: "eShop Order",
  productUrl: "http://localhost:3000/",
  eventHandler: {
    onSuccess(payload) {
      console.log("Payment successful:", payload);
      // Set isPaid true after success
    },
    onError(error) {
      console.log("Payment failed:", error);
    },
    onClose() {
      console.log("Widget closed");
    },
  },
  paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING"],
};

export const checkout = new KhaltiCheckout(config);
