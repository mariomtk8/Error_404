function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateRandomURL(){
  // Set up the NASA API endpoint and your API key
  var randomYear = getRandomNumber(2000, 2022);
  var randomUrl = "https://api.nasa.gov/planetary/apod?api_key=bhGLnskGIagCqeYjcFUajoAPs4l87DLGtQQjhUUd&date="+ randomYear + "-01-28";
  console.log(randomUrl);
  return randomUrl;
}

// Function to ingest NASA album data
function getNasaAlbumData(random_url) {
  $.ajax({
    url: random_url,
    type: "GET",
    dataType: "json",
    //data: { api_key: apiKey },
    success: function(data) {
      displayAlbumData(data);
    },
    error: function(error) {
      console.error("Error fetching data: ", error);
    }
  });
}

// Function to display the album data on the page
function displayAlbumData(data) {
  var albumContainer = $("#album-container");
  albumContainer.empty();  // Clear any existing data
  console.log(data.url);
  var imgSrc = data.url;
  var imgElement = "<div class='album-item'><img src='" + imgSrc + "' alt='" + data.title + "'><p>" + data.explanation + "</p></div>"
  albumContainer.append(imgElement);

  $.each(data.items, function(index, item) {
    console.log(item);
    //var imgSrc = item.href;
    //var imgTitle = item.data[0].title;
    //var imgDescription = item.data[0].description;
    //var imgElement = "<div class='album-item'><img src='" + imgSrc + "' alt='" + imgTitle + "'><p>" + imgDescription + "</p></div>";
    //albumContainer.append(imgElement);
  });
}

$(document).ready(function() {
  // Fetch the album data when the page loads
  random_url = generateRandomURL();
  getNasaAlbumData(random_url);

  $( "#cambio" ).click(function() {
    random_url = generateRandomURL();
    getNasaAlbumData(random_url);
  } );
});