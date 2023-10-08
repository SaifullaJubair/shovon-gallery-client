import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import {
  MdOutlineApartment,
  MdOutlineBathroom,
  MdOutlineBedroomChild,
} from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import { TfiLocationPin } from "react-icons/tfi";
import ProductCard from "./ProductCard";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const itemsPerPage = 6;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    // console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  return (
    <div className="container grid grid-cols-6 gap-2">
      <div className=" col-span-1 border-primary border-2">
        <h2 className="text-lg font-semibold text-gray-800 ">Categories</h2>
      </div>
      <div className="col-span-5 ">
        <h3>Total 12 products </h3>
        <div className="grid grid-cols-3 gap-4">
          {currentItems?.map((product) => (
            <ProductCard key={product?._id} product={product}></ProductCard>
          ))}
        </div>
        <div className="pagination mt-6">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName="pagination-menu"
          />
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
