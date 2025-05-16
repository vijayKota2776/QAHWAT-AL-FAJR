const locations = [
    { id: 1, name: "Alfred Beach Resort", address: "Calangute, Goa", city: "Goa", lat: 15.5603, lng: 73.7596 },
    { id: 2, name: "Alfred Downtown Cafe", address: "Fort, Mumbai", city: "Mumbai", lat: 18.9388, lng: 72.8355 },
    { id: 3, name: "Alfred Tech Park", address: "Electronic City, Bangalore", city: "Bangalore", lat: 12.8431, lng: 77.6606 },
    { id: 4, name: "Alfred Colva", address: "Colva Beach, Goa", city: "Goa", lat: 15.3927, lng: 73.8478 },
    { id: 5, name: "Alfred Bandra", address: "Bandra West, Mumbai", city: "Mumbai", lat: 19.0544, lng: 72.8407 },
    { id: 6, name: "Alfred MG Road", address: "MG Road, Bangalore", city: "Bangalore", lat: 12.9763, lng: 77.6033 },
  ];
  
  const locationsListEl = document.getElementById("locations");
  const cityButtons = document.querySelectorAll(".city-filters button");
  
  let map, markers = [];
  let activeLocationId = null;
  let filteredLocations = [...locations];
  
  function initMap() {
    map = L.map("map").setView([20.5937, 78.9629], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
  }
  
  function clearMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
  }
  
  function addMarkers(locationsToAdd) {
    locationsToAdd.forEach(location => {
      const marker = L.marker([location.lat, location.lng]).addTo(map);
      marker.bindPopup(`<b>${location.name}</b><br>${location.address}`);
      marker.on('click', () => {
        setActiveLocation(location.id);
      });
      markers.push(marker);
    });
  }
  
  function createLocationItem(location) {
    const li = document.createElement("li");
    li.className = "location-item";
    li.dataset.id = location.id;
    li.tabIndex = 0;
  
    li.innerHTML = `
      <div class="location-name">${location.name}</div>
      <div class="location-address">${location.address}</div>
      <form class="booking-form">
        <h4>Book a Table</h4>
        <label>
          Name:<br />
          <input type="text" name="name" required />
        </label>
        <label>
          Date:<br />
          <input type="date" name="date" required />
        </label>
        <label>
          Time:<br />
          <input type="time" name="time" required />
        </label>
        <label>
          Guests:<br />
          <input type="number" name="guests" min="1" max="20" value="1" required />
        </label>
        <button type="submit">Book Now</button>
        <div class="booking-confirmation"></div>
      </form>
    `;
  
    li.addEventListener("click", () => {
      setActiveLocation(location.id);
    });
  
    li.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setActiveLocation(location.id);
      }
    });
  
    const form = li.querySelector(".booking-form");
    const confirmation = li.querySelector(".booking-confirmation");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name");
      const date = formData.get("date");
      const time = formData.get("time");
      const guests = formData.get("guests");
  
      confirmation.textContent = `Thank you, ${name}! Your table for ${guests} on ${date} at ${time} is booked.`;
      confirmation.style.color = "green";
  
      form.reset();
    });
  
    return li;
  }
  
  function renderLocations() {
    locationsListEl.innerHTML = "";
    filteredLocations.forEach(location => {
      locationsListEl.appendChild(createLocationItem(location));
    });
  }
  
  function setActiveLocation(id) {
    activeLocationId = id;
  
    // Highlight active location in list
    document.querySelectorAll(".location-item").forEach(item => {
      const isActive = Number(item.dataset.id) === id;
      item.classList.toggle("active", isActive);
      // Show booking form only for active
      const form = item.querySelector(".booking-form");
      if (isActive) {
        form.style.display = "block";
      } else {
        form.style.display = "none";
        // Also clear any confirmation when hiding form
        const confirmation = item.querySelector(".booking-confirmation");
        confirmation.textContent = "";
      }
    });
  
    // Center map on selected location and open popup
    const loc = locations.find(loc => loc.id === id);
    if (loc) {
      map.setView([loc.lat, loc.lng], 14);
      const marker = markers.find(m => {
        const mLatLng = m.getLatLng();
        return mLatLng.lat === loc.lat && mLatLng.lng === loc.lng;
      });
      if (marker) {
        marker.openPopup();
      }
    }
  }
  
  function filterLocations(city) {
    if (city === "all") {
      filteredLocations = [...locations];
    } else {
      filteredLocations = locations.filter(loc => loc.city === city);
    }
    renderLocations();
    clearMarkers();
    addMarkers(filteredLocations);
    activeLocationId = null;
  }
  
  function setupFilters() {
    cityButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        cityButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        filterLocations(btn.dataset.city);
      });
    });
  }
  
  function init() {
    initMap();
    renderLocations();
    addMarkers(filteredLocations);
    setupFilters();
  }
  
  init();