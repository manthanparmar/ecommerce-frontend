import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = 1; // Get userId from localStorage or any other method you're using
    const fetchCartData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/cart/${userId}`, {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }

        const data = await response.json();
        setCartItems(data); // Update the state with the fetched cart data
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    if (userId) {
      fetchCartData(); // Call the function only if userId is available
    }
  }, []); // Empty dependency array to run this effect once when the component mounts

  const handleQuantityChange = async (cartId, productId, newQuantity) => {
    // Optimistic UI update - update only the specific item in the cart
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cart_id === cartId
          ? { ...item, quantity: newQuantity } // Update the specific item
          : item // Leave other items unchanged
      )
    );
  
    // Send the updated quantity to the backend
    try {
        console.log("newQuantity",newQuantity,cartId);
        
      const response = await fetch(`http://localhost:8000/api/updateCart/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update cart item');
      }
  
      const userId = 1; // Replace with dynamic user ID if needed
      const fetchUpdatedCartData = async () => {
        try {
          const fetchResponse = await fetch(`http://localhost:8000/api/cart/${userId}`);
          if (!fetchResponse.ok) {
            throw new Error('Failed to fetch updated cart data');
          }
          const updatedCartData = await fetchResponse.json();
          setCartItems(updatedCartData); // Update the state with the fetched updated cart data
        } catch (error) {
          console.error('Error fetching updated cart data:', error);
        }
      };
  
      fetchUpdatedCartData(); // Call to refetch the data
  
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };
  
  

  return (
    <>
      <Header />
      <div className="cart-section mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="cart-table-wrap">
                <table className="cart-table">
                  <thead className="cart-table-head">
                    <tr className="table-head-row">
                      <th className="product-remove"></th>
                      <th className="product-image">Product Image</th>
                      <th className="product-name">Name</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {cartItems != null && cartItems != '' && cartItems.error == undefined ? cartItems.map((item) => (
                        <tr className="table-body-row" key={item.cart_id}>
                        <td className="product-remove">
                            <a onClick={(e) =>
                                handleQuantityChange(item.cart_id, item.product_id, 0) // Pass cartId and newQuantity
                            }><i className="far fa-window-close"></i></a>
                        </td>
                        <td className="product-image">
                            <img src={item.image_url} alt={item.name} />
                        </td>
                        <td className="product-name">{item.name}</td>
                        <td className="product-price">${item.price}</td>
                        <td className="product-quantity">
                            <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                                handleQuantityChange(item.cart_id, item.product_id, Number(e.target.value)) // Pass cartId and newQuantity
                            }
                            />
                        </td>
                        <td className="product-total">${item.price * item.quantity}</td>
                        </tr>
                    )):    <td className="product-remove">No items found in the cart</td>}
                </tbody>


                </table>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="total-section">
                <table className="total-table">
                  <thead className="total-table-head">
                    <tr className="table-total-row">
                      <th>Total</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="total-data">
                      <td><strong>Subtotal: </strong></td>
                      <td>{cartItems != null && cartItems != '' && cartItems.error == undefined ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0): 0}$</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Shipping: </strong></td>
                      <td>$0</td>
                    </tr>
                    <tr className="total-data">
                      <td><strong>Total: </strong></td>
                      <td>{cartItems != null && cartItems != '' && cartItems.error == undefined ?  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0): 0}$</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
