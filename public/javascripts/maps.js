let map;
const markers = [];
const ironhackSAO = {
  lat: -23.561725,
  lng: -46.660133
};

function placeRestaurants(restaurants) {
  restaurants.forEach((restaurant) => {
    if (restaurant.location.coordinates.length) {
      const center = {
        lat: restaurant.location.coordinates[1],
        lng: restaurant.location.coordinates[0]
      };
      const pin = new google.maps.Marker({
        position: center,
        map,
        title: restaurant.name
      });
      markers.push(pin);
    }
  });
}

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

function getRestaurant(id) {
  axios.get(`/api/${id}`)
    .then((response) => {
      console.log(response);
      const array = [response.data.restaurant];
      placeRestaurants(array);
    })
    .catch((error) => {
      console.log(error);
    });
}

function ironMarker() {
  const ironhackSAO = {
    lat: -23.561725,
    lng: -46.660133
  };
  const image = 'https://res.cloudinary.com/dp1vqoeqr/image/upload/c_scale,h_47/v1550149853/ironfood-app/ironhack.png';
  let ironMarker = new google.maps.Marker({
    position: ironhackSAO,
    map,
    title: 'Ironhack',
    icon: image
  });
}

function initMaps() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackSAO
  });
  getRestaurants();
  ironMarker();
}

function searchMap() {
  const ironhackSAO = {
    lat: -23.561725,
    lng: -46.660133
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackSAO
  });
  arr.forEach((item) => {
    const center = {
      lat: item[1],
      lng: item[0]
    };
    const pin = new google.maps.Marker({
      position: center,
      map,
      title: 'title'
    });
  });
  ironMarker();
}

function initOne() {
  const ironhackSAO = {
    lat: -23.561725,
    lng: -46.660133
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: ironhackSAO
  });
  const image = 'https://res.cloudinary.com/dp1vqoeqr/image/upload/c_scale,h_47/v1550149853/ironfood-app/ironhack.png';
  let ironMarker = new google.maps.Marker({
    position: ironhackSAO,
    map,
    title: 'Ironhack',
    icon: image
  });
  const url = window.location.href;
  const index = url.lastIndexOf('/');
  const id = url.slice(index + 1);

  getRestaurant(id);
  ironMarker();
}
