import React from "react";

const ProductSpecification = ({ singleProduct }) => {
  const {
    _id,
    product_name,
    category,
    product_heading,
    box_content,
    primary_color,
    primary_img,
    price,
    available_color,

    product_highlight,
    details,
    feature_img1,
    feature_img2,
    post_date,
  } = singleProduct;
  return (
    <div>
      <p className="text-lg font-semibold bg-gray-50 p-2 text-gray-800">
        Product Specification of {product_name}
      </p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Product Type
              </th>
              <td className="px-6 py-4">{product_name}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Color
              </th>
              <td className="px-6 py-4">{primary_color}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Available Color
              </th>
              <td className="px-6 py-4 flex ">
                {" "}
                {available_color?.map((color) => (
                  <div
                    key={color?.id}
                    className="mr-2"
                    // style={{ backgroundColor: color?.id }}
                  >
                    {" "}
                    {color?.name},
                  </div>
                ))}
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Category
              </th>
              <td className="px-6 py-4">{category}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Box Content
              </th>
              <td className="px-6 py-4">{box_content}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Registered
              </th>
              <td className="px-6 py-4">{post_date?.slice(0, 10)}</td>
            </tr>

            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Reference no.
              </th>
              <td className="px-6 py-4">SG-{_id}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Product Details  */}
      <div className="mb-6">
        <p className="text-lg bg-gray-50 p-2 font-semibold my-2 text-gray-800 break-words">
          Product Details of : {product_name}
        </p>
        <p className="text-gray-800 m-2 break-words">{product_highlight}</p>
        <p className="text-gray-800 m-2  break-words">{details}</p>
      </div>
    </div>
  );
};

export default ProductSpecification;
