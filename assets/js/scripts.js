$(document).foundation(); //foundtation initializer
// nasa apiKey = g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5 



// PAGE 1 //
  // PAGE 1 //
// PAGE 1 //

const userInfo = JSON.parse(localStorage.getItem("userInfo"));



// astronomy picture of the day
const mainPage = $("#start-page");
const lightBulb = $("#desc-btn");
const pictureInfo = $("#help");
const flicker = $("#desc-query")
var obj,
    source;

let astroPicTodayApi = 'https://api.nasa.gov/planetary/apod?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5'
function renderImage() {
  fetch(astroPicTodayApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      let img = data.hdurl;
    
      mainPage.append(`<img class='astro-pix' src='${img}'></img>`);
      
      
      lightBulb.click(function() {
        if (pictureInfo.hasClass("hide")) {
          pictureInfo.removeClass("hide");
          let today = moment();
          let head = data.title;
          let desc = data.explanation;
          $("#desc-date").text(today.format("dddd, MMMM Do YYYY"));
          $("#desc-header").text(head);
          $("#desc-body").text(`"${desc}"`);
        } else { 
          pictureInfo.addClass("hide");
      }
      })
    });
}

renderImage()



// launch button into modal form
const formSubmitBtn = $("#form-submit");
const launchBtn = $("#launch-btn");
const modalForm = $("#modal-form");

launchBtn.click((e) => {
  e.preventDefault();

  if (!userInfo) {
    launchBtn.addClass("hide");
    mainPage.addClass("hide");
    modalForm.removeClass("hide");
    console.log("hello");
  } else {
    window.location.href = "./dashboard.html";
  }

})


// modal form submit
formSubmitBtn.click(() => {
  mainPage.addClass("hide");
  if ($("#firstName").val() == "" || $("#dob").val() == "" || $("#zipCode").val() == "") {
    confirm("Please come back when you're responsible enough to fill out all fields!");

  } else {
    const userInfo = {
      firstName: $("#firstName").val(),
      bday: $("#dob").val(),
      zip: $("#zipCode").val(),
      favPlanet: $("#favPlanet").val()
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    window.location.href = "./dashboard.html";
  }
})





// PAGE 2 //
  // PAGE 2 //
// PAGE 2 //

$("h1").append(userInfo.firstName);




// go home and reset local storage button
document.getElementById("gohome").addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "./index.html";
});






// weather render api
function renderWeather() {
  let wRequest = "https://api.openweathermap.org/data/2.5/weather?zip=" + userInfo.zip + ",US&units=imperial&appid=59948208350e6af8ced51673faaaf707"
  // let t = $("#temperature");
  let img = document.createElement("img")
  let sImg = document.createElement("img");

  fetch(wRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      $("#weather-today").html("Currently in " + data.name);
      img.src = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      sImg.src = "assets/images/sunset.png"
      $("#temperature").html("Temperature: " + data.main.temp.toFixed() + "&degF")
      $("#temperature").append(img);
      $("#sunset-pic").append(sImg)


      if (data.weather[0].icon == "01d" || data.weather[0].icon == "01n") { 
          $("#forecast").html("The forecast is currently calling for " + data.weather[0].main.toLowerCase() + " skies. If it remains like this, it'll be great for star-gazing.");
      }
        
      if (data.weather[0].icon == "02d" || data.weather[0].icon == "02n") { 
        $("#forecast").html("The forecast is currently calling for " + data.weather[0].description.toLowerCase() + ". If it remains like this, it'll be great for star-gazing.");
      }
          
      if (data.weather[0].icon == "03d" || data.weather[0].icon == "03n" || data.weather[0].icon == "04d" || data.weather[0].icon == "04n" || data.weather[0].icon == "09d" || data.weather[0].icon == "09n" || data.weather[0].icon == "010d" || data.weather[0].icon == "10n" || data.weather[0].icon == "11d" || data.weather[0].icon == "11n" || data.weather[0].icon == "13d" || data.weather[0].icon == "13n" || data.weather[0].icon == "50d" || data.weather[0].icon == "50n") {
        $("#forecast").html("The forecast is currently calling for " + data.weather[0].description.toLowerCase() + ". Right now isn't the best time to see anything in the sky. Check back later for an update!")
      } 
    
    })
}

renderWeather();







// // favorite planet render api
// function renderPlanet() {
//   var img = document.createElement('img');
//   img.src = "assets/images/" + userInfo.favPlanet + ".png";
//   document.getElementById('planet-pic').append(img);
// };

// renderPlanet();






// Moon phase render api
function renderMoonPhase() {
  let mRequest = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + userInfo.zip + "?unitGroup=us&key=84QQ3LHG5UGSEKA2AMRQMQYNJ";
  let mPic = document.getElementById("moon-pic");
  let mInfo = document.getElementById("moon-info");
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


  fetch(mRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      img.one.src = "assets/images/newmoon.jpg";
      img.two.src = "assets/images/waxingcrescent.jpg";
      img.three.src = "assets/images/firstquarter.jpg";
      img.four.src = "assets/images/waxinggibbous.jpg";
      img.five.src = "assets/images/fullmoon.jpg";
      img.six.src = "assets/images/waninggibbous.jpg";
      img.seven.src = "assets/images/lastquarter.png";
      img.eight.src = "assets/images/waningcrescent.jpg";


      if (data.currentConditions.moonphase == 0) {
        mPic.append(img.one);
        mInfo.innerHTML = "Tonight the moon is in the New Moon phase. At new Moon, the Moon is lined up between the Earth and the Sun. We see the side of the Moon that is not being lit by the Sun (in other words, we see no Moon at all, because the brightness of the Sun outshines the dim Moon) When the Moon is exactly lined up with the Sun (as viewed from Earth), we experience an eclipse.";
      } else if (data.currentConditions.moonphase > 0 && data.currentConditions.moonphase < 0.25) {
        mPic.append(img.two);
        mInfo.innerHTML = "Tonight the moon is in the Waxing Crescent phase. As the Moon moves eastward away from the Sun in the sky, we see a bit more of the sunlit side of the Moon each night. A few days after new Moon, we see a thin crescent in the western evening sky. The crescent Moon waxes, or appears to grow fatter, each night.";
      } else if (data.currentConditions.moonphase == 0.25) {
        mPic.append(img.three);
        mInfo.innerHTML = "Tonight's moon is the First Quarter phase. When half of the Moon's disc is illuminated, we call it the first quarter Moon. This name comes from the fact that the Moon is now one-quarter of the way through the lunar month. From Earth, we are now looking at the sunlit side of the Moon from off to the side.";
      } else if (data.currentConditions.moonphase > 0.25 && data.currentConditions.moonphase < 0.5) {
        mPic.append(img.four);
        mInfo.innerHTML = "Tonight the moon is in the Waxing Gibbous phase. The Moon continues to wax. Once more than half of the disc is illuminated, it has a shape we call gibbous. The gibbous Moon appears to grow fatter each night.";
      } else if (data.currentConditions.moonphase == 0.5) {
        mPic.append(img.five);
        mInfo.innerHTML = "Tonight the moon is in the Full Moon phase. When we see the full sunlit face of the Moon, we call it a full Moon. It rises almost exactly as the Sun sets and sets just as the Sun rises the next day. The Moon has now completed one half of the lunar month.";
      } else if (data.currentConditions.moonphase > 0.5 && data.currentConditions.moonphase < 0.75) {
        mPic.append(img.six);
        mInfo.innerHTML = "Tonight the moon is in the Waning Gibbous phase. During the second half of the lunar month, the Moon grows thinner each night. We call this waning. Its shape is still gibbous at this point, but grows a little thinner each night.";
      } else if (data.currentConditions.moonphase == 0.75) {
        mPic.append(img.seven);
        mInfo.innerHTML = "Tonight the moon is in the Last Quarter phase. As it reaches the three-quarter point in its month, the Moon once again shows us one side of its disc illuminated and the other side in darkness. However, the side that we saw dark at the first quarter phase is now the lit side.";
      } else {
        mPic.append(img.eight);
        mInfo.innerHTML = "Tonight the moon is in the Waning Crescent phase. As it completes its journey and approaches new Moon again, the Moon is a waning crescent.";
      }
    })
}

renderMoonPhase();







// Sunset render api
function renderSunset() {
  let sRequest = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + userInfo.zip + "?unitGroup=us&key=84QQ3LHG5UGSEKA2AMRQMQYNJ"
  let time = moment().format("HH:mm:ss");
  let s = document.getElementById("sunset");

  fetch(sRequest)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      r = data.currentConditions.sunset
      let parts = r.split(':'),
        hour = parts[0],
        minutes = parts[1];

      if (hour > 12) {
        set = (hour - 12) + ':' + minutes + ' pm';
      }

      if (time < data.currentConditions.sunset) {
        s.innerHTML = "The sun sets at " + set + " tonight.";
      } else if (time > data.currentConditions.sunset) {
        s.innerHTML = "The sun set at " + set + " tonight.";
      } else {
        "The sun is setting right now! Take a look outside.";
      }
    })
}

renderSunset();






// Mars rover pictures api
const nextBtn = $("#marsRoverNextButton");
const yearBtn = $("#marsRoverYearButton");
const displayedPicture = $("#roverPicture");
const greetingBlurb = $("#greetingBlurb");
let apiYear = 2016;


function renderRoverPic() {
  let photoArray = [];
  let index = 0;
  
  greetingBlurb.text(`On your birthday in ${apiYear}, this was where the Curiosity rover was hard at work.`);

  // api url construction
  const urlRoot = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=g8dgZj7O16CEgqTkpqnE1To0CkSXf25FfnSffYX5";
  const userBday = userInfo.bday.split("-");
  const apiBdayVar = userBday[1] + "-" + userBday[2];
  const urlDate = `&earth_date=${apiYear}-${apiBdayVar}`;
  const apiUrl = urlRoot + urlDate;
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

      for (i = 0; i < data.photos.length; i++) {
        photoArray.push(data.photos[i]);
      }

      // next image button
      nextBtn.click(function () {

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

      // next year button
      yearBtn.click(function () {
        if (apiYear >= 2016 && apiYear < 2020) {
          apiYear++;
          return renderRoverPic();

        } else if (apiYear == 2020) {
          apiYear = 2016;
          return renderRoverPic();
        }
      });

    });

}

renderRoverPic();
 

const page = document.getElementById("wikiPlanet");
const specs = document.getElementById("planet-pic");
let favPlanet = userInfo.favPlanet;

function displayFavPlanet(planet) {
  let wiki = document.createElement("img")
  wiki.src = `assets/images/${planet}.png`;
  let requestUrl = `https://api.le-systeme-solaire.net/rest/bodies/{${planet}}`
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      console.log(data.discoveredBy)

      nm = `Name: ${data.name}`
      radius = `Radius: ${data.meanRadius}Km`
      mass = `Mass: ${data.mass.massValue}^${data.mass.massExponent}`
      gravity = `Gravity: ${data.gravity}, about ${data.gravity/9.8} times that of Earths!`

      specs.append(wiki)
      $("#name").append(nm)
      $("#radius").append(radius)
      $("#mass").append(mass)
      $("#gravity").append(gravity)
      
     
    });
}
displayFavPlanet(favPlanet);




