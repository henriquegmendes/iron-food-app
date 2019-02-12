
let map;
const markers = [];

function getRestaurants() {
  axios.get('/api')
    .then((response) => {
      console.log(response);
      placeRestaurants(response.data.restaurants);
    })
    .catch((error) => {
      console.log(error);
    });
}

function placeRestaurants(restaurants) {
  console.log('#########', restaurants);
  restaurants.forEach((restaurant) => {
    // console.log('$$$$$$', restaurant);
    if (restaurant.location.coordinates.length) {
      console.log('->', restaurant.location.coordinates);
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      console.log("aaa", map)
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: restaurant.name
      });
      markers.push(pin);
    }
  });
}

function initMap() {
  const ironhackBCN = {
    lat: -23.560453,
    lng: -46.656232
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: ironhackBCN
  });

  getRestaurants();
  console.log('initmap');
}
