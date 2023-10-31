import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { useLoaderData } from "react-router-dom";
import ProductCard from "../AllProducts/ProductCard";
import Loader from "../../Shared/Loader/Loader";
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import ProductsCategorySideBar from "../../components/ProductsCategorySideBar/ProductsCategorySideBar";

const ProductByCategory = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const { loading } = useContext(AuthContext);
  const products = useLoaderData();

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
  if (loading) {
    return <Loader />;
  }

  return (
    <div className=" flex  ">
      <ProductsCategorySideBar />
      <div className="w-full m-6">
        <h3 className="text-gray-800 font-semibold text-lg">
          Total {products.length} products{" "}
        </h3>
        {products.length === 0 ? (
          <div className="flex mx-auto items-center h-full  text-gray-700 font-semibold text-2xl justify-center mt-4">
            <p>No products in this category are currently available.😢</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-4">
            {currentItems?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        )}

        <div className="pagination mt-10">
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

export default ProductByCategory;