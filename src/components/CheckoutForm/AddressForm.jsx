import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  return (
    <>
      <FormProvider {...methods}>
        <div className="flex items-center h-auto w-full">
          <div className="w-full rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
            <h6 className="block w-full text-center mb-12">Shipping Address</h6>

            <form
              onSubmit={methods.handleSubmit((data) =>
                next({
                  ...data,
                  shippingCountry,
                  shippingSubdivision,
                  shippingOption,
                })
              )}
              className="my-4 md:flex md:flex-wrap md:justify-between text-left"
            >
              <div className="flex flex-col px-1 md:w-1/2">
                <label className="uppercase font-bold text-xs">
                  First Name
                </label>
                <FormInput name="firstName" label="First Name" />
              </div>
              <div className="flex flex-col px-1 md:w-1/2">
                <label className="uppercase font-bold text-xs">Last Name</label>
                <FormInput name="lastName" label="Last Name" />
              </div>
              <div className="flex flex-col px-1 md:w-1/2">
                <label className="uppercase font-bold text-xs">Address</label>
                <FormInput name="address1" label="Address" />
              </div>
              <div className="flex flex-col px-1 md:w-1/2">
                <label className="uppercase font-bold text-xs">Email</label>
                <FormInput name="email" label="Email" />
              </div>
              <div className="flex flex-col px-1 md:w-1/2">
                <label className="uppercase font-bold text-xs">City</label>
                <FormInput name="city" label="City" />
              </div>
              <div className="flex flex-col px-1 md:w-1/2">
                <label className="uppercase font-bold text-xs">ZIP</label>
                <FormInput name="zip" label="ZIP / Postal Code" />
              </div>

              <div className="flex flex-col px-1 md:w-1/3">
                <label className="uppercase font-bold text-xs">Country</label>
                <select
                  className="w-full text-sm focus:outline-none"
                  value={shippingCountry}
                  onChange={(e) => setShippingCountry(e.target.value)}
                >
                  {Object.entries(shippingCountries)
                    .map(([code, name]) => ({ id: code, label: name }))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col px-1 md:w-1/3">
                <label className="uppercase font-bold text-xs">
                  Subdivision
                </label>
                <select
                  className="w-full text-sm focus:outline-none"
                  value={shippingSubdivision}
                  onChange={(e) => setShippingSubdivision(e.target.value)}
                >
                  {Object.entries(shippingSubdivisions)
                    .map(([code, name]) => ({ id: code, label: name }))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col px-1 md:w-1/3">
                <label className="uppercase font-bold text-xs">Options</label>
                <select
                  className="w-full text-sm focus:outline-none"
                  value={shippingOption}
                  onChange={(e) => setShippingOption(e.target.value)}
                >
                  {shippingOptions
                    .map((sO) => ({
                      id: sO.id,
                      label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                    }))
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                </select>
              </div>
              <br />
              <div className="inline-flex align-middle w-full justify-between pt-10">
                <Link to="/cart">
                  <button className="text-xs rounded-full bg-red-500 text-white font-bold py-1 px-3 block focus:outline-none">
                    Back to Cart
                  </button>
                </Link>
                <button
                  type="submit"
                  className="text-xs rounded-full bg-blue-500 text-white font-bold py-1 px-3 block focus:outline-none"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default AddressForm;
