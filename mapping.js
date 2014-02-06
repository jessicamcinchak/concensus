// create map

var map = L.map('map').setView([42.3540, -83.0523], 11);
L.tileLayer('http://api.tiles.mapbox.com/v3/rcackerman.h6ofgio1/{z}/{x}/{y}.png', {
            attribution: 'Made pretty by Mapbox'
          }).addTo(map);

// layers to be added

// interactivity