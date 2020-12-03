export const priceToText = (price) => {
	if (+price <= 25) return "$";
	else if (+price <= 50) return "$$";
	else if (+price <= 75) return "$$$";
	else return "$$$$";
};



//function used to convert military time to standard time; used in Single Business Component 
export function convertTime(time) {
	let numValue = Number(time) / 100;
	let endDigits = '00'
	let AmOrPm; 
	if (!Number.isInteger(numValue)){
		let timeArr = String(numValue).split('.') 
		numValue = Number(timeArr[0])
		endDigits = timeArr[1].concat('0')
	}
	
	if (numValue === 24){
	  numValue = 12
	  AmOrPm = 'am'
	}else if (numValue >= 12){
	  AmOrPm = 'pm'
	}else{
	  AmOrPm = 'am'
	}
  
	if (endDigits.length > 2){
	  endDigits = endDigits.slice(0,2)
	}
	let finalTime = AmOrPm === "pm" && numValue !== 12 ? `${String(numValue - 12)}:${endDigits} ${AmOrPm}`: `${String(numValue)}:${endDigits} ${AmOrPm}`;
	return finalTime;
  }