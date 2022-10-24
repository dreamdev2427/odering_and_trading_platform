
function validations_validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function getParameterByName(name) {
	const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function isEthereumAddressValid(address) {
	if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
		// check if it has the basic requirements of an address
		return false;
	} if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
		// If it's all small caps or all all caps, return true
		return true;
	}
	// Otherwise check each case
	return isChecksumAddress(address);
}

function isChecksumAddress(address) {
	// Check each case
	/* address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    } */
	return true;
}
