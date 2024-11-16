import React from 'react';
import Layout from '../components/layout';
import { Icon } from '@iconify/react/dist/iconify.js';

const Cart = ({ items = [], onUpdateQuantity, onRemoveItem }) => {
  // Function to calculate total price
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Layout>
    <div className="cart">
      {items.length === 0 ? (
        <p className="font-bold ">Your cart is empty.<Icon className="size-8" icon={"hugeicons:confused"}/></p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-info">
                <h4>{item.name}</h4>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-control">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div className="total">
        <h3>Total: ${calculateTotal()}</h3>
      </div>
    </div></Layout>
  );
};

export default Cart;
