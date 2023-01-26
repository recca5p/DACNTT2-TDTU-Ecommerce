import React, { useEffect } from "react";
import * as Actions from 'actions';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductImages, ProductInfo } from "./components";
import { CategoryHeader } from "components";


const ProductDetailPage = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const { slug } = params;
  
	const loaded = useSelector(({ product }) => product.loaded);
	const product = useSelector(({ product }) => product.data);

	useEffect(() => {
		dispatch(Actions.getSingleProduct(slug));

		return () => {
			dispatch(Actions.clearProductState());
		}
	}, [dispatch, slug]);
  
	if (!loaded|| !product) return null;

	return (
		<React.Fragment>
			<CategoryHeader currentCate={product.category?.slug} />
			<div className="flex">
				<ProductImages />
				<ProductInfo />
			</div>
		</React.Fragment>
	);
}

export default ProductDetailPage;