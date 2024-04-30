import React, { useState } from 'react'
import { useCreateOrderMutation } from "../state/pizzaApi.js";
import { changeFullName, changeSize, toggleTopping } from '../state/pizzaSlice.js';
import { useSelector, useDispatch } from "react-redux";

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}
let errorMessage = "";

export default function PizzaForm() {
  const orderFullName = useSelector((slice) => slice.pizzaState.fullName);
  const orderSize = useSelector((slice) => slice.pizzaState.size);
  const orderToppings = useSelector((slice) => slice.pizzaState.toppings);
  const [createOrder, { isLoading, isError, isSuccess }] = useCreateOrderMutation();
  // const [ submitError, setSubmitError ] = useState("");
  const dispatch = useDispatch();

  function handleFullName(event) {
    const { value } = event.target;
    dispatch({ type: changeFullName, payload: value });
  };

  function handleSize(event) {
    const { value } = event.target;
    dispatch({ type: changeSize, payload: value });
  };

  function handleToppings(event) {
    const { name } = event.target;
    // console.log(name);
    // control with an if statement a way we can prevent the same name value to appear inside of the array
    // dispatch is adding the name value to the toggleTopping
    dispatch({ type: toggleTopping, payload: name });
    console.log(orderToppings);
  };

    async function onSubmit(event) {
    event.preventDefault();
    const order = { fullName: orderFullName, size: orderSize, toppings: orderToppings };
    try {
      await createOrder(order).unwrap();
    } catch (error) {
      console.log("This is onSubmit: " + error);
      if (error.data) errorMessage = error.data.message;
      // setSubmitError("Failed to submit order. Please try again later.");
    };
  };
  
  return (
    <form onSubmit={onSubmit}>
      <h2>Pizza Form</h2>
      {isLoading && <div className='pending'>Order in progress...</div>}
      {isError && <div className='failure'>Order failed: {errorMessage}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            onChange={handleFullName}
            value={orderFullName}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select onChange={handleSize} value={orderSize} data-testid="sizeSelect" id="size" name="size">
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input onChange={handleToppings} data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input onChange={handleToppings} data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input onChange={handleToppings} data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input onChange={handleToppings} data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input onChange={handleToppings} data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
