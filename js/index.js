import findElement from "./utils/findElement.js";

const templateCard = findElement("#template-card");
const elCards = findElement(".cards");
const show = findElement(".show");
const result = findElement(".result");
const searchInput = findElement("#search");

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
    const bookmarkBtn = findElement(".bookmark", template);
    const moreBtn = findElement(".more", template);
    const readBtn = findElement(".read", template);

    elCards.dataset.id = book.id;

    image.src = book.volumeInfo.selfLink;
    title.textContent = book.volumeInfo.title;
    description.textContent = book.volumeInfo.subtitle;
    date.textContent = book.volumeInfo.publishedDate;
    show.textContent = array.length;
    result.textContent = array.length;
    readBtn.href = book.volumeInfo.infoLink;

    fragment.appendChild(template);
    console.log(book);
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

fetch(
  "https://www.googleapis.com/books/v1/volumes?q=search+terms=java&startIndex=1"
)
  .then((res) => res.json())
  .then((data) => {
    libery = data;
    // console.log(libery.items);
    renderCard(libery.items);
  });
