// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/api';

// Login functionality
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = 'search.html';
        } else {
            alert('Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Signup functionality
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${BASE_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (data.success) {
            window.location.href = 'login.html';
        } else {
            alert('Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Search functionality
async function search() {
    const query = document.getElementById('searchInput').value;
    try {
        const response = await fetch(`${BASE_URL}/breweries/search?query=${query}`);
        const data = await response.json();
        displaySearchResults(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displaySearchResults(breweries) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
    breweries.forEach(brewery => {
        const breweryElement = document.createElement('div');
        breweryElement.classList.add('brewery');
        breweryElement.innerHTML = `
            <h3>${brewery.name}</h3>
            <p>${brewery.street}, ${brewery.city}, ${brewery.state}</p>
            <p>Phone: ${brewery.phone}</p>
            <p>Website: <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
            <button onclick="viewBrewery('${brewery.id}')">View Details</button>
        `;
        resultsContainer.appendChild(breweryElement);
    });
}

// View brewery details and reviews
async function viewBrewery(id) {
    window.location.href = `brewery.html?id=${id}`;
}

async function loadBreweryDetails() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    try {
        const response = await fetch(`${BASE_URL}/breweries/${id}`);
        const brewery = await response.json();
        displayBreweryDetails(brewery);
        loadReviews(id);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayBreweryDetails(brewery) {
    const breweryInfo = document.getElementById('breweryInfo');
    breweryInfo.innerHTML = `
        <h3>${brewery.name}</h3>
        <p>${brewery.street}, ${brewery.city}, ${brewery.state}</p>
        <p>Phone: ${brewery.phone}</p>
        <p>Website: <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a></p>
    `;
}

// Submit review
document.getElementById('reviewForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const breweryId = params.get('id');
    const rating = document.getElementById('rating').value;
    const description = document.getElementById('description').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to submit a review');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/breweries/${breweryId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ rating, description }),
        });
        const data = await response.json();
        if (data.success) {
            loadReviews(breweryId);
        } else {
            alert('Failed to submit review');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadReviews(breweryId) {
    try {
        const response = await fetch(`${BASE_URL}/breweries/${breweryId}/reviews`);
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayReviews(reviews) {
    const reviewsContainer = document.getElementById('reviews');
    reviewsContainer.innerHTML = '<h3>Reviews</h3>';
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <p>Rating: ${review.rating}</p>
            <p>${review.description}</p>
        `;
        reviewsContainer.appendChild(reviewElement);
    });
}

// Load brewery details when the page is loaded
if (window.location.pathname.endsWith('brewery.html')) {
    loadBreweryDetails();
}
