function add(...numbers) {
	let value = 0;
	for (var i = 0; i < numbers.length; i++) {
		value += numbers[i];
	}
	return value;
}

function subtract(...numbers) {
	let value = numbers[0];
	for (var i = 1; i < numbers.length; i++) {
		value -= numbers[i];
	}
	return value;
}

function multiply(...numbers) {
	let value = numbers[0];
	for (var i = 1; i < numbers.length; i++) {
		value *= numbers[i];
	}
	return value;
}

function divide(...numbers) {
	let value = numbers[0];
	for (var i = 1; i < numbers.length; i++) {
		value /= numbers[i];
	}
	return value;
}