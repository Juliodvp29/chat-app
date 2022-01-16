const d = document;
const searchBar = d.querySelector(".users .search input");
const searchBtn = d.querySelector(".users .search button");
const userList = d.querySelector(".users .users-list");

searchBtn.onclick = () => {
    searchBar.classList.toggle("active");
        searchBar.focus();
        searchBtn.classList.toggle("active");
        searchBar.value = "";
}

searchBar.onkeyup = () => {
    let searchTerm = searchBar.value;

    if(searchTerm != ""){
        searchBar.classList.add("active");
    }else{
        searchBar.classList.remove("active");
    }

    let xhr = new XMLHttpRequest(); // create a new request object
    xhr.open("POST", "./server/search.php", true); // open the request
    xhr.onload = () => {// when the request is loaded, do something
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){    
            let data = xhr.response;
            //console.log(data);
            userList.innerHTML = data;
            }else{
               console.log("error");
            }
        }
    } 
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("searchTerm="+searchTerm); // send the request
}


//Dynamically add users to the list with ajax



setInterval(() => {

    let xhr = new XMLHttpRequest(); // create a new request object
    xhr.open("GET", "./server/users.php", true); // open the request
    xhr.onload = () => {// when the request is loaded, do something
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){    
            let data = xhr.response;
            //console.log(data);
             if(!searchBar.classList.contains("active")){ // aif active active not contains in search bar then add users
                 userList.innerHTML = data;
             }
            }else{
               console.log("error");
            }
        }
    } 

    xhr.send();
    
}, 500); // this function will run frequently after 500ms
