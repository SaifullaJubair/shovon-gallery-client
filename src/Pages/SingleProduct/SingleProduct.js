import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/singleproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleProduct(data);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <h1>{singleProduct?._id}</h1>
      {/* Add more product details rendering here */}
    </div>
  );
};

export default SingleProduct;
