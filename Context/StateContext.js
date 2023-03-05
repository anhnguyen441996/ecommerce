import React, { useState, createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [qty, setQty] = useState(1);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);



    const incQty = () => {
        setQty(qty + 1);
    }

    const decQty = () => {
        if (qty - 1 < 1) {
            return 1
        }
        setQty(qty - 1);
    }
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);


        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
                }
              })
              setCartItems(updatedCartItems);
        }
        else
        {
            setCartItems([...cartItems, { ...product, quantity }]);
        }
    
        toast(`${quantity} ${product.name} added to the cart.`, {
            position: toast.POSITION.TOP_CENTER
        });
    }

    return (
        <Context.Provider value={{ qty, incQty, decQty, onAdd, totalQuantities, showCart, setShowCart, cartItems, setCartItems, totalPrice, setTotalPrice}}>
            <ToastContainer autoClose={1500} />
            {children}
        </Context.Provider>
    )
}

export default Context
