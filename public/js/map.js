// public/js/map.js

// Only initialize small map if the container exists on this page
if (document.getElementById('small-map')) {
  const smallMap = new maplibregl.Map({
    container: 'small-map',
    style: {
      version: 8,
      sources: {
        'osm-tiles': {
          type: 'raster',
          tiles: [
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ],
          tileSize: 256,
          attribution: '&copy; OpenStreetMap contributors'
        }
      },
      layers: [{
        id: 'osm-layer',
        type: 'raster',
        source: 'osm-tiles',
        minzoom: 0,
        maxzoom: 19
      }]
    },
    center: [77.1454, 19.7115], // Map center (you can adjust)
    zoom: 10,
    interactive: true // allow zoom/pan
  });

  // Marker (you can adjust position)
  new maplibregl.Marker()
    .setLngLat([72.8777, 19.0760])
    .addTo(smallMap);
}






