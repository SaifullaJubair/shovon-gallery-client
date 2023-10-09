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
  const [categories, setCategories] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProducts(data);
      });
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/allcategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        // console.log(data);
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
    <div className="container grid grid-cols-6 my-6 gap-2">
      <div className=" shadow-md ">
        <div className=" col-span-1 mx-auto pl-6 ">
          <h2 className="text-lg font-semibold text-gray-800 ">Category</h2>
          <p className="text-sm text-gray-600 font-semibold mt-4 "> All</p>
          {categories.map((category) => (
            <p
              className="text-sm text-gray-600 font-semibold mt-4 "
              key={category?._id}
            >
              {category?.name}
            </p>
          ))}
        </div>
      </div>
      <div className="col-span-5 mx-2 ">
        <h3 className="text-gray-800 font-semibold text-lg">
          Total 12 products{" "}
        </h3>

        <div className="grid grid-cols-3 gap-6 mt-4">
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
