const SECRET_HASH = "";

const pinInput = document.getElementById('pin-input');
const submitBtn = document.getElementById('submit-btn');
const loginScreen = document.getElementById('login-screen');
const protectedContent = document.getElementById('protected-content');
const errorMsg = document.getElementById('error-msg');

async function hashString(text) {
	const msgUint8 = new TextEncoder().encode(text);
	
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer);
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}


submitBtn.addEventListener('click', async function() {
	const eingabe = pinInput.value;
	
	if (eingabe.length !== 3) {
		errorMsg.textContent = "please enter exactly 3 numbers!";
		errorMsg.classList.remove('hidden');
		return;
	}
	
	const eingabeHash = await hashString(eingabe);
	
	if (eingabeHash === SECRET_HASH) {
		loginScreen.classList.add('hidden');
		protectedContent.classList.remove('hidden');
	} else {
		errorMsg.textContent = "wrong Code!";
		errorMsg.classList.remove('hidden');
		pinInput.value = '';
	}
});
