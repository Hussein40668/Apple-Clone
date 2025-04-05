import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Four04 from "../Four04/Four04";

function SingleAppleProduct() {
  const [products, setProducts] = useState([]);
  const { productID } = useParams();

  useEffect(() => {
    fetch("/iphoneData.json") // from local file
      
      // fetch("http://localhost:2025/iphones") // from data base
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // Log entire data

        const productList = data.products;
        const singleProduct = productList.filter(
          (product) => product.Product_id == productID
        );
        setProducts(singleProduct);
      })
      .catch((error) => {
        console.log("Error: sorry! unable to fetch data", error);
      });
  }, [productID]);

  if (products.length === 0) {
    return <Four04 />;
  }

  return (
    <div>
      <section className="internal-page-wrapper">
        <div className="container">
          {products.map((singleProduct) => {
            const {
              Product_id,
              Product_name,
              Product_img,
              Product_brief_description,
              Starting_price,
              Price_range,
              Product_description,
            } = singleProduct;

            console.log("Image Path:", Product_img); // Check image path

            return (
              <div key={Product_id}>
                <div className="row justify-content-center text-center">
                  <div className={`col-12 mt-5 pt-5`}>
                    <div className="title-wrapper">
                      <h1 className="font-weight-bolder">{Product_name}</h1>
                    </div>
                    <div className="brief-description pb-2">
                      {Product_brief_description}
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center text-center product-holder h-100">
                  <div className={`col-sm-12 col-md-6 my-auto`}>
                    <div className="starting-price font-weight-bold pb-3">
                      {`Starting at ${Starting_price}`}
                    </div>
                    <div className="monthly-price font-weight-bold pb-3">
                      {Price_range}
                    </div>
                    <div className="product-details">{Product_description}</div>
                  </div>

                  <div className={`col-sm-12 col-md-6`}>
                    <div className="product-image">
                      <img src={Product_img} alt="product" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default SingleAppleProduct;
