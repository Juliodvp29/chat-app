const d = document;
const paswrdField = d.querySelector(".form input[type='password']");
const toggleBtn = d.querySelector(".form .field  i");

toggleBtn.onclick = () => {
    paswrdField.type = paswrdField.type === "password" ? "text" : "password";
    toggleBtn.classList.toggle("active");
}

// toggleBtn.addEventListener("click", () => {
//   console.log("clicked");
//   if (paswrdField.type == "password") {
//     toggleBtn.classList.add("active");
//   } else {
//     paswrdField.type = "password";
//     toggleBtn.classList.remove("active");
//   }
// });

