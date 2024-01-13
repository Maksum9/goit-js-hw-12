import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

const fetchUsersBtn = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const textInput = document.querySelector('.text-input');
const loadMoreBtn = document.querySelector('.load-more');
let currentPage = 1;
let searchTerm = '';
const perPage = 40;

const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loader = document.querySelector('.loader');
loader.style.display = 'none';

fetchUsersBtn.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchTerm = textInput.value;
  gallery.innerHTML = '';
  currentPage = 1;
  loadMoreBtn.style.display = 'none';

  const searchParams = new URLSearchParams({
    key: '41525979-544d9b4f8d317eee068e80d65',
    q: searchTerm,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true
  });
  

  try {
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}&page=${currentPage}&per_page=${perPage}`);
    loader.style.display = 'none';

    if (response.status !== 200) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    const data = response.data;

    if (data.hits.length > 0) {
      const cardHeight = getGalleryCardHeight();

      data.hits.forEach(image => {
        const card = imageCard(image);
        gallery.appendChild(card);
      });

      if (data.totalHits > currentPage * perPage) {
        loadMoreBtn.style.display = 'block';

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth'
        });
      } else {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#FAFAFB',
          backgroundColor: '#4285F4',
          position: 'topRight'
        });
      }

      modal.refresh();
    } else {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight'
      });
    }
  } catch (error) {
    console.error(error.message);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  try {
    currentPage++;
    const response = await axios.get(`https://pixabay.com/api/?key=41525979-544d9b4f8d317eee068e80d65&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`);
    
    if (response.status !== 200) {
      throw new Error(`HTTP request failed with status ${response.status}`);
    }

    const data = response.data;

    if (data.hits.length > 0) {
      data.hits.forEach(image => {
        const card = imageCard(image);
        gallery.appendChild(card);
      });

      if (data.totalHits <= currentPage * perPage) {
        loadMoreBtn.style.display = 'none';
      }

      modal.refresh();
    }
  } catch (error) {
    console.error(error.message);
  }
});

function imageCard(image) {
  const card = document.createElement('div');

  card.innerHTML = `
    <a href="${image.largeImageURL}">
    <img src="${image.webformatURL}" alt="${image.tags}"></a>
    <div class="info">
    <div class="image-info">
    <span>Likes</span>
    <span class="image-value">${image.likes}</span></div>
    <div class="image-info">
    <span>Views</span>
    <span class="image-value">${image.views}</span></div>
    <div class="image-info">
    <span>Comments</span>
    <span class="image-value">${image.comments}</span></div>
    <div class="image-info">
    <span>Downloads</span>
    <span class="image-value">${image.downloads}</span></div>
    </div>
  `;

  return card;
}

function getGalleryCardHeight() {
  const card = document.createElement('div');
  card.style.visibility = 'hidden';
  card.style.position = 'absolute';
  card.style.zIndex = '-1';

  card.innerHTML = `
    <a href="#">
    <img src="#" alt="#"></a>
    <div class="info">
    <div class="image-info">
    <span>Likes</span>
    <span class="image-value">0</span></div>
    <div class="image-info">
    <span>Views</span>
    <span class="image-value">0</span></div>
    <div class="image-info">
    <span>Comments</span>
    <span class="image-value">0</span></div>
    <div class="image-info">
    <span>Downloads</span>
    <span class="image-value">0</span></div>
    </div>
  `;

  gallery.appendChild(card);
  const cardHeight = card.getBoundingClientRect().height;
  gallery.removeChild(card);

  return cardHeight;
}
