mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // ✅ required
  center: listing.geometry.coordinates,        // [lng, lat]
  zoom: 10,
});

new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h6>${listing.location}</h6><p>Exact location after booking</p>`)
  )
  .addTo(map);

  console.log("Listing geometry:", listing.geometry);



// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//   container: "map",
//   center: listing.geometry.coordinates,  // ✅ no extra []
//   zoom: 10,
// });

// const marker = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(listing.geometry.coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 })
//       .setHTML(`<h6>${listing.location}</h6><p>Exact location showing after booking</p>`)
//   )
//   .addTo(map);

// console.log("Marker coordinates:", coordinates);
