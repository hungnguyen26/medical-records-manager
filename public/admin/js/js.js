// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//end  form search

// thông báo
const short_alert = document.querySelector("[show-alert]");
if (short_alert) {
  const time = parseInt(short_alert.getAttribute("data-time"));
  setTimeout(() => {
    short_alert.classList.add("alert-hidden");
  }, time);

  const btnCloseAlert = short_alert.querySelector("[close-alert]");

  btnCloseAlert.addEventListener("click", () => {
    short_alert.classList.add("alert-hidden");
  });
}
//end thông báo
