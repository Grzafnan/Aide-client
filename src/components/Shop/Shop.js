import React, { useEffect, useState } from 'react';
import Product from './Product/Product';
import axios from 'axios';
import './Shop.css'

const Shop = () => {
  const [products, setProducts] = useState([]);

  // console.log(products);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => setProducts(res.data.data))
      .catch(err => {
        console.log(err);
      })
  }, [])



  return (
    <section id='shop' className='section shop-container'>
      <div>
        <h1 className='section-subtitle'>Our Popular Products</h1>
        <p className='section-para'>Compelling product copy can be the difference between losing website viewers and gaining loyal customers. Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam repudiandae dolore ducimus repellat eligendi? Minima, nostrum modi.</p>
      </div>

      <div className='product-container'>
        {
          products?.map(product => <Product key={product._id} product={product} />)
        }
      </div>
    </section>
  );
};

export default Shop;