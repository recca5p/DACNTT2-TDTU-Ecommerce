const numberWithCommas = (number) => {
	if(Number.isNaN(number)) return number;
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export {
	numberWithCommas
}