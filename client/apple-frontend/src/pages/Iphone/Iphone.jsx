import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";

function Iphone() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function getIphoneData() {
      try {
         const response = await fetch("http://localhost:2025/iphones"); // from data base
        //const response = await fetch("/iphoneData.json"); // from local file

        const data = await response.json(); // to convert in object form to use
        setProducts(() => data.products); //update the state to get iphone data
        // console.log(data);
      } catch (error) {
        console.log(error);
      };

      // fetch("/iphones.json")
      //   .then((res) => res.json())
      //   .then((products) => {
      //     setProducts(() => products.products);
      //   });
    }
    getIphoneData();
  }, []);
  console.log(products);

  let flip = true;
  return (
    <div>
      <section className="internal-page-wrapper">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12 mt-5 pt-5">
              <div className="title-wraper bold">Iphones</div>
              <div className="brief-description">
                The best for the brightest.
              </div>
            </div>
          </div>

          {products?.map((singleProduct) => {
            let id = singleProduct.Product_id;
            let title = singleProduct.Product_name;
            let img = singleProduct.Product_img;
            let Brief = singleProduct.Product_brief_description;
            let StartPrice = singleProduct.Starting_price;
            let PriceRange = singleProduct.Price_range;
            let SingleAppleProduct = "/iphone/" + id;

            let order1 = 1;
            let order2 = 2;
            if (flip) {
              order1 = 2;
              order2 = 1;

              flip = !flip;
            } else {
              flip = !flip;
            }

            let productDiv = (
              <div
                key={id}
                className="row justify-content-center text-center product-holder h-100 top-100 bottom-100"
              >
                <div className={`col-sm-12 col-md-6 my-auto order-${order1}`}>
                  <div className="product-title">{title}</div>
                  <div className="product-brief">{Brief}</div>
                  <div className="starting-price">
                    {`Starting at ${StartPrice}`}
                  </div>
                  <div className="monthly-price">{PriceRange}</div>
                  <div className="links-wrapper">
                    <ul>
                      <li>
                        <Link to={SingleAppleProduct}>Learn more</Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={`col-sm-12 col-md-6 order-${order2}`}>
                  <div className="product-image">
                    <img src={img} alt="" />
                  </div>
                </div>
              </div>
            );
            return productDiv;
          })}
        </div>
      </section>
    </div>
  );
}
export default Iphone;
