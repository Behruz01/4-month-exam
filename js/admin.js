import findElement from "./utils/findElement.js";
const BASE_URL = "https://63d61948dc3c55baf4309fc7.mockapi.io/libery";

const templateCard = findElement("#template-card");
const elCards = findElement(".cards");
const show = findElement(".show");
const result = findElement(".result");
const searchInput = findElement("#search");
const editForm = findElement("#editeForm");

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
    const deleteBtn = findElement(".btn-outline-danger", template);
    const editBtn = findElement(".btn-outline-info", template);
    deleteBtn.dataset.id = book.id;
    editBtn.dataset.id = book.id;

    elCards.dataset.id = book.id;

    image.src = book.volumeInfo.imageLinks.smallThumbnail;
    title.textContent = book.volumeInfo.title;
    description.textContent = book.volumeInfo.subtitle;
    date.textContent = book.volumeInfo.publishedDate;
    show.textContent = array.length;
    result.textContent = array.length;
    readBtn.href = book.volumeInfo.infoLink;
    // modal

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

fetch(
  "https://www.googleapis.com/books/v1/volumes?q=search+terms=java&startIndex=1"
)
  .then((res) => res.json())
  .then((data) => {
    libery = data;
    renderCard(libery.items);

    // delete book
    elCards.addEventListener("click", (evt) => {
      const target = evt.target;

      if (target.className.includes("btn-outline-danger")) {
        const id = target.dataset.id;

        console.log(id);
        fetch(BASE_URL + "/libery/" + id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            alert("post o'chirildi ✅");
          })
          .catch((err) => {
            alert("post o'chirilmadi ❌");
          });
      }
    });
  });
// dark mode
function addDarkmodeWidget() {
  new Darkmode().showWidget();
}
window.addEventListener("load", addDarkmodeWidget);

// Edit product
elCards.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.className.includes("btn-outline-info")) {
    const id = target.dataset.id;
    libery.items.forEach((element) => {
      if (element.id === id) {
        const image = editForm.image;
        const title = editForm.title;
        const category = editForm.category;
        const editImg = findElement("#editImage");
        const editButton = findElement("#saveBtn");

        editImg.src = element.volumeInfo.imageLinks.smallThumbnail;
        image.alt = element.name;

        image.value = element.volumeInfo.imageLinks.smallThumbnail;
        title.value = element.volumeInfo.title;
        category.value = element.volumeInfo.categories;

        editButton.addEventListener("click", () => {
          const newObject = {
            id: element.id,
            image: image.value,
            name: title.value,
            category: category.value,
          };

          fetch(BASE_URL + "/libery/" + id, {
            method: "PUT",
            body: JSON.stringify(newObject),

            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              getData();
              alert("Mahsulot o'zgartirildi✅ ");
            })
            .catch((err) => {
              alert("Mahsulot o'zgartirilmadi❌");
            });
        });
      }
    });
  }
});
