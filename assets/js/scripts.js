$(document).foundation();

// page 1 astro pic of the day
const body = $("body");
const mainPage = $("#start-page");
const launchBtn = $("#launch-btn");
const modalForm = $("#modal-form");
const formSubmitBtn = $("#form-submit");

// const info = $("#description");
// let today = moment();

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

let astroPicTodayApi = 'https://api.nasa.gov/planetary/apod?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'
let earthPic = 'https://api.nasa.gov/EPIC/api/natural?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'

// function renderImage() {
// fetch(astroPicTodayApi)
//     .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         let img = data.hdurl;
//         mainPage.append(`<img class='astro-pix' src='${img}'></img>`);
//       });
// }

// renderImage()

// function renderInfo() {
//   let info = document.getElementById("description");
//   let today = moment();
//   fetch(astroPicTodayApi)
//     .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//           if (info.style.display == "none") {
//             let head = data.title;
//             let desc = data.explanation;
//             $("#desc-date").html(today.format("dddd, MMMM Do YYYY"));
//             $("#desc-header").html("Title: " + head);
//             $("#desc-body").html(desc);
//             info.style.display = "block";
//           } else {
//             info.style.display = "none";
//           }
//     });
//   }

// renderInfo()

// function renderInfo() {
//   let today = moment()
//   let info = document.getElementById("description")
//   if (info.style.display === "none") {
//     fetch(astroPicTodayApi)
//     .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         let img = data.hdurl;
//         let head = data.title;
//         let desc = data.explanation;
//         let test = $("#start-page").append(`<img class='astro-pix' src='${img}'></img>`)
//         console.log(img);
//         if (test) {
//           info.children[0].innerHTML = today.format("dddd, MMMM Do YYYY");
//           info.children[1].innerHTML = "Title: " + head;
//           info.children[2].innerHTML = desc;
//         }
//       });
//     info.style.display = "block";
//   } else {
//     info.style.display = "none";
//   }
// }


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


//when form is submitted with information, I want to use that info to display API information on dashboard

//get localStorage "userInfo"


//renderName {
  //once first name is retrieved from storage, display on to h1 - "Welcome to Space " + ...."
//}


// weather render api

function renderWeather() {
  let wRequest = "https://api.openweathermap.org/data/2.5/weather?zip=" + userInfo.zip + ",US&units=imperial&appid=59948208350e6af8ced51673faaaf707"
  let wLocal = document.getElementById("weather-today")
  let t = document.getElementById("temperature")
  let pic = document.getElementById("weather-pic")
  let f = document.getElementById("forecast")
  let img = document.createElement("img")
  
  fetch(wRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log (data)
      // localStorage.setItem("test", data.weather[0].icon)
      // let x = JSON.stringify(localStorage.getItem("test"))
      // console.log(x)
      wLocal.innerHTML = "Current Weather in " + data.name
      img.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      // pic.append(img)
      t.innerHTML = "Temperature: " + data.main.temp.toFixed() + "&degF"
      t.append(img)
      if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") { // nested if statement untested, regular if statement good
        if (data.main.temp >= 75) {
        f.innerHTML = "The forecast is currently " + data.weather[0].main.toLowerCase() + " skies. If it stays like this, it should be a great evening for star gazing, and no coat is needed tonight!"
      } else if (data.main.temp < 75) {
        f.innerHTML = "The forecast is currently " + data.weather[0].main.toLowerCase() + " skies. If it stays like this, it should be a great evening for star gazing, but be sure to wear a coat!"
      }else {
        f.innerHTML = "The forecast isn't optimal for star-gazing right now. Check back later to see if the skies look more clear!"
      }
      }
      if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") { // nested if statement untested, regular if statement good
        if (data.main.temp >= 75) {
        f.innerHTML = "The forecast is currently " + data.weather[0].description.toLowerCase() + ", but it should still be a great evening for star gazing, and no coat is needed tonight!"
      } else if (data.main.temp < 75){
        f.innerHTML = "The forecast is currently " + data.weather[0].description.toLowerCase() + ", but it should still be a great evening for star gazing, but be sure to wear a coat!"
      } else {
        f.innerHTML = "The forecast isn't optimal for star-gazing right now. Check back later to see if the skies look more clear!"
      }
      }
    })
}

renderWeather();


function renderMoonPhase() {
let mRequest = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + userInfo.zip + "?unitGroup=us&key=84QQ3LHG5UGSEKA2AMRQMQYNJ"
let mPic = document.getElementById("moon-pic")
let img = {
  one: document.createElement("img"),
  two: document.createElement("img"),
  three: document.createElement("img"),
  four: document.createElement("img"),
  five: document.createElement("img"),
  six: document.createElement("img"),
  seven: document.createElement("img"),
  eight: document.createElement("img")
}
let mInfo = document.getElementById("moon-info")
fetch(mRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log (data)
      img.one.src = "assets/images/newmoon.jpg"
      img.two.src = "assets/images/waxingcrescent.jpg"
      img.three.src = "assets/images/firstquarter.jpg"
      img.four.src = "assets/images/waxinggibbous.jpg"
      img.five.src = "assets/images/fullmoon.jpg"
      img.six.src = "assets/images/waninggibbous.jpg"
      img.seven.src = "assets/images/lastquarter.png"
      img.eight.src = "assets/images/waningcrescent.jpg"
      if (data.currentConditions.moonphase == 0) {
        mPic.append(img.one)
        mInfo.innerHTML = "Tonight the moon is in the New Moon phase. At new Moon, the Moon is lined up between the Earth and the Sun. We see the side of the Moon that is not being lit by the Sun (in other words, we see no Moon at all, because the brightness of the Sun outshines the dim Moon) When the Moon is exactly lined up with the Sun (as viewed from Earth), we experience an eclipse."
      } else if (data.currentConditions.moonphase > 0 && data.currentConditions.moonphase < 0.25) {
        mPic.append(img.two)
        mInfo.innerHTML = "Tonight the moon is in the Waxing Crescent phase. As the Moon moves eastward away from the Sun in the sky, we see a bit more of the sunlit side of the Moon each night. A few days after new Moon, we see a thin crescent in the western evening sky. The crescent Moon waxes, or appears to grow fatter, each night."
      } else if (data.currentConditions.moonphase == 0.25) {
        mPic.append(img.three)
        mInfo.innerHTML = "Tonight's moon is the First Quarter phase. When half of the Moon's disc is illuminated, we call it the first quarter Moon. This name comes from the fact that the Moon is now one-quarter of the way through the lunar month. From Earth, we are now looking at the sunlit side of the Moon from off to the side."
      } else if (data.currentConditions.moonphase > 0.25 && data.currentConditions.moonphase < 0.5) {
        mPic.append(img.four)
        mInfo.innerHTML = "Tonight the moon is in the Waxing Gibbous phase. The Moon continues to wax. Once more than half of the disc is illuminated, it has a shape we call gibbous. The gibbous Moon appears to grow fatter each night."
      } else if (data.currentConditions.moonphase == 0.5) {
        mPic.append(img.five)
        mInfo.innerHTML = "Tonight the moon is in the Full Moon phase. When we see the full sunlit face of the Moon, we call it a full Moon. It rises almost exactly as the Sun sets and sets just as the Sun rises the next day. The Moon has now completed one half of the lunar month."
      } else if (data.currentConditions.moonphase > 0.5 && data.currentConditions.moonphase < 0.75) {
        mPic.append(img.six)
        mInfo.innerHTML = "Tonight the moon is in the Waning Gibbous phase. During the second half of the lunar month, the Moon grows thinner each night. We call this waning. Its shape is still gibbous at this point, but grows a little thinner each night."
      } else if (data.currentConditions.moonphase == 0.75) {
        mPic.append(img.seven)
        mInfo.innerHTML = "Tonight the moon is in the Last Quarter phase. As it reaches the three-quarter point in its month, the Moon once again shows us one side of its disc illuminated and the other side in darkness. However, the side that we saw dark at the first quarter phase is now the lit side."
      } else {
        mPic.append(img.eight)
        mInfo.innerHTML = "Tonight the moon is in the Waning Crescent phase. As it completes its journey and approaches new Moon again, the Moon is a waning crescent."
      }
    })
}

renderMoonPhase()

function renderSunset() {
  let sRequest = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + userInfo.zip + "?unitGroup=us&key=84QQ3LHG5UGSEKA2AMRQMQYNJ"
  let time = moment().format("HH:mm:ss")
  let s = document.getElementById("sunset") 
  fetch(sRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      r = data.currentConditions.sunset
      console.log(r)
      let parts = r.split(':'),
            hour = parts[0],
            minutes = parts[1];
      console.log(hour)
        if (hour > 12) {
            set = (hour - 12) + ':' + minutes + ' pm';
        } 

      if (time < data.currentConditions.sunset) {
        s.innerHTML = "The sun sets at " + set + " tonight."
      } else if (time > data.currentConditions.sunset) {
        s.innerHTML = "The sun set at " + set + " tonight."
      } else {
        "The sun is setting right now! Take a look outside."
      }
    })
}

renderSunset()

//   var exampleURL = "https://api.nasa.gov/EPIC/api/natural/date/2015-10-31";

//   var apiKey = 'g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'; 
  
//   var request = new XMLHttpRequest(); 
//   request.open('GET', exampleURL + '?api_key=' + apiKey, true);
  
//   request.addEventListener('load',function(){
  
//   if(request.status >= 200 && request.status < 400){
//   var response = JSON.parse(request.responseText);
//   console.log(response);
//   } 
//   else {
//        console.log("Error in network request: " + request.statusText);
//   }});
//   request.send(null);
// }

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

