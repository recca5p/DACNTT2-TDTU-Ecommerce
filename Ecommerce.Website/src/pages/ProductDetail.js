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
      <div className="product_image_area">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <div className="row s_product_inner">
            <div className="col-lg-6">
              <div className="owl-carousel owl-theme s_Product_carousel">
                <div className="single-prd-item">
                  <img className="img-fluid" src={product.thumbnail} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="s_product_text">
                <h3>{product.name}</h3>
                <h2>${product.price}</h2>
                <ul className="list">
                  <li>
                    <a className="active" href="#">
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
                  className="product_count"
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
                    className="input-text qty"
                    style={{ height: "30px" }}
                  />
                  <div style={{ paddingLeft: "20px" }}>
                    <button
                      className="increase items-count"
                      style={{ position: "inherit" }}
                      type="button"
                    ></button>
                  </div>
                </div>
                <a className="button primary-btn" href="#">
                  Add to Cart
                </a>

                <div className="card_area d-flex align-items-center">
                  <button
                    className="icon_btn"
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
