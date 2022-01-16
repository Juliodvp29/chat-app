const form = d.querySelector(".login form");
const continueBtn = form.querySelector(".button input");
const errorText = form.querySelector(".error-txt");



continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // ajax request
    console.log("err: "+errorText);

    let xhr = new XMLHttpRequest(); // create a new request object
    xhr.open("POST", "./server/login.php", true); // open the request
    xhr.onload = () => {// when the request is loaded, do something
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){    
            let data = xhr.response;
            console.log(data);
                if(data ==  "success"){
                    // errorText.textContent = "";
                    // errorText.style.display = "none";
                    location.href = "user.php";
                }else{
                    errorText.textContent = data;      
                    errorText.style.display = "block";
                }
            }else{
                // error
               console.log("error");
            }
        }
    } 
    //we have to send the form data to the server
    let formData = new FormData(form);
    xhr.send(formData); // send the request
})