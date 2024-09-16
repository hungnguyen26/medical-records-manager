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
  const hours = now.getHours();
  const Minutes = now.getMinutes();
  const seconds = now.getSeconds();
  // console.log(hours);

  const formatHours = (hours < 10 ? "0": "") + hours; 
  const formatMinutes = (Minutes < 10 ? "0": "") + Minutes; 
  const formatSeconds = (seconds < 10 ? "0": "") + seconds; 

  clockTime.innerHTML = `${formatHours} : ${formatMinutes} : ${formatSeconds}`;
  setTimeout(updateTime,1000);
};
updateTime();
//end hiển thị thời gian thực


// hiển thị khoa
document.addEventListener("DOMContentLoaded", function () {
  const departmentSelect = document.getElementById('departmentSelect');
  const roleSelect = document.getElementById('Role_id');

  if (roleSelect && departmentSelect) {
    const toggleDepartmentSelect = () => {
      const selectedRole = roleSelect.options[roleSelect.selectedIndex].text;
      if (selectedRole === 'Bác sĩ') {
        departmentSelect.style.display = 'block';
      } else {
        departmentSelect.style.display = 'none';
      }
    }
    toggleDepartmentSelect();
    roleSelect.addEventListener('change', toggleDepartmentSelect);
  }
});

// end hiển thị khoa

// đặt ngày khám
document.addEventListener("DOMContentLoaded", function() {
  const dateInput = document.getElementById('date');
  const today = new Date();
  
  const formattedToday = today.toISOString().split('T')[0];
  
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  const formattedMaxDate = sevenDaysLater.toISOString().split('T')[0];
  
  dateInput.setAttribute('min', formattedToday);
  dateInput.setAttribute('max', formattedMaxDate);
});
// end đặt ngày khám

// hiển thị các khung giờ khi chọn ngày
function showTimeSlots() {
  const timeSlotSelect = document.getElementById('time');
  const selectedDate = document.getElementById('date').value;

  timeSlotSelect.innerHTML = '<option disabled selected>Chọn khung giờ</option>';
  
  if (!selectedDate) return;

  const timeSlots = ['08:00', '10:00', '13:00', '15:00', '17:00'];

  timeSlots.forEach(time => {
      const option = document.createElement('option');
      option.value = time;
      option.textContent = `${time}`;
      timeSlotSelect.appendChild(option);
  });
}
// end hiển thị các khung giờ khi chọn ngày


// Hiển thị thời gian dự kiến khi chọn khung giờ
function showEstimatedTime() {
  const timeSlot = document.getElementById('time').value;
  const selectedDate = document.getElementById('date').value;
  const estimatedTimeDisplay = document.getElementById('estimatedTime');

  if (!timeSlot || !selectedDate) return;
  estimatedTimeDisplay.textContent = `${selectedDate} ${timeSlot}`;
}
// end Hiển thị thời gian dự kiến khi chọn khung giờ



