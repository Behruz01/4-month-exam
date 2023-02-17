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
    const bookmarkBtn = findElement(".bookmarka", template);

    // const moreBtn = findElement(".more", template);
    const readBtn = findElement(".read", template);
    const modalName = findElement(".modalName", template);
    const modalImg = findElement(".modalImg", template);
    const modalDescription = findElement(".modalDescription", template);
    const author = findElement(".author", template);
    const published = findElement(".published", template);
    const publishers = findElement(".publishers", template);
    const categories = findElement(".categories", template);
    const pages = findElement(".pages", template);
    const modalMoreBtn = findElement(".modalMoreBtn", template);

    elCards.dataset.id = book.id;

    image.src = book.volumeInfo.imageLinks.smallThumbnail;
    title.textContent = book.volumeInfo.title;
    description.textContent = book.volumeInfo.subtitle;
    date.textContent = book.volumeInfo.publishedDate;
    show.textContent = array.length;
    result.textContent = array.length;
    readBtn.href = book.volumeInfo.infoLink;
    // modal
    modalName.textContent = book.volumeInfo.title;
    modalImg.src = book.volumeInfo.imageLinks.smallThumbnail;
    modalDescription.textContent = book.volumeInfo.description;
    author.textContent = book.volumeInfo.authors;
    published.textContent = book.volumeInfo.publishedDate;
    publishers.textContent = book.volumeInfo.publisher;
    categories.textContent = book.volumeInfo.categories;
    pages.textContent = book.volumeInfo.pageCount;

    fragment.appendChild(template);
    // console.log(book);
  });
  parent.appendChild(fragment);
}

// renderModal
function renderModal(array, parent = elCards) {
  const fragment = document.createDocumentFragment();
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
