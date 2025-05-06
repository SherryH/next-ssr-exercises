'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  // ⛔️ Issue: Direct localStorage access during initialization
  // This will cause errors during SSR as window is not available on server
  // We can use a ()=>{} in initiaArg and
  // if(window!==null){return window.localStorage.getItem('items'))}

  // OR, we can load a spinner first on the Server side (when initalArg is null)
  // and load the items when client side is loaded
  // const initialArg = JSON.parse(window.localStorage.getItem('items')) || [];

  // We want to load from localStorage on refresh
  // but if we load the items on React.useEffect, we get a temporary flash
  // So we need to set the initialArg from localStorage on initialization!
  const [items, dispatch] = React.useReducer(reducer, null);

  // Now if we load the items on mount, there is a lag before the items are shown
  // but it avoids the hydration mismatch issue where the Server is []
  // whereas client side has non-empty items in localStorage
  // it may cause flickering issue
  React.useEffect(() => {
    const initItems = JSON.parse(window.localStorage.getItem('items')) || [];
    console.log(initItems);
    dispatch({
      type: 'initialize',
      items: initItems,
    });
  }, []);

  // NOTE: don't set items inside reducers. It is cleaner to put it here
  React.useEffect(() => {
    if (items !== null) {
      window.localStorage.setItem('items', JSON.stringify(items));
    }
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
