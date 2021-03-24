
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
