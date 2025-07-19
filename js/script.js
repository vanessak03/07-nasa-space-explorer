// Replace 'YOUR_API_KEY' with your actual NASA API key
const apiKey = 'zmBof1sHmFbuwItqkRx59SGEpfgYzw1e0QPXk62V';
const startDate = '1995-06-16';
const endDate = new Date().toISOString().split('T')[0]; // today's date

// Build the API URL using template literals
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;

// Fetch data from NASA's APOD API
function fetchSpaceImages() {
  // Show loading message
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '<div class="placeholder"><span class="placeholder-icon">🔄</span> Loading space photos…</div>';

  const startDate = startInput.value;
  const endDate = endInput.value;
  const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayGallery(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)
setupDateInputs(startInput, endInput);

// Set up event listener for the button
const getImagesBtn = document.getElementById('getImagesBtn');
getImagesBtn.addEventListener('click', fetchSpaceImages);

function displayGallery(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear previous images

  // Show 9 images
  const imageItems = images.filter(item => item.media_type === 'image').slice(0, 9);
  imageItems.forEach(item => {
    // Create a div for each image
    const imageDiv = document.createElement('div');
    imageDiv.className = 'gallery-item';

    // Add the image
    const img = document.createElement('img');
    img.src = item.url;
    img.alt = item.title;

    // Add the title and date
    const title = document.createElement('h3');
    title.textContent = item.title;

    const date = document.createElement('p');
    date.textContent = item.date;

    // Add everything to the div
    imageDiv.appendChild(img);
    imageDiv.appendChild(title);
    imageDiv.appendChild(date);

    // Add click event to open modal
    imageDiv.addEventListener('click', () => {
      openModal(item);
    });

    // Add the div to the gallery
    gallery.appendChild(imageDiv);
  });

  // Show up to 3 videos below the images
  const videoItems = images.filter(item => item.media_type === 'video').slice(0, 3);
  if (videoItems.length > 0) {
    const videoSection = document.createElement('div');
    videoSection.className = 'video-section';

    videoItems.forEach(item => {
      const videoDiv = document.createElement('div');
      videoDiv.className = 'video-item';

      // Create a clickable link to the video
      const videoLink = document.createElement('a');
      videoLink.href = item.url;
      videoLink.target = '_blank';
      videoLink.textContent = `🔗 Watch: ${item.title} (${item.date})`;

      // Add the link and explanation
      const videoExplanation = document.createElement('p');
      videoExplanation.textContent = item.explanation;

      videoDiv.appendChild(videoLink);
      videoDiv.appendChild(videoExplanation);
      videoSection.appendChild(videoDiv);
    });

    // Add the video section below the gallery
    gallery.appendChild(videoSection);
  }
}

function openModal(item) {
  document.getElementById('modal-image').src = item.hdurl || item.url;
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-date').textContent = item.date;
  document.getElementById('modal-explanation').textContent = item.explanation;
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

document.querySelector('.close-btn').addEventListener('click', closeModal);
// Optional: close modal when clicking outside modal-content
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Array of fun space facts
const spaceFacts = [
  "Did you know? The Sun is 400 times larger than the Moon but also 400 times farther away from Earth.",
  "Did you know? One day on Venus is longer than one year on Venus.",
  "Did you know? Neutron stars can spin at a rate of 600 times per second.",
  "Did you know? There are more stars in the universe than grains of sand on Earth.",
  "Did you know? Jupiter has 80 known moons.",
  "Did you know? The footprints on the Moon will remain for millions of years.",
  "Did you know? Saturn could float in water because it’s mostly made of gas.",
  "Did you know? A spoonful of a neutron star would weigh about a billion tons.",
  "Did you know? The largest volcano in the solar system is on Mars."
];

// Pick a random fact
function showRandomFact() {
  const fact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  document.getElementById('space-fact').textContent = fact;
}

// Show a fact when the app loads
showRandomFact();
