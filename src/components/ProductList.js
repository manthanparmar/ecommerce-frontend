import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace with your Laravel API URL
    fetch('http://localhost:8000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Helper function to truncate descriptions
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };
  const addToCart = (productId) => {
    // Replace 1 with the actual user ID (you can use auth logic to get it)
    const userId = 1;
    const quantity = 1;

    fetch('http://localhost:8000/api/insertToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Show success message
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };


  return (
    <>
    <Header />
    <div className="product-section mt-150 mb-150">
        
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div className="col-lg-4 col-md-6 text-center" key={index}>
              <div className="single-product-item">
                <div className="product-image">
                  <a href={`/product/${product.ID}`}>
                    <img src={product.image_url} alt={product.name} />
                  </a>
                </div>
                <h3>{product.name}</h3>
                <p className="product-price">{product.price}$</p>
                <p className="product-description">
                  {truncateDescription(product.description, 50)} {/* Show 50 characters */}
                </p>
                <a onClick={() => addToCart(product.ID)} className="cart-btn">
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ProductList;
