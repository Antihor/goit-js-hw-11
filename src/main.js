import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('.search-form');
const container = document.querySelector('.container');
const galleryRef = document.querySelector('.gallery');

function loaderOn() {
  const loader = document.createElement('span');
  loader.classList.add('span');
  container.append(loader);
}
function loaderOff() {
  const loader = document.querySelector('.span');
  if (loader) {
    loader.remove();
  }
}

formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  loaderOn();
  galleryRef.innerHTML = '';

  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '42059071-0978dc0d7158b742eee7c30f5';
  const searchQuery = e.currentTarget.input.value;

  fetch(
    `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
      searchQuery
    )}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: '',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'bottomCenter',
        });
      } else {
        const markup = data.hits
          .map(
            ({
              webformatURL,
              largeImageURL,
              tags,
              likes,
              views,
              comments,
              downloads,
            }) => {
              return `<a href="${webformatURL}" class="gallery-link"><li class="gallery-item">
          <img class="gallery-image" src="${largeImageURL}" alt="${tags}">
          <p>Likes: ${likes}</p>
          <p>Views: ${views}</p>
          <p>Comments: ${comments}</p>
          <p>Downloads: ${downloads}</p>
          </li></a>`;
            }
          )
          .join('');

        galleryRef.insertAdjacentHTML('beforeend', markup);

        const lightbox = new SimpleLightbox('.gallery a', options);
        lightbox.on('show.simplelightbox');
        lightbox.refresh();
        formRef.reset();
      }
    })

    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderOff();
    });

  const options = {
    captions: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    animation: 250,
  };
}
