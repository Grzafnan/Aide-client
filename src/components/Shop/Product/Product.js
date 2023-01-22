import React from 'react';
import './Product.css'

const Product = ({ product }) => {
  return (
    <>
      <div className="card">
        <div className="img">
          <img src={product.img} alt={product.title} title={product.title} />
        </div>
        <div className="card-text">
          <h2>{product.title}</h2>
          <div className="price">
            ${product?.price}
          </div>
          <div className="desc">{product?.description.slice(0, 100) + "..."}
          </div>
          <a href="#" className="btn">add to cart</a>
        </div>
      </div>
    </>
  );
};

export default Product;