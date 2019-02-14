

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

function getRestaurant(id) {
  // console.log(window.location.href);
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
      console.log('aaa', map);
      const pin = new google.maps.Marker({
        position: center,
        map,
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
    zoom: 15,
    center: ironhackBCN
  });

  getRestaurants();
  ironMarker();
  console.log('initmap');
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


function emptyMap() {
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
  console.log('@@@@@@', arr);
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
  // console.log(id);

  getRestaurant(id);
  ironMarker();
  console.log('initmap');
}


// const center = {
//   lat: item.location.coordinates[1],
//   lng: item.location.coordinates[0]
//   };
//   const pin = new google.maps.Marker({
//   position: center,
//   map: map,
//   title: item.name
//   });


// arr.push([{{#each restaurants}}{{this.location.coordinates}}{{/each}}])
// {{#each restaurants}}arr.push([{{this.location.coordinates}}]){{/each}}

// original
// const arr = [{{#each restaurants}}{{this.location.coordinates}}{{/each}}]
