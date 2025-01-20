import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = (cartItems) => {
    return cartItems.reduce((total, item) => {
      // Remover o símbolo de moeda e garantir que o 'cost' seja um número
      const cost = parseFloat(item.cost.replace(/[^\d.-]/g, '')); // Remove qualquer coisa que não seja um número, ponto ou hífen
      const quantity = item.quantity;
  
      // Verifica se o 'cost' é válido
      if (isNaN(cost)) {
        console.error("Invalid cost value:", item.cost);
        return total; // Retorna o total sem somar o item inválido
      }
  
      // Verifica se a quantidade é válida
      if (typeof quantity !== 'number' || isNaN(quantity)) {
        console.error("Invalid quantity value:", quantity);
        return total; // Retorna o total sem somar o item inválido
      }
  
      // Soma o total com o valor do item (cost * quantity)
      return total + (cost * quantity);
    }, 0);
  };
  

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevenir o comportamento padrão do botão (se necessário)
    if (onContinueShopping) {
      onContinueShopping(); // Chamar a função passada do componente pai
    }
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(item.name)); // Remove o item se a quantidade for 0
      }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {  
    // Remover o símbolo de moeda e garantir que 'cost' seja um número
  const cost = parseFloat(item.cost.replace(/[^\d.-]/g, '')); // Remove qualquer coisa que não seja número, ponto ou hífen

  // Verifica se 'cost' é válido
  if (isNaN(cost)) {
    console.error("Invalid cost value:", item.cost);
    return 0; // Retorna 0 se o valor for inválido
  }

  // Verifica se 'quantity' é válida
  if (typeof item.quantity !== 'number' || isNaN(item.quantity)) {
    console.error("Invalid quantity value:", item.quantity);
    return 0; // Retorna 0 se a quantidade for inválida
  }

  // Retorna o custo total para o item (cost * quantity)
  return cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount(cart)}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
      <button className="get-started-button" onClick={(e) => {
        console.log("Button clicked!"); // Verifique se o botão está sendo clicado
        onContinueShopping(e); // Chama a função passada como prop
      }}>
        Continue Shopping
      </button>

        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


