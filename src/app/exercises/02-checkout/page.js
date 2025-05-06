'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const initialArg = JSON.parse(window.localStorage.getItem('items')) || [];
  // We want to load from localStorage on refresh
  // but if we load the items on React.useEffect, we get a temporary flash
  // So we need to set the initialArg from localStorage on initialization!
  const [items, dispatch] = React.useReducer(reducer, initialArg);

  // NOTE: don't set items inside reducers. It is cleaner to put it here
  React.useEffect(() => {
    window.localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: 'add-item',
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
