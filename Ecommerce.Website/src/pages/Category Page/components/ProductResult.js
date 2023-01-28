import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from 'actions';
import { Link } from 'react-router-dom';
import { numberWithCommas } from 'utils/convert';

const ProductResult = ({ slug }) => {
	const dispatch = useDispatch();

	const loaded = useSelector(({ product }) => product.loaded);
	const products = useSelector(({ product }) => product.list);

	useEffect(() => {
		if(slug) {
			dispatch(Actions.getProductsList(`?c=${slug}`));
		}
		return () => {
			dispatch(Actions.clearProductState());
		}
	}, [dispatch, slug]);

  return (
	<div>
		{loaded ? (
			Array.isArray(products) && (
			<>
				<div className='font-semibold'>{products?.length} Result(s)</div>
				<div className='border-b border-[#ccc] mb-4 mt-2'></div>
				<div className='grid grid-cols-4 gap-4'>
					{products.map((item, index) => (
						<div className="border p-2 max-w-[240px] mx-auto" key={index}>
							<Link to={`/product/${item.slug}`} >
								<div className="w-full rounded-lg bg-slate-100">
									<img
										src={`${process.env.REACT_APP_API_URL}/image/${item.thumbnail}`} alt="product"
										className="block w-full h-full object-contain aspect-square
										hover:scale-110 transition-all ease-out duration-200"
									/>
								</div>
							</Link>
							<Link 
								className='block my-2 hover:text-indigo-700 hover:underline line-clamp-3 font-semibold text-gray-700 h-[74px]'
								to={`/product/${item.slug}`} 
							>{item.name}</Link>
							<div className='font-bold text-xl'>{numberWithCommas(item.price)} VND</div>
						</div>
					))}
				</div>
			</>
			)
		) : (
			<div>Loading</div>
		)}
	</div>
  )
}

export default ProductResult;