import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { numberWithCommas } from "utils/convert";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Actions from "actions";

const CartPage = () => {
  const dispatch = useDispatch();

  const [cartInfo, setCartInfo] = useState({
	quantity: 0,
	total: 0
  });
  const cartData = useSelector(({ cart }) => cart.data);

  const handleRemove = (id) => {
    dispatch(Actions.removeFromCart(id));
  };

  useEffect(() => {
	if(cartData?.length > 0) {
	  let total = 0
	  let quantity = 0

	  cartData.map(item => {
		total += item.price
		quantity += item.quantity
		return null;
	  })

	  setCartInfo({
		quantity,
		total
	  })
	}
  }, [cartData])

  if (cartData.length === 0)
    return (
      <div>
        <div className="font-bold text-4xl">Shopping cart</div>
        <div className="text-center pt-[96px] pb-[152px]">
          <div className="text-2xl font-medium mb-6">
            You don't have any items in your cart. Let's get shopping!
          </div>
          <Button
            className="
				bg-indigo-700 hover:bg-indigo-800 font-bold w-[270px]
				text-xl normal-case text-white my-[12px] 
				py-3 rounded-full disabled:bg-slate-300 mb-4"
			component={Link} to="/"
          >
            Start shopping
          </Button>
        </div>
      </div>
    );

  return (
    <div>
      <div className="font-bold text-4xl">Shopping cart</div>
      <div className="flex mt-8 space-x-4">
        <div className="flex-1">
          {cartData.map((item) => (
            <div className="border p-4 mb-4" key={item.id}>
              <div className="flex space-x-4">
                <img
                  src={item.thumbnail}
                  alt="product-img"
                  width={140}
                  height={140}
                />
                <Link
                  className="flex-1 font-semibold text-xl hover:underline"
                  to={`/product/${item.id}`}
                >
                  {item.name}
                </Link>
                <div className="min-w-[160px] pr-8 text-right text-xl">
                  Qty {item.quantity}
                </div>
                <div className="min-w-[160px] pr-2 text-right text-xl font-medium">
                  {numberWithCommas(item.price)} VNĐ
                </div>
              </div>
              <div
                className="text-indigo-700 text-right font-semibold cursor-pointer hover:underline"
                onClick={() => handleRemove(item.id)}
              >
                <DeleteIcon />
                Remove
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:max-w-[400px] border p-4">
          <Button
            className="
				bg-indigo-700 hover:bg-indigo-800 font-bold 
				text-xl normal-case text-white my-[12px] 
				py-3 rounded-full disabled:bg-slate-300 mb-4"
            fullWidth
          >
            Go to checkout
          </Button>
          <div className="flex justify-between text-lg">
            <div>Items ({cartInfo.quantity})</div>
            <div>US ${cartInfo.total}</div>
          </div>
          <div className="flex justify-between text-lg">
            <div>Shipping</div>
            <div>US $5</div>
          </div>
          <div className="flex justify-between text-lg">
            <div>Import charges</div>
            <div>US $5</div>
          </div>
          <div className="flex justify-between text-2xl font-semibold mt-8">
            <div>Subtotal</div>
            <div>US ${cartInfo.total+10}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
