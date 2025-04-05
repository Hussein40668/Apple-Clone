import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Four04 from "../Four04/Four04";

function SingleAppleProduct() {
  const [products, setProducts] = useState([]);

  console.log(useParams());
  const { productID } = useParams();

  useEffect(() => {
    //  fetch("http://localhost:2025/iphones") // from database
     fetch("/iphoneData.json") // from local file
      .then((res) => res.json())
      .then((products) => {
         console.log(products); // all data

        const productList = products.products;
        const singleProduct = productList.filter(
          (product) => product.Product_id == productID
        );
        setProducts(singleProduct);
      })
      .catch(() => console.log("Error: sorry! unable to fetch data"));
  }, [productID]);

 // console.log(products); // single data

  if (products.length) {
    return (
      <div>
        <section className="internal-page-wrapper">
          <div className="container">
            {products?.map((singleProduct) => {
              let id = singleProduct.Product_id;
              let title = singleProduct.Product_name;
              let img = singleProduct.Product_img;
              let Brief = singleProduct.Product_brief_description;
              let StartPrice = singleProduct.Starting_price;
              let PriceRange = singleProduct.Price_range;
              let details = singleProduct.Product_description;

              return (
                <div key={id}>
                  <div className=" row justify-content-center text-center">
                    <div className={`col-12 mt-5 pt-5`}>
                      <div className="title-wrapper">
                        <h1 className="font-weight-bolder">{title}</h1>
                      </div>
                      <div className="brief-description pb-2">{Brief}</div>
                    </div>
                  </div>

                  <div className="row justify-content-center text-center product-holder h-100">
                    <div className={`col-sm-12 col-md-6 my-auto`}>
                      <div className="starting-price font-weight-bold pb-3">
                        {`Starting at ${StartPrice}`}
                      </div>
                      <div className="monthly-price font-weight-bold pb-3">
                        {PriceRange}
                      </div>
                      <div className="product-details">
                        {details}
                      </div>
                    </div>

                    <div className={`col-sm-12 col-md-6`}>
                      <div className="product-image">
                        <img src={img} alt="product" />
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
  } else {
     <Four04 />;
  }
}
export default SingleAppleProduct;
