import React, { useContext, useState } from 'react';
import './Product.css'
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/Authprovider';
import axios from 'axios'

const Product = ({ product }) => {
  const { user } = useContext(AuthContext)
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);


  const handleQuantityDecrease = () => {
    if (quantity === 1) {
      return toast.error("You must have to buy at least one!");
    }
    setQuantity((current) => current - 1);
  };


  const handleAddCart = (product) => {
    const cart = {
      productId: product._id,
      name: product?.title,
      image: product?.img,
      price: product?.price,
      quantity: quantity,
      userId: user.uid,
      email: user?.email,
    }

    if (!user?.email) {
      toast.error("You must login for buy product!");
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/add-cart`, cart)
      .then(res => {
        setShowQuantity(false);
        setQuantity(1);
        toast.success(`${product.title} Added on your Cart`);
      })
      .catch(err => console.error(err))
  }


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

          <div className={`${showQuantity ? "quantity-flex " : "hidden"} `}>
            <div className="flex">
              <h1
                onClick={() => setQuantity((current) => current + 1)}
                className="btn-plus"
              >
                +
              </h1>
              <h1 className="text-3xl bg-gray-300 px-4 py-2 border-l-2">
                {quantity}
              </h1>
              <h1
                onClick={handleQuantityDecrease}
                className="btn-minus"
              >
                -
              </h1>
            </div>
            <button
              onClick={() => handleAddCart(product)}
              className="buy-btn"
            >
              Buy
            </button>
          </div>

          <button
            onClick={() => setShowQuantity(true)}
            className={`btn ${showQuantity && "hidden"}`}
          >add to cart</button>
        </div>
      </div>
    </>
  );
};

export default Product;