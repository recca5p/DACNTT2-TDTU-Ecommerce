import React, { useState } from 'react'
import { numberWithCommas } from "utils/convert";
import CustomButton from "components/CustomButton";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PaymentIcon from '@mui/icons-material/Payment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useDispatch, useSelector } from 'react-redux';
import StarRating from 'components/StarRating';
import { postOrderAPI } from 'api';
import { useNavigate } from 'react-router-dom';
import * as Actions from 'actions';

function ProductInfo() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(false);

	const isLogedIn = useSelector(({ auth }) => auth.isLogedIn);
	const product = useSelector(({ product }) => product.data);
	const statistics = useSelector(({ product }) => product.statics);

	const handleQuickBuy = async () => {
		setLoading(true);

		try {
			const body = {
				products: [
					{
						id: product.id,
						name: product.name,
						slug: product.slug,
						price: product.price,
						quantity: quantity,
						thumbnail: product.thumbnail
					}
				]
			}
			
			const result = await postOrderAPI(body);

			if(result.data) {
				navigate(`/checkout/${result.data.id}`)
			}
		} catch(error) {
			console.log(error);
		}

		setLoading(false);
	};

	const handleAddToCart = () => {
		const newItem = { 
			id: product.id,
			name: product.name,
			slug: product.slug,
			price: product.price,
			quantity: quantity,
			thumbnail: product.thumbnail
		};
		dispatch(Actions.addToCart({
			data: newItem,
			isLogedIn
		}));
	};

	const countPurchase = (data) => {
		let result = 0;

		if(!Array.isArray(data)) return result;

		data.map(item => {
			result += item.quantity
			return item
		})
		return result
	}

	const countAvgRating = (data) => {
		let result = 0;
		if(!Array.isArray(data)) return result;
		const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
		return parseFloat(average(data.map(item => item.star)).toFixed(1));
	}

	return (
		<div className="flex-1">
			<div className="border-b border-[#ccc] pb-4">
				<div className="font-bold text-2xl mb-2">{product.name}</div>
				{statistics && (
					<>
					{Array.isArray(statistics.views) && statistics.views.length > 0 && (
						<div className="font-semibold text-indigo-700 flex items-center my-1">
							<VisibilityIcon className="mr-2"/> {statistics.views.length} view(s)
						</div>
					)}
					{Array.isArray(statistics.purchases) && statistics.purchases.length > 0 && (
						<div className="font-semibold text-orange-600 flex items-center my-1">
							<VerifiedIcon className="mr-2"/> {countPurchase(statistics.purchases)} purchase(s)
						</div>
					)}
					{Array.isArray(statistics.ratings) && statistics.ratings.length > 0 && (
						<div className='flex items-center mt-2 font-semibold'>
							<StarRating star={countAvgRating(statistics.ratings)} size={20}/>
							<div className='text-slate-500 ml-2'>
								{numberWithCommas(statistics.ratings.length)} rating(s)
							</div>
						</div>
					)}
					</>
				)}
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Condition :</div>
				<div className="flex-1 ml-2 font-semibold">{product.condition}</div>
			</div>
			<div className="py-2 flex items-center">
				<div className="font-serif w-[100px] text-right text-gray-600">Quantity :</div>
				{product.quantity ? (
					<>
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
					</>
				) : (
					<div className='mx-2 text-red-600 font-bold text-lg'>Out of stock</div>
				)}
			</div>
			<div className="py-2 flex">
				<div className="font-serif w-[100px] text-right text-gray-600">Price :</div>
				<div className="flex-1 ml-2 flex">
					<div className="w-[300px]">
						<div className="font-bold text-2xl">{numberWithCommas(product.price)} VND</div>
					</div>
					{product.quantity ? (
					<div className="flex-1">
						<CustomButton 
							className={`block mb-3 rounded-full w-[200px] disabled:bg-gray-300 ${loading ? 'cursor-wait' : ''}`} 
							onClick={() => handleQuickBuy()}
							disabled={loading}
						>
							<div className="inline-flex items-center">
								<PaymentIcon className="w-[18px] h-[18px] mr-1" /> Buy It Now
							</div>
						</CustomButton>
						<CustomButton 
							className={`block mb-3 rounded-full w-[200px] !bg-orange-600 hover:!bg-orange-700 disabled:bg-gray-300 ${loading ? 'cursor-wait' : ''}`}
							onClick={() => handleAddToCart()}
							disabled={loading}
						>
							<div className="inline-flex items-center">
								<AddShoppingCartIcon className="w-[18px] h-[18px] mr-1" /> Add To Cart
							</div>
						</CustomButton>
						{/* <CustomButton 
							className={`block mb-3 rounded-full w-[200px] bg-white border border-indigo-700 ${loading ? 'cursor-wait' : ''}
							!text-indigo-700 hover:text-indigo-700 hover:bg-slate-200 disabled:bg-gray-300 disabled:border-0 disabled:!text-white`}
							onClick={() => {}}
							disabled={loading}
						>
							<div className="inline-flex items-center">
								<FavoriteBorderIcon className="w-[18px] h-[18px] mr-1" /> Add To Watchlist
							</div>
						</CustomButton> */}
					</div>
					) : null}
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