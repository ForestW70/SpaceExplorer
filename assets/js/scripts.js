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

  startPageInfo.addClass("hide");
}

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

//renderMoonPhase {
  //astorology api: https://rapidapi.com/astronomyapi-astronomyapi-default/api/astronomy?endpoint=apiendpoint_d15e47b7-f9e2-4ff8-82d0-c694a4bdfec3 
  //once date of birth is retrieved from storage, add value to API call, fetch moon phase information and picture
  //append to picture to class-small-6[0]
  // fetch(API)
  //   .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //     });
// }

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


//
  $("#overlay").addClass("hide");
}
