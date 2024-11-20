import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ReactRating from 'react-rating'; // Import React Rating component

const ProductDetailPage = () => {
  const [newQuantity, setNewQuantity] = useState(1);
  const [rating, setRating] = useState(0); // Store the user's rating
  const [reviewText, setReviewText] = useState(''); // Store the review text
  const [reviews, setReviews] = useState([]); // Store reviews
  const [averageRating, setAverageRating] = useState(0); // Store average rating
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/getProduct/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setAverageRating(data.averageRating || 0); // Set initial average rating
        setReviews(data.reviews)
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const updateQuantity = (quantity) => {
    setNewQuantity(quantity);
  };

  const addToCart = () => {
    let userId = 1;
    fetch('http://localhost:8000/api/insertToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: productId,
        quantity: newQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  };

  const handleReviewSubmit = async () => {
    if (!reviewText || rating === 0) {
      alert('Please provide a rating and a review.');
      return;
    }

    const userId = 1; // Example user ID
    const newReview = {
      userId,
      productId,
      rating,
      reviewText,
    };

    try {
      const response = await fetch('http://localhost:8000/api/submitReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      const data = await response.json();
      
      if (data.status == 'success') {
        alert('Review submitted successfully!');
        setReviews((prevReviews) => [...prevReviews, newReview]); // Add new review to state
        setRating(0); // Reset rating
        setReviewText(''); // Reset review text
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="single-product mt-150 mb-150">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="single-product-img">
                <img src={product.image_url} alt={product.name} />
              </div>
            </div>
            <div className="col-md-7">
              <div className="single-product-content">
                <h3>{product.name}</h3>
                <p className="single-product-pricing">${product.price}</p>
                <p>{product.description}</p>
                <div className="single-product-form">
                  <input
                    type="number"
                    placeholder="0"
                    value={newQuantity}
                    onChange={(e) => updateQuantity(Number(e.target.value))}
                  />
                  <a onClick={addToCart} className="cart-btn">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Rating and Review Section */}
          <div className="rating-section mt-5">
            <div className="rating-and-reviews mt-4">
            <h4 className="mb-4">Rating and Reviews</h4>

            {/* Average Rating Section */}
            <div className="average-rating mb-4">
                <p className="mb-2">
                <strong>Average Rating:</strong> {averageRating.toFixed(1)} / 5
                </p>
                <ReactRating
                emptySymbol={<i className="fa fa-star-o fa-lg text-warning"></i>} // Styled empty star
                fullSymbol={<i className="fa fa-star fa-lg text-warning"></i>}   // Styled full star
                initialRating={averageRating} // Display the average rating
                readonly
                fractions={2} // Half-star precision
                />
            </div>

            {/* User Rating Input */}
            <div className="user-rating-input mb-4">
                <h5 className="mb-3">Submit Your Rating:</h5>
                <ReactRating
                emptySymbol={<i className="fa fa-star-o fa-lg text-secondary"></i>}
                fullSymbol={<i className="fa fa-star fa-lg text-warning"></i>}
                initialRating={rating}
                onChange={(rate) => setRating(rate)} // Update state on change
                />
            </div>

            {/* Review Text Input */}
            <div className="review-input mb-4">
                <h5 className="mb-3">Write Your Review:</h5>
                <textarea
                className="form-control"
                rows="4"
                placeholder="Share your thoughts about the product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
            </div>

            {/* Submit Review Button */}
            <div className="submit-review">
                <button
                className="btn btn-primary"
                onClick={handleReviewSubmit}
                >
                Submit Review
                </button>
            </div>
            </div>


            {/* Display User Reviews */}
            <div className="user-reviews mt-4">
              <h5>User Reviews:</h5>
              
              <div className="review-section mt-4">
                <h4 className="mb-4">Customer Reviews</h4>
                {reviews.length === 0 ? (
                    <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                ) : (
                    <div className="reviews-list">
                    {reviews.map((review, index) => (
                        <div key={index} className="review-item p-3 mb-3 bg-light border rounded">
                        <div className="d-flex align-items-center mb-2">
                            <ReactRating
                            emptySymbol={<i className="fa fa-star-o text-warning"></i>}
                            fullSymbol={<i className="fa fa-star text-warning"></i>}
                            initialRating={review.rating}
                            readonly
                            />
                            <span className="ms-3 text-muted small">{review.rating}/5</span>
                        </div>
                        <div className="review-details">
                            <p className="mb-1">
                            <strong>{review.username}</strong>
                            </p>
                            <p className="mb-0">{review.reviewText}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
