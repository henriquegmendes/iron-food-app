let map;
const markers = [];

function getRestaurants() {
  axios.get('/restaurants/api')
    .then((response) => {
      placeRestaurants(response.data.restaurants);
    })
    .catch((error) => {
      console.log(error);
    });
}

function placeRestaurants(restaurants) {
  restaurants.forEach((restaurant) => {
    if (restaurant.location.coordinates.length) {
      console.log('->', restaurant.location.coordinates);
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map: map,
        title: restaurant.name
      });
      markers.push(pin);
    }
  });
}

window.onload = () => {
  const ironhackBCN = {
    lat: 41.386230,
    lng: 2.174980
  };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ironhackBCN
  });

  const center = {
    lat: undefined,
    lng: undefined
  };
};
