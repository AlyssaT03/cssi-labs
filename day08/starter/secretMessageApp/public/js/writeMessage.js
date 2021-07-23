console.log("Hi");
const characterLimit = 140;

function submitMessage(){
    console.log("submitMessage");
    const passcodeInput = document.querySelector('#passcode').value;
    const messageInput = document.querySelector('#message').value;

    const message = messageInput.toString();

    if(message.length > characterLimit){
        alert("Please create a message that is less than 140 characters");
    }
    else if(!isValidPassword(passcodeInput)){
        alert("Please submit a password with a capital letter and a number.");
    }
    else{
            encrypted = encrypt(passcodeInput);

            firebase.database().ref().push({
            password: encrypted,
            message: messageInput
        });
    }
    passcodeInput.innerHTML = "";
    messageInput.innerHTML = "";
};

function isValidPassword(password){
    checkCapital = /[A-Z]/;
    const hasCapitalLetter = checkCapital.test(password);
    console.log(`Has capital letter is ${hasCapitalLetter}`);

    checkNumbers = /\d/;
    const isNumeric = checkNumbers.test(password);
    console.log(`Has a number is ${isNumeric}`);

    return hasCapitalLetter & isNumeric;
}

function encrypt(plaintext)
{
    const hash = new Hashes.MD5().hex(plaintext);
    return hash;
}