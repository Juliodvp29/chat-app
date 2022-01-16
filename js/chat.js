const d = document;
const form = d.querySelector(".typing-area");
const sendBtn = form.querySelector("button");
const inputField = form.querySelector(".input-field");
const chatBox = d.querySelector(".chat-box");
chatBox.onclick = (e) => {
    console.log('xd');
}

inputField.onkeyup = (e) => {
  console.log(e.keyCode);
};

form.onsubmit = (e) => {
  e.preventDefault();
};

sendBtn.onclick = () => {
  let xhr = new XMLHttpRequest(); // create a new request object
  xhr.open("POST", "./server/insert_chat.php", true); // open the request
  xhr.onload = () => {
    // when the request is loaded, do something
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        inputField.value = ""; //once message inserted into database then leave blank the the input field
      }
    } //2:17:43
  }
  //we have to send the form data to the server
  let formData = new FormData(form);
  xhr.send(formData); // send the request
};

setInterval(() => {
  let xhr = new XMLHttpRequest(); // create a new request object
  xhr.open("POST", "./server/get_chat.php", true); // open the request
  xhr.onload = () => {
    // when the request is loaded, do something
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        chatBox.innerHTML = data;
        if(!chatBox.classList.contains("active")){
            scrollToBottom();
          }
      }
    }
  }
  let formData = new FormData(form);
  xhr.send(formData); // send the request
}, 500); // this function will run frequently after 500ms

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  