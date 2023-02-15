import findElement from "./utils/findElement.js";

const templateCard = findElement("#template-card");
const elCards = findElement(".cards");
const show = findElement(".show");
const result = findElement(".result");
const searchInput = findElement("#search");

//rendering books
let libery = [];
function renderCard(array, parent = elCards) {
  parent.textContent = null;

  const fragment = document.createDocumentFragment();

  array.forEach((book) => {
    const template = templateCard.content.cloneNode(true);
    const image = findElement("#img", template);
    const title = findElement("#title", template);
    const description = findElement("#description", template);
    const date = findElement("#date", template);
    const bookmarkBtn = findElement(".bookmark", template);
    const moreBtn = findElement(".more", template);
    const readBtn = findElement(".read", template);

    elCards.dataset.id = book.id;

    image.src = book.image;
    title.textContent = book.title;
    description.textContent = book.description;
    date.textContent = book.date;
    show.textContent = array.length;
    result.textContent = array.length;

    fragment.appendChild(template);
  });
  parent.appendChild(fragment);
}

// searching
searchInput.addEventListener("input", (evt) => {
  evt.preventDefault();
  let searchBook = [];
  const value = searchInput.value;

  libery.forEach((books) => {
    if (books.title.toLowerCase().includes(value.toLowerCase())) {
      searchBook.push(books);
    }
  });
  renderCard(searchBook);
});

fetch("https://63d61948dc3c55baf4309fc7.mockapi.io/libery")
  .then((res) => res.json())
  .then((data) => {
    libery = data;
    renderCard(libery);
    console.log(libery.length);
  });
