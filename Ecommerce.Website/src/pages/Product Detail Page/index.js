import { getProductAPI } from "api/product-api";
import React, { useEffect, useState } from "react";
import * as Actions from 'actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetail = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { id } = params;

  const cart = useSelector((cart) => cart.data);
  console.log(cart);
  const [isLoaded, setIsLoaded] = useState(false);
  const [product, setProduct] = useState(null);

  const callAPI = async () => {
    try {
      const result = await getProductAPI(`/${id}`);
      if (result.data) {
        setIsLoaded(true);
        setProduct(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoaded) {
      callAPI();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

//   const formatDate = new Date(product?.updatedDate).toLocaleDateString(
//     "vi-VI"
//   );

  const handleAddToCart = () => {
	console.log(product);
	dispatch(Actions.addToCart(product))
  }

  if (!isLoaded || !product) return null;

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={product.brand}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded shadow-md"
              src={product.thumbnail}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-yellow-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  Date: {new Date(product?.updatedDate).toLocaleDateString("vi-VI")}
                </span>
              </div>
              {/* <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae quas, impedit dignissimos cupiditate eveniet quia
                ipsum vero magnam? Neque nesciunt debitis, quasi deserunt et
                provident quod laboriosam fuga. Minima, repellat!
              </p> */}
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none" />
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                  <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none" />
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  {product.price.toLocaleString()} VND
                </span>
                <button
                  onClick={() => handleAddToCart()}
                  className="flex ml-auto text-white bg-gray-800 border border-transparent py-2 px-6 focus:outline-none hover:bg-gray-100 hover:text-gray-900 hover:border hover:border-gray-900 rounded transition-all ease-in-out duration-300"
                >
                  Add to cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;

// import React from "react";
// import { getProductAPI } from "../api/product-api";

// class ProductDetail extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLoaded: false,
//       product: [],
//     };
//   }

//   async componentDidMount() {
//     try {
//       let productId = localStorage.getItem("ProductId");
//       const result = await getProductAPI(`/${productId}`);
//       if (result.data) {
//         this.setState({
//           isLoaded: true,
//           product: result.data,
//         });
//       }
//       console.log(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   handleAddToCart() {

//   };

//   render() {
//     const { isLoaded, product } = this.state;

//     return (
//       <div className="product_image_area">
//         <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
//           <div className="row s_product_inner">
//             <div className="col-lg-6">
//               <div className="owl-carousel owl-theme s_Product_carousel">
//                 <div className="single-prd-item">
//                   <img className="img-fluid" src={product.thumbnail} alt="" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-5 offset-lg-1">
//               <div className="s_product_text">
//                 <h3>{product.name}</h3>
//                 <h2>${product.price}</h2>
//                 <ul className="list">
//                   <li>
//                     <a className="active" href="#">
//                       <span>Category</span> : Household
//                     </a>
//                   </li>
//                   <li>
//                     <a href="#">
//                       <span>Availibility</span> : In Stock
//                     </a>
//                   </li>
//                 </ul>
//                 <p>{product.category}</p>
//                 <div
//                   className="product_count"
//                   style={{ display: "flex", alignItems: "center" }}
//                 >
//                   <label>Quantity:</label>
//                   <input
//                     type="text"
//                     name="qty"
//                     id="sst"
//                     size="2"
//                     value={10}
//                     title="Quantity:"
//                     className="input-text qty"
//                     style={{ height: "30px" }}
//                   />
//                   <div style={{ paddingLeft: "20px" }}>
//                     <button
//                       className="increase items-count"
//                       style={{ position: "inherit" }}
//                       type="button"
//                     ></button>
//                   </div>
//                 </div>
//                 <button className="button primary-btn" onClick={() => handleAddToCart()}>
//                   Add to Cart
//                 </button>

//                 <div className="card_area d-flex align-items-center">
//                   <button
//                     className="icon_btn"
//                     style={{ cursor: "pointer", border: "none" }}
//                   ></button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ProductDetail;
