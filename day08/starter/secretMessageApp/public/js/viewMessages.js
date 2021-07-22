console.log("in viewMessages.js");
numberOfAttempts = 0;
maxAttempts = 3;

function getMessages(id) {
    console.log(firebase);
    const messagesRef = firebase.database().ref();
    messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val();
        console.log(messages);
        validateMessages(messages, id);
    })
}

function validateMessages(messages, id) {
    //Grab the user's entry for the password.
    const passcodeAttempt = document.querySelector("#passcode" + id).value;

    //Check to see if there is a message object with a matching password.
    foundAMessage = false;
    for (message in messages) {
        const messageData = messages[message];

        //If we find a matching message, begin rendering message data
        if (messageData.password == passcodeAttempt) {
            console.log("Found a matching message.");
            renderMessageData(messageData.message, id);
            foundAMessage = true;
        }
    }

    //Check if they have reached their maximum number of attempts.
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

function renderMessageData(messageContent, id) {
    //Hide passcode box
    const passcodeInput = document.querySelector("#passcodeInput" + id);
    passcodeInput.style.display = 'none';
    //Display matching message as HTML
    const messageDiv = document.querySelector("#message" + id)
    messageDiv.innerHTML = messageContent;
}

function disableButtons(){
    submitButton1 = document.getElementById("viewMsg1");
    submitButton2 = document.getElementById("viewMsg2");

    submitButton1.disabled = true;
    submitButton2.disabled = true;

    setTimeout(function(){
        submitButton1.disabled = false;
        submitButton2.disabled = false;
    },
    5000);
}