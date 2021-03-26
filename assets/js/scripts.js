const mainPage = $("#start-page");
const launchBtn = $("#launch-btn");
const modalForm = $("#modal-form");
const formSubmitBtn = $("#form-submit");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));


let astroPicTodayApi = 'https://api.nasa.gov/planetary/apod?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'

const body = $("body");

  
const fetchApi = function(url) {
  fetch(url)
      .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);   
        });
      }



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

let saveUserForm = function(e) {
  mainPage.addClass("hide");
  if ($("#firstName").val() == "" || $("#dob").val() == "" || $("#zipCode").val() == "") {
    confirm("Error: Please make sure to fill out all fields!");
    


  } else {
    const userInfo = {
      firstName: $("#firstName").val(),
      bday: $("#dob").val(),
      zip: $("#zipCode").val(),
      favPlanet: $("#favPlanet").val()
    };
  
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  
}

let launchDashboard = function() {
  $("#overlay").addClass("hide");
}