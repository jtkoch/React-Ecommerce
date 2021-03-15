import React, { useState, useEffect } from "react";
import Stepper from "react-stepper-horizontal";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Link, useHistory } from "react-router-dom";
import { commerce } from "../../../lib/commerce";

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });

          setCheckoutToken(token);
        } catch {
          if (activeStep !== steps.length) history.push("/");
        }
      };

      generateToken();
    }
  }, [cart]);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <h5>
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}{" "}
          </h5>
          <div>
            <p>Order ref: {order.customer_reference} </p>
          </div>
          <br />
          <Link
            to="/"
            className="text-xs rounded-full bg-blue-500 text-white font-bold py-1 px-3 block focus:outline-none"
          >
            <button>Back to Home</button>
          </Link>
        </div>
      </>
    ) : (
      <div>Loading...</div>
    );

  if (error) {
    Confirmation = () => (
      <>
        <h5>Error: {error}</h5>
        <br />
        <Link
          to="/"
          className="text-xs rounded-full bg-blue-500 text-white font-bold py-1 px-3 block focus:outline-none"
        >
          <button>Back to Home</button>
        </Link>
      </>
    );
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <div className="pt-20">
      <h1 className="border-2 border-gray-300 w-1/2 mt-10 m-auto shadow-md text-center pt-5 text-4xl font-bold">
        Checkout
        <div className="align-middle w-full py-5">
          <Stepper
            steps={[
              { title: "Shipping address" },
              { title: "Payment details" },
            ]}
            activeStep={activeStep}
            activeColor="#3963ed"
            completeColor="#3963ed"
            defaultBarColor="#636363"
            completeBarColor="#3963ed"
            circleFontSize={16}
            titleTop={16}
          />
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </div>
      </h1>
    </div>
  );
};

export default Checkout;
