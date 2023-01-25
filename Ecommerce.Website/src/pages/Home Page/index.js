import { getProductAPI } from "api/product-api";
import { LoadingSkeleton } from "components/loading";
import SearchBar from "components/SearchBar";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const keys = ["name", "brand"];
  const handleSearch = (product) => {
    return product.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(searchText))
    );
  };

  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const filterPosts = (product, query) => {
    if (!query) {
      return product;
    }

    return product.filter((post) => {
      const postName = post.name.toLowerCase();
      return postName.includes(query);
    });
  };
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredPosts = filterPosts(product, searchQuery);

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

  return (
    <>
      <section className="text-gray-600 body-font">
        <SearchBar handleSearch={handleSearch} setSearchText={setSearchText} />
        <div className="container px-5 py-24 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 -m-4">
            {loading && (
              <Fragment>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </Fragment>
            )}
            {!loading &&
              filteredPosts.length > 0 &&
              filteredPosts.map((item) => (
                <Fragment key={item.id}>
                  <div className="w-full mt-2 mx-1 bg-primary-gradient shadow-md rounded-lg hover:shadow-lg transition-all ease-in-out duration-200 ">
                    <div
                      className="block relative w-full h-[250px] rounded-xl overflow-hidden cursor-pointer shadow-sm"
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        localStorage.setItem(
                          "productDetail",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      <img
                        alt="thumbnail"
                        className="object-cover object-center block w-full h-full hover:scale-125 transition-all ease-out duration-200"
                        src={item.thumbnail}
                      />
                    </div>
                    <div className="mt-4 px-4 py-4 ">
                      <div className="flex justify-between items-center">
                        
                        <span className="text-gray-500 text-xs tracking-widest title-font mb-1">
                          date:{" "}
                          {new Date(item.updatedDate).toLocaleDateString(
                            "vi-VI"
                          )}
                        </span>
                      </div>
                      <h2
                        className="text-gray-900 title-font text-lg font-medium cursor-pointer"
                        onClick={() => {
                          navigate(`/product/${item.id}`);
                          localStorage.setItem(
                            "productDetail",
                            JSON.stringify(item)
                          );
                        }}
                      >
                        {item.name.length > 30
                          ? item.name.slice(0, 30) + "..."
                          : item.name}
                      </h2>
                      <div className="flex justify-between items-center">
                        <p className="mt-1">
                          {item.price.toLocaleString()} VND
                        </p>
                        <button
                          onClick={() => {
                            navigate(`/product/${item.id}`);
                            localStorage.setItem(
                              "productDetail",
                              JSON.stringify(item)
                            );
                          }}
                          className="py-2 px-3 bg-gray-900 rounded-md text-white text-sm flex justify-center items-center gap-1 hover:bg-white hover:text-gray-900 transition-all ease-linear duration-150 hover:border hover:border-gray-900 border border-transparent font-bold shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-4 h-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                          Add to cart
                        </button>
                      </div>
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

export default HomePage;
