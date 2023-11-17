import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { Link, useLoaderData } from "react-router-dom";
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
  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <div className=" flex  ">
      <ProductsCategorySideBar />
      <div className="w-full m-6">
        <h3 className=" text-gray-800 font-semibold text-lg">
          Total {products.length} products{" "}
        </h3>
        {products.length === 0 ? (
          <section className="flex items-center sm:p-16 bg-gray-50 text-gray-800">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-40 h-40 text-gray-400"
              >
                <path
                  fill="currentColor"
                  d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
                ></path>
                <rect
                  width="176"
                  height="32"
                  x="168"
                  y="320"
                  fill="currentColor"
                ></rect>
                <polygon
                  fill="currentColor"
                  points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
                ></polygon>
                <polygon
                  fill="currentColor"
                  points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
                ></polygon>
              </svg>
              <p className="text-3xl">
                Looks like our this category products are currently offline!
                Check different category.
              </p>
              <Link
                to="/category/all"
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 font-semibold rounded bg-orange-600 text-gray-50 hover:scale-105 duration-100"
              >
                Back to shopping
              </Link>
            </div>
          </section>
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
