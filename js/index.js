import findElement from "./utils/findElement.js";

const templateCard = findElement("#template-card");
const elCards = findElement(".cards");
const show = findElement(".show");
const result = findElement(".result");
const searchInput = findElement("#search");
const adminBtn = findElement(".admin");

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "http://127.0.0.1:5500/login.html";
}
//rendering books
let libery = [];
function renderCard(array, parent = elCards) {
  const fragment = document.createDocumentFragment();

  array.forEach((book) => {
    const template = templateCard.content.cloneNode(true);
    const image = findElement("#img", template);
    const title = findElement("#title", template);
    const description = findElement("#description", template);
    const date = findElement("#date", template);
    const readBtn = findElement(".read", template);
    const bookmarkBtn = findElement(".bookmarka", template);

    const moreBtn = findElement(".more", template);

    elCards.dataset.id = book.id;
    readBtn.href = book.volumeInfo.infoLink;
    image.src = book.volumeInfo.imageLinks.smallThumbnail;
    title.textContent = book.volumeInfo.title;
    description.textContent = book.volumeInfo.subtitle;
    date.textContent = book.volumeInfo.publishedDate;
    show.textContent = array.length;
    result.textContent = array.length;

    fragment.appendChild(template);
    // console.log(book);
  });
  parent.appendChild(fragment);
}

// searching
searchInput.addEventListener("input", (evt) => {
  evt.preventDefault();
  elCards.textContent = null;
  let searchBook = [];
  const value = searchInput.value;
  libery.items.forEach((books) => {
    if (books.volumeInfo.title.toLowerCase().includes(value.toLowerCase())) {
      searchBook.push(books);
    }
  });
  renderCard(searchBook);
});

// bookmarkBtn.addEventListener("click", (evt) => {
//   addEventListener.preventDefault();
// });
fetch(
  "https://www.googleapis.com/books/v1/volumes?q=search+terms=java&startIndex=1"
)
  .then((res) => res.json())
  .then((data) => {
    libery = data;

    renderCard(libery.items);
    renderModal(libery.items);
  });
// dark mode
function addDarkmodeWidget() {
  new Darkmode().showWidget();
}
window.addEventListener("load", addDarkmodeWidget);

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  slidesPerView: 3,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 1,
    },
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

adminBtn.addEventListener("click", () => {
  console.log("salom");
  window.location.href = "/login.html";
});

// renderModal
function renderModal(array, parent = elCards) {
  array.forEach((elem) => {
    const readModalBtn = findElement(".modalMoreBtn");
    const modalName = findElement(".modalName");
    const modalImg = findElement(".modalImg");
    const modalDescription = findElement(".modalDescription");
    const author = findElement(".author");
    const published = findElement(".published");
    const publishers = findElement(".publishers");
    const categories = findElement(".categories");
    const pages = findElement(".pages");
    const modalMoreBtn = findElement(".modalMoreBtn");

    // modal
    modalName.textContent = elem.volumeInfo.title;
    modalImg.src = elem.volumeInfo.imageLinks.smallThumbnail;
    modalDescription.textContent = elem.volumeInfo.description;
    author.textContent = elem.volumeInfo.authors;
    published.textContent = elem.volumeInfo.publishedDate;
    publishers.textContent = elem.volumeInfo.publisher;
    categories.textContent = elem.volumeInfo.categories;
    pages.textContent = elem.volumeInfo.pageCount;
    // readModalBtn = elem.volumeInfo.infoLink;
  });
}
