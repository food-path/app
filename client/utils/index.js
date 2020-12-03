export const priceToText = (price) => {
	if (+price <= 25) return "$";
	else if (+price <= 50) return "$$";
	else if (+price <= 75) return "$$$";
	else return "$$$$";
};
