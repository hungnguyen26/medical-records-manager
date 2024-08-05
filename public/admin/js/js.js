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

// prview upload img
const uploadImg = document.querySelector("[upload-img]");
if (uploadImg) {
  const uploadImgInput = document.querySelector("[upload-img-input]");
  const uploadImgpreview = document.querySelector("[upload-img-preview]");
  const deleteImg = document.querySelector(".delete-img");

  uploadImgInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImgpreview.src = URL.createObjectURL(file);
    }
  });

  deleteImg.addEventListener("click", () => {
    uploadImgInput.value = "";
    uploadImgpreview.src = "";
  });
}
// end prview upload img

// hiển thị thời gian thực
const updateTime = () => {
  const clockTime = document.getElementById("clock-time-item");

  const now = new Date();
  const hours = String(now.getHours());
  const getMinutes = String(now.getMinutes());
  const seconds = String(now.getSeconds());
  // console.log(hours);
  clockTime.innerHTML = `${hours} : ${getMinutes} : ${seconds}`;
  setTimeout(updateTime,1000);
};
updateTime();
//end hiển thị thời gian thực
