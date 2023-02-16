import findElement from "./utils/findElement.js";
const userInput = findElement("#userInput");
const passwordInput = findElement("#passwordInput");
const form = findElement("#form");
const userError = findElement("#user-error");
const passwordError = findElement("#password-error");

const errorText = (element, text) => {
  element.textContent = text;
  element.style.display = "block";
  const timer = setTimeout(() => {
    element.style.display = "none";

    clearTimeout(timer);
  }, 3000);
};
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (userInput.value.length == 0) {
    errorText(userError, "Iltimos ma'lumot kiriting!");
  }
  if (passwordInput.value.length < 6) {
    errorText(passwordError, "Ma'lumot 6ta belgidan kam bo'lmasligi kerak!");
  }

  const login = {
    // email: "eve.holt@reqres.in",
    // password: "cityslicka",
    email: userInput.value,
    password: passwordInput.value,
  };
  fetch("https://reqres.in/api/login ", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        const token = data.token;
        localStorage.setItem("token", token);
        window.location.href = "/index.html";
      }
    })
    .catch((err) => {
      errorText(userError, err);
    });
});
