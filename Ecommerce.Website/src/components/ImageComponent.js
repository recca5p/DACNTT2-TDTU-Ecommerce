import React, { useEffect, useState } from 'react'
import { getImageAPI } from 'api';

const ImgComponent = (props) => {
  const {id, alt = "image", className = ""} = props;
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
	const getImage = async (id) => {
		try {
		const result = await getImageAPI(id);

		if(result?.data?.image?.data) {
			setImgSrc('data:image/jpeg;base64,' + result.data.image.data);
		}
		} catch(error) {
			console.log("Get image error!");
		}
	};

	if(id && !imgSrc) {
		getImage(id)
	}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
	<img src={imgSrc} alt={alt} className={className} />
  )
}

export default ImgComponent;