import React from 'react';
import './Banner.css'
// import image1 from '../../assets/Banner/image1.jpg';
import image1 from '../../assets/Banner/cosmetic-products-with-avocado.jpg';
import image2 from '../../assets/Banner/image4.jpg';
import image3 from '../../assets/Banner/image2.jpg';
import image4 from '../../assets/Banner/black-silk.jpg';


const Banner = () => {


  const datas = [
    {
      "id": 1,
      "title": "Lorem ipsum dolor",
      "description": "Nam ultrices pellentesque facilisis. In semper tellus mollis nisl pulvinar vitae vulputate lorem consequat. Fusce odio tortor, pretium sit amet auctor ut, ultrices vel nibh.",
      "img": image1
    },
    {
      "id": 2,
      "title": "Lorem ipsum dolor",
      "description": "Competently benchmark interdependent imperatives whereas front-end results. Assertively empower effective leadership and bricks-and-clicks communities.",
      "img": image2
    },
    {
      "id": 3,
      "title": "Lorem ipsum dolor",
      "description": "Authoritatively seize efficient portals for interdependent total linkage. Phosfluorescently maintain integrated web services and standardized results.",
      "img": image3
    },
    {
      "id": 4,
      "title": "Lorem ipsum dolor",
      "description": "Energistically administrate efficient interfaces with enabled meta-services. Distinctively restore long-term high-impact markets for cross-unit imperatives.",
      "img": image4
    }
  ]




  return (
    <section>
      <div id="slider">
        <div className="slides">

          {
            datas?.map(data => <div key={data?.id} className="slider">
              <div className="legend"></div>
              <div className="content">
                <div className="content-txt">
                  <h1>{data?.title}</h1>
                  <p>{data?.description}</p>
                </div>
              </div>
              <div className="image">
                <img src={data?.img} alt={data?.title} />
              </div>
            </div>)
          }

        </div>
        <div className="switch">
          <ul>
            <li>
              <div className="on"></div>
            </li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;