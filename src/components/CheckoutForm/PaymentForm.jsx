import React from "react";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  shippingData,
  backStep,
  onCaptureCheckout,
  nextStep,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.prevent.default();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOptions },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };

      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
  };

  return (
    <>
      <div>
        <Review checkoutToken={checkoutToken} />
      </div>
      <div>
        <h6>Payment Method</h6>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form
                className="w-full p-20"
                onSubmit={(e) => handleSubmit(e, elements, stripe)}
              >
                <CardElement />
                <br /> <br />
                <div className="inline-flex align-middle w-full justify-between pt-10">
                  <button
                    className="text-xs rounded-full bg-red-500 text-white font-bold py-1 px-3 block focus:outline-none"
                    onClick={backStep}
                  >
                    Back
                  </button>
                  <button
                    className="text-xs rounded-full bg-blue-500 text-white font-bold py-1 px-3 block focus:outline-none"
                    type="submit"
                    disabled={!stripe}
                  >
                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  );
};

export default PaymentForm;
