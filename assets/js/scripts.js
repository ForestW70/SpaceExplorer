$(document).foundation();

const mainPage = $("#start-page");
const launchBtn = $("#launch-btn");
const modalForm = $("#modal-form");
const formSubmitBtn = $("#form-submit");
// const info = $("#description");
// let today = moment();

const userInfo = JSON.parse(localStorage.getItem("userInfo"));


let astroPicTodayApi = 'https://api.nasa.gov/planetary/apod?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'
let earthPic = 'https://api.nasa.gov/EPIC/api/natural?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'

const body = $("body");

  
// fetch(astroPicTodayApi)
//     .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         let img = data.hdurl;
//         mainPage.append(`<img class='astro-pix' src='${img}'></img>`);
//         renderInfo();
//       });


// function renderInfo() {
//   if (info.style.display == "none") {
//     let head = data.title;
//     let desc = data.explanation;
//     info.children[0].innerHTML = today.format("dddd, MMMM Do YYYY");
//     info.children[1].innerHTML = "Title: " + head;
//     info.children[2].innerHTML = desc;
//     info.style.display = "block";
//   } else {
//     info.style.display = "none";
//   }
// }

function renderInfo() {
  let today = moment()
  let info = document.getElementById("description")
  if (info.style.display === "none") {
    fetch(astroPicTodayApi)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let img = data.hdurl;
        let head = data.title;
        let desc = data.explanation;
        console.log(img);
        $("#start-page").append(`<img class='astro-pix' src='${img}'></img>`)
        info.children[0].innerHTML = today.format("dddd, MMMM Do YYYY");
        info.children[1].innerHTML = "Title: " + head;
        info.children[2].innerHTML = desc;
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

function launchDashboard() {
  window.location.href = "./dashboard.html";
}

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
    launchDashboard();
}
}
$("h1").append(userInfo.firstName);
console.log(userInfo.firstName)


//when form is submitted with information, I want to use that info to display API information on dashboard

//get localStorage "userInfo"


//renderName {
  //once first name is retrieved from storage, display on to h1 - "Welcome to Space " + ...."
//}

//renderWeather {
  //weather api: api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
  //once zip code value is retrieved from storage, push value to API call, fetch todays weather
  //append current temperature to class=weather on dashboard
            ///----will need to hard code US country code
  // fetch(API)
  //   .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //     });
// }
//}

//renderRover {
  //mars rover api: check Google Doc for specific API info 
  //once date of birth is retrieved from storage, add value to API call, fetch historical photo
  //append to picture to class-small-6[0]
  // fetch(API)
  //   .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //     });
// }



function renderMoonPhase() {
  let URL = 'https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=o9cDoa4w5lfAuyUrzq10seTWFAEgyEPiL9BNPqZ7';
  document.getElementById("earth").src = URL;
}

renderMoonPhase();

//renderPlanet {
  //planet api: https://rapidapi.com/astronomyapi-astronomyapi-default/api/astronomy?endpoint=apiendpoint_d15e47b7-f9e2-4ff8-82d0-c694a4bdfec3 
  //once planet is retrieved from storage, add value to API call, fetch information
  //append info to class-small-6[1]
  //  fetch(API)
  //   .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //     });
// }

//renderInfo {
  //function to trigger all the functions at once ---- (check for significant info delay from various API calls) 
//}

// home-button: if i am done with my info and want to view the APOD, button to return to home screen

// return to form: if i am done with my info and want to view someone else's info, button to return to form
