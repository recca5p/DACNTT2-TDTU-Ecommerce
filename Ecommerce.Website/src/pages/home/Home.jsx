import { getProductAPI } from "api/product-api";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({}) => {
  const [product, setProduct] = useState([]);
  console.log(product);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const resquest = await getProductAPI("");
        const result = resquest.data;
        setProduct(result);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // storeProductId(id) {
  //   localStorage.setItem("ProductId", id);
  // }

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center items-center -m-4">
            {product.length > 0 &&
              product.map((item) => (
                <Fragment key={item.id}>
                  <div className="lg:w-1/5 md:w-1/2 w-full my-2 mx-1 bg-primary-gradient shadow-sm rounded-lg hover:shadow-lg transition-all ease-in-out duration-200">
                    <div
                      className="block relative w-full h-[250px] rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        localStorage.setItem(
                          "productDetail",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      <img
                        alt={item.brand}
                        className="object-cover object-center block w-full h-full "
                        src={item.thumbnail}
                      />
                    </div>
                    <div className="mt-4 px-4 py-2">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {item.category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {item.category}
                      </h2>
                      <p className="mt-1">{item.price.toLocaleString()} VND</p>
                    </div>
                  </div>
                </Fragment>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
