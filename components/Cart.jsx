import React, { useState, useContext } from 'react'
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from 'react-icons/ti';
import Context from '@/Context/StateContext';
import { urlFor } from '@/lib/client';
import product from '@/sanity_ecommerce/schemas/product';

const Cart = () => {
  const { setShowCart, cartItems, totalPrice, setCartItems, setTotalPrice } = useContext(Context);
  
  
  const removeItem = (item) => {
    const result = cartItems.filter(item => item._id != item._id);
    setCartItems(result)
    const product_delete =  cartItems.find(item => item._id = item._id)
    setTotalPrice((prevTotalpPrice) => prevTotalpPrice - product_delete.price * product_delete.quantity)
 }


  return (
    <div className="cart-wrapper">
      <div className='cart-container'>
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{cartItems.length} items</span>
        </button>




        <div className="product-container">
          {cartItems.map((item, i) => (
            <div className="product">
              <img src={urlFor(item.image[0])} alt='image' className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick=''>
                        <AiOutlineMinus />
                      </span>
                      <span className="num" onClick="">{item.quantity}</span>
                      <span className="plus" onClick=''><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeItem(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>

          ))}
        </div>


        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick=''>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Cart
