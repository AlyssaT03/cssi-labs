console.log("in viewMessages.js");

numberOfAttempts = 0;
maxAttempts = 3;

//Retrieve the messages from firebase
function getMessages(id) {
    //console.log(firebase);
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        //console.log(messages);
        findMessage(messages, id);
    })
}

//Begin data validation
function findMessage(messages, id) {
    console.log("findMessage");
    //Grab the user's entry for the password.
    const passcodeAttempt = document.querySelector("#passcode" + id).value;

    //Check to see if there is a message object with a matching password.
    foundAMessage = false;
    for (message in messages) {
        const messageData = messages[message];
        var password = encrypt(passcodeAttempt);
        console.log(password);
        //If we find a matching message, begin rendering message data
        if (messageData.password.toString() == password) {
            console.log("Found a matching message.");
            renderMessageData(messageData.message, id);
            foundAMessage = true;
        }
    }

    //Check if they have reached their maximum number of wrong attempts.
    //If they have, disable buttons and begin a timeout.
    if (!foundAMessage) {
        if (numberOfAttempts == maxAttempts) {
            alert("You have made too many attempts.");
            disableButtons();
        } else {
            alert("Did not find a message. Please try again.");
        }
        numberOfAttempts++;
    }
}

//Show the corresponding message.
function renderMessageData(messageContent, id) {
    //Hide passcode box
    const passcodeInput = document.querySelector("#passcodeInput" + id);
    passcodeInput.style.display = 'none';
    //Display matching message as HTML
    const messageDiv = document.querySelector("#message" + id)
    messageDiv.innerHTML = messageContent;
}

//Disable the buttons after a certain number of attempts.
//Set a timer until the user is able to use the button again.
function disableButtons(){
    submitButton1 = document.getElementById("viewMsg1");
    submitButton2 = document.getElementById("viewMsg2");

    submitButton1.disabled = true;
    submitButton2.disabled = true;

    setTimeout(function(){
        submitButton1.disabled = false;
        submitButton2.disabled = false;
    },
    2500);
}

function encrypt(plaintext)
{
    const hash = new Hashes.MD5().hex(plaintext);
    return hash;
}