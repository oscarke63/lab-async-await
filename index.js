const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch all posts from the external API
async function fetchPosts() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// Return n randomly chosen posts (Fisher-Yates shuffle on a copy)
function getRandomPosts(posts, count = 10) {
  const copy = [...posts];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

// Loop through the posts and display them on the page
function displayPosts(posts) {
  const list = document.getElementById('post-list');
  list.innerHTML = '';
  for (const post of posts) {
    const li = document.createElement('li');
    li.className = 'post';

    const title = document.createElement('h1');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.textContent = post.body;

    li.append(title, body);
    list.appendChild(li);
  }
}

async function loadRandomPosts(random = true) {
  const status = document.getElementById('status');
  status.textContent = 'Loading...';
  status.className = '';
  try {
    const posts = await fetchPosts();
    displayPosts(random ? getRandomPosts(posts) : posts.slice(0, 10));
    status.textContent = '';
  } catch (error) {
    console.error('Failed to load posts:', error);
    status.textContent = 'Could not load posts. Please try again.';
    status.className = 'error';
  }
}

if (typeof document !== 'undefined') {
  document.getElementById('refresh-btn').addEventListener('click', () => loadRandomPosts(true));
  loadRandomPosts(false);
}

if (typeof module !== 'undefined') {
  module.exports = { fetchPosts, getRandomPosts, displayPosts, loadRandomPosts };
}

