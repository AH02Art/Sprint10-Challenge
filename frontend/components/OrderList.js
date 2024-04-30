import React from 'react'
import { useGetHistoryQuery } from "../state/pizzaApi.js";
import { useSelector, useDispatch } from "react-redux";
import { filterChange } from "../state/pizzaSlice.js";

export default function OrderList() {
  const dispatch = useDispatch();
  const { data: orders } = useGetHistoryQuery();
  const orderFilter = useSelector((slice) => slice.pizzaState.sizeFilter)

  function handleSelectSize(event) {
    const { innerText } = event.target;
    dispatch({ type: filterChange, payload: innerText });
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.filter((order) => {
            if (orderFilter === "All") return true;
            else return order.size === orderFilter;
          })
            .map((order) => {
            return (
              <li key={order.id}>
                {order.toppings && (<div>{order.customer} ordered a size {order.size} with {order.toppings.length} topping{order.toppings.length !== 1 ? "s" : "" }</div>)}
                {!order.toppings && (<div>{order.customer} ordered a size {order.size} with no toppings</div>)}
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map((size) => {
            const className = `button-filter${size === orderFilter ? ' active' : ''}`
            return (
              <button
                onClick={handleSelectSize}
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}>{size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
