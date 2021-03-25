const mainPage = $("#start-page");
const launchBtn = $("#launch-btn");
const modalForm = $("#modal-form");
const formSubmitBtn = $("#form-submit");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));


let astroPicTodayApi = 'https://api.nasa.gov/planetary/apod?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'

const body = $("body");

  
fetch(astroPicTodayApi)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);   
        let imgUrl = data.hdurl;
        body.append(`<img src='${imgUrl}'></img>`);
      });
  

// here is a simple fetch for the POTD image. I needed to get a valid key to use the api so that is the purpose of the long string at the end of the url. 
// I imagine that all the apis will need this so if it returns error invalid key, try copy and pasting that part into new url.
// thankfully the api automatically returns todays picture, and we dont need to tie it to momentjs or anything.
// hdurl is the link to the pic url, but there are other perameters we can display that you can look through in the console or through documentation.
// in the future, we might want to look into makeing the fetch a function that we can call with the APi's url as an argument when we need it.

function renderInfo() {
  let today = moment()
  let info = document.getElementById("description")
  if (info.style.display === "none") {
    fetch(astroPicTodayApi)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.title);
        console.log(data.explanation);
        let head = data.title
        let desc = data.explanation;
        info.children[0].innerHTML = today.format("dddd, MMMM Do YYYY")
        info.children[1].innerHTML = "Title: " + head
        info.children[2].innerHTML = desc
      });
    info.style.display = "block";
  } else {
    info.style.display = "none";
  }
}


launchBtn.click( (e) => {
  e.preventDefault();

  if (!userInfo) {
    launchBtn.addClass("hide");
    mainPage.addClass("hide");
    modalForm.removeClass("hide");
    console.log("hello");
  } else {
    launchDashboard();
  }
  

})

formSubmitBtn.click( (e) => {
  saveUserForm();
})

let saveUserForm = function() {

  const userInfo = {
    firstName: $("#firstName").val(),
    bday: $("#dob").val(),
    zip: $("#zipCode").val(),
    favPlanet: $("#favPlanet").val()
  };

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

let launchDashboard = function() {
  startPageInfo.addClass("hide");
}