$(document).foundation();

// page 1 astro pic of the day
const body = $("body");
const mainPage = $("#start-page");
const launchBtn = $("#launch-btn");
const modalForm = $("#modal-form");
const formSubmitBtn = $("#form-submit");
const userInfo = JSON.parse(localStorage.getItem("userInfo"));

let astroPicTodayApi = 'https://api.nasa.gov/planetary/apod?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'
let earthPic = 'https://api.nasa.gov/EPIC/api/natural?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'

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


// page 1 launch button
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

formSubmitBtn.click( () => {
  saveUserForm();
})

// page 1 modal form
function saveUserForm(e) {
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


// PAGE 2 //
  // PAGE 2 //
// PAGE 2 //

// weather render api
function renderWeather() {
  let wRequest = "https://api.openweathermap.org/data/2.5/weather?zip=20136,US&units=imperial&appid=59948208350e6af8ced51673faaaf707"
  let wLocal = document.getElementById("weather-today")
  let t = document.getElementById("temperature")
  let pic = document.getElementById("weather-pic")
  let img = document.createElement("img")
  let f = document.getElementById("forecast")
  fetch(wRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log (data)
      // <---- Trying to create a function to pull temp and test for tell user if they should wear a jacket. ---->
      // let coat = function cCheck() {
      //   if (data.temp < 70) {
      //     f.innerHTML = "but where a jacket!"
      //   } else {
      //     f.innerHTML = "and no jacket is needed!"
      //   }
      img.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      wLocal.innerHTML = "Current Weather in " + data.name
      pic.append(img)
      t.innerHTML = "Temperature: " + data.main.temp.toFixed()
      if (data.weather[0].id = 800) { //works
        f.innerHTML = "The forecast is calling for " + data.weather[0].main.toLowerCase() + " skies. It should be a great evening for star gazing!" //+ coat
      } else if (data.weather[0].id = 801) { // function needs testing
        f.innerHTML = "The forecast is calling for " + data.weather[0].description.toLowerCase() + ", but it should still be a great evening for star gazing!"
      } else {
        f.innerHTML = "The forecast looks bad. Today might not be the best day for stargazing!"
      }
    })
}

renderWeather()



// mars rover picture api
const marsRoverDiv = $("#mars");
const birthDate = userInfo.bday;
const nextBtn = $("#marsRoverNextButton");
const yearBtn = $("#marsRoverYearButton");
const displayedPicture = $("#roverPicture");

const greetingBlurb = $("#greetingBlurb");
let apiYear = 2016;


// I couldnt get format() to give me what i needed to search this api, so i had to take the stored birthday,
// split it into an array at the hyphens, and construct a new string with the right format and a set year.
function renderRoverPic () {
  greetingBlurb.text(`On your birthday in ${apiYear}, this was where the Curiosity rover was hard at work.`);
  
  const urlRoot = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5";
  const userBday = userInfo.bday.split("-");
  const apiBdayVar = userBday[1] + "-" + userBday[2];
  const urlDate = `&earth_date=${apiYear}-${apiBdayVar}`;
  const apiUrl = urlRoot + urlDate;
  
  let photoArray = [];
  let index = 0;
  fetch(apiUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        let img1 = data.photos[0].img_src;
        let date1 = moment(data.photos[0].earth_date).format("MMMM Do YYYY");
        displayedPicture.attr("src", img1);
        $("#roverDateTaken").text(`Date: ${date1}`);
        $("#roverName").text(`Taken on ${data.photos[0].rover.name}'s ${data.photos[0].camera.full_name}, or ${data.photos[0].camera.name}.`);
        $("#roverId").text(`ID# ${data.photos[0].id}. Image ${index + 1} of ${data.photos.length}.`);
        yearBtn.removeClass("hide");
        nextBtn.removeClass("hide");

        for(i=0; i < data.photos.length; i++) {
          photoArray.push(data.photos[i]);
        }

        // next image button
        nextBtn.click(function() {

          if (index + 1 >= data.photos.length) {
            index = 0;
            displayedPicture.attr("src", img1);
            $("#roverDateTaken").text(`Date: ${date1}`);
            $("#roverName").text(`Taken on ${data.photos[0].rover.name}'s ${data.photos[0].camera.full_name}, or ${data.photos[0].camera.name}.`);
            $("#roverId").text(`ID# ${data.photos[0].id}. Image ${index + 1} of ${data.photos.length}.`);

          } else if (index < data.photos.length) {
            index = index + 1;
            let newImg = photoArray[index].img_src;
            let newDate = moment(photoArray[index].earth_date).format("MMMM Do YYYY");
            let newId = photoArray[index].id;
            let newRovName = data.photos[index].rover.name;
            let newCamFullName = data.photos[index].camera.full_name;
            let newCamAbrName = data.photos[index].camera.name;
            $("#roverPicture").attr("src", newImg);
            $("#roverDateTaken").text(`Date: ${newDate}`);
            $("#roverName").text(`Taken on ${newRovName}'s ${newCamFullName}, or ${newCamAbrName}.`);
            $("#roverId").text(`ID# ${newId}. Image ${index + 1} of ${data.photos.length}.`);
            
          }

        })
        
        
      });
      
    }
    
// next year button
function newYear() {

  if (apiYear >= 2016 && apiYear < 2020) {
    apiYear++;
    renderRoverPic();
    
  } else if (apiYear == 2020) {
    apiYear = 2016;
    renderRoverPic();
  } 

  // if (!response.status === 200) {
  //   greetingBlurb.text("There are no photos to display on this day!");
  // }
}

renderRoverPic();






// function renderMoonPhase() {
//   let URL = 'https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=o9cDoa4w5lfAuyUrzq10seTWFAEgyEPiL9BNPqZ7';
//   document.getElementById("earth").src = URL;
// }

// renderMoonPhase();

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


document.getElementById("clear-form").addEventListener("click", function () {
  localStorage.clear();
  renderInfo();
});

// home-button: if i am done with my info and want to view the APOD, button to return to home screen

// return to form: if i am done with my info and want to view someone else's info, button to return to form

