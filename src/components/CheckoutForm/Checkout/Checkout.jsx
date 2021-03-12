import React, { useState } from 'react'
import Stepper from 'react-stepper-horizontal';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  )

  const Form = () => activeStep === 0
    ? <AddressForm />
    : <PaymentForm />

  return (
    <div className="pt-20">
      <h1 className="border-2 border-gray-300 w-1/2 mt-10 m-auto shadow-md text-center pt-5 text-4xl font-bold">
        Checkout
        <div className="align-middle w-full py-5">
          <Stepper
            steps={[{title: 'Shipping address'}, {title: 'Payment details'}]}
            activeStep={activeStep}
            activeColor="#3963ed"
            completeColor="#3963ed"
            defaultBarColor="#636363"
            completeBarColor="#3963ed"
            circleFontSize={16}
            titleTop={16}
          />
          {activeStep === steps.length ? <Confirmation /> : <Form /> }
        </div>
      </h1>
    </div>
  )
}

export default Checkout
