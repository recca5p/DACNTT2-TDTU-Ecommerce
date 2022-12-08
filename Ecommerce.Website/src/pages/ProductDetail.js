import React from "react";
import { getProductAPI } from "../api/product-api";

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      product: [],
    };
  }

  async componentDidMount() {
    try {
      let productId = localStorage.getItem("ProductId");
      const result = await getProductAPI(`/${productId}`);
      if (result.data) {
        this.setState({
          isLoaded: true,
          product: result.data,
        });
      }
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoaded, product } = this.state;

    return (
      <div class="product_image_area">
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <div class="row s_product_inner">
            <div class="col-lg-6">
              <div class="owl-carousel owl-theme s_Product_carousel">
                <div class="single-prd-item">
                  <img class="img-fluid" src={product.thumbnail} alt="" />
                </div>
              </div>
            </div>
            <div class="col-lg-5 offset-lg-1">
              <div class="s_product_text">
                <h3>{product.name}</h3>
                <h2>${product.price}</h2>
                <ul class="list">
                  <li>
                    <a class="active" href="#">
                      <span>Category</span> : Household
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span>Availibility</span> : In Stock
                    </a>
                  </li>
                </ul>
                <p>{product.category}</p>
                <div
                  class="product_count"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <label>Quantity:</label>
                  <input
                    type="text"
                    name="qty"
                    id="sst"
                    size="2"
                    value={10}
                    title="Quantity:"
                    class="input-text qty"
                    style={{ height: "30px" }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <button
                      class="increase items-count"
                      style={{ position: "inherit" }}
                      type="button"
                    ></button>
                  </div>
                </div>
                <a class="button primary-btn" href="#">
                  Add to Cart
                </a>

                <div class="card_area d-flex align-items-center">
                  <button
                    class="icon_btn"
                    style={{ cursor: "pointer", border: "none" }}
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
