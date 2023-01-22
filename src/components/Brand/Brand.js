import React from 'react';
import './Brand.css'
import brand1 from '../../assets/Brand/brandImg1.png';
import brand2 from '../../assets/Brand/brandImg2.png';
import brand3 from '../../assets/Brand/brandImg3.png';
import brand4 from '../../assets/Brand/brandImg4.png';
import brand5 from '../../assets/Brand/brandImg5.png';

const Brand = () => {

  const images = [
    {
      "id": 1,
      "name": "Brand1",
      "img": brand1
    },
    {
      "id": 2,
      "name": "Brand2",
      "img": brand2
    },
    {
      "id": 3,
      "name": "Brand3",
      "img": brand3
    },
    {
      "id": 4,
      "name": "Brand4",
      "img": brand4
    },
    {
      "id": 5,
      "name": "Brand5",
      "img": brand5
    }
  ]
  return (
    <>
      <section className="section">
        <div className="container">
          <h1 className="section-subtitle">Our Trusted Brand</h1>
          <div className="brand-images">
            {
              images?.map(img => <div
                key={img?.id}
                className="brand-image"
              >
                <img src={img?.img} alt={img?.name} className="brand-img" />
              </div>)
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Brand;