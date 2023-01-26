import React, { useState } from 'react'
import { numberWithCommas } from "utils/convert";
import CustomButton from "components/CustomButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentIcon from '@mui/icons-material/Payment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import StarRating from 'components/StarRating';

function ProductInfo() {
	const [quantity, setQuantity] = useState(1);

	const product = useSelector(({ product }) => product.data);

	return (
		<div className="flex-1">
			<div className="border-b border-[#ccc] pb-4">
				<div className="font-bold text-2xl mb-2">{product.name}</div>
				<div className="font-semibold text-indigo-700 flex items-center my-1">
					<VisibilityIcon className="mr-2"/> 100 view(s)
				</div>
				<div className="font-semibold text-orange-600 flex items-center my-1">
					<VerifiedIcon className="mr-2"/> 50 purchase(s)
				</div>
				<div className='flex items-center mt-2 font-semibold'>
					<StarRating star={5} size={20}/>
					<div className='text-slate-500 ml-2'>{numberWithCommas(1322)} rating(s)</div>
				</div>
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Condition :</div>
				<div className="flex-1 ml-2 font-semibold">{product.condition}</div>
			</div>
			<div className="py-2 flex items-center">
				<div className="font-serif w-[100px] text-right text-gray-600">Quantity :</div>
				<div className="mx-2">
					<input
						className="border border-[#767676] focus:border-indigo-700 rounded-lg text-center pl-[10px] w-[60px]"
						type="number" value={quantity} min={1} max={product.quantity}
						onChange={(e) => setQuantity(e.target.value)}
					/>
				</div>
				<div className="ml-6 flex items-center text-xs">
					<LocalMallIcon className="mr-[2px] text-indigo-700" /> {product.quantity > 10 ? `More than 10 available` : `Only ${product.quantity} left`}
				</div>
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Price :</div>
				<div className="flex-1 ml-2 flex">
					<div className="w-[300px]">
						<div className="font-bold text-2xl">{numberWithCommas(product.price)} VND</div>
					</div>
					<div className="flex-1">
						<CustomButton className="block mb-3 rounded-full w-[200px]">
							<div className="inline-flex items-center">
								<PaymentIcon className="w-[18px] h-[18px] mr-1" /> Buy It Now
							</div>
						</CustomButton>
						<CustomButton className="block mb-3 rounded-full w-[200px] bg-orange-600 hover:bg-orange-700">
							<div className="inline-flex items-center">
								<AddShoppingCartIcon className="w-[18px] h-[18px] mr-1" /> Add To Cart
							</div>
						</CustomButton>
						<CustomButton className="block mb-3 rounded-full w-[200px] bg-white border border-indigo-700 !text-indigo-700 hover:text-indigo-700 hover:bg-slate-200">
							<div className="inline-flex items-center">
								<FavoriteBorderIcon className="w-[18px] h-[18px] mr-1" /> Add To Watchlist
							</div>
						</CustomButton>
					</div>
				</div>
			</div>
			<div className="border-b border-[#ccc] my-2" />
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Brand :</div>
				<div className="flex-1 ml-2 font-semibold">{product.brand?.name}</div>
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Description :</div>
				<div className="font-serif flex-1 ml-2 text-justify" dangerouslySetInnerHTML={{ __html: product.description }} />
			</div>
		</div>
	)
}

export default ProductInfo