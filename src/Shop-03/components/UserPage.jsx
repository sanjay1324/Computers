import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css';
import { Link } from 'react-router-dom';

function UserPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const apiUrl = 'https://firestore.googleapis.com/v1/projects/digig-57d5f/databases/(default)/documents/Products';

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const productList = response.data.documents.map((doc) => ({
          id: doc.name.split('/').pop(),
          fields: doc.fields,
        }));
        setProducts(productList);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToCart = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    setCart([...cart, { ...productToAdd, quantity: 1 }]);
  };

  return (
    <section className='shop14'>
    <div className="user-page">
      <h1>Digital Genie</h1>
      <div className="product-list">
        <ul>
          {currentProducts.map((product) => (
            <div className="product-item" key={product.id}>
              <div className="product-details">
                <img
                  src={product.fields.imageurl?.stringValue}
                  alt={product.fields.productname?.stringValue}
                  className="product-image"
                />
                <strong><br></br>{product.fields.productname?.stringValue}</strong>
                <p>Price: ₹{product.fields.price?.integerValue}</p>
                <div className="product-buttons">
                  <button onClick={() => addToCart(product.id)}>Add to Cart</button>
                  <Link to={`/shop14/products/${product.id}`}>
                    <button className="view-details-button">View Details</button>
                  </Link>
                  <button className="buy-now-button" onClick={() => alert('Buy Now clicked')}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
    </section>
  );
}
export default UserPage;