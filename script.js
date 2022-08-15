const masukRadio = document.getElementById("btnradio1");
const daftarRadio = document.getElementById("btnradio2");
const username = document.getElementById("username");
const password = document.getElementById("password");
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");
const roleOptionContainer = document.getElementById("roleOptionContainer");
const roleOption = document.getElementById("roleOption");
const avatar1 = document.getElementById("avatar1");
const avatar2 = document.getElementById("avatar2");
const avatar3 = document.getElementById("avatar3");
const navbarList = document.getElementById("navbarList");
const roleStatus = document.getElementById("role");
const dashboardPage = document.getElementById("dashboard-page");
const loginPage = document.getElementById("login-page");
const loginBox = document.getElementById("login-box");
const sidebar = document.getElementById("sidebar");
const usernameProfile = document.getElementById("username-profile");
const inputImages = document.getElementById("input-images");
const photoProfile = document.getElementById("photo-profile");
const usernameJumbotron = document.getElementById("username-jumbotron");

const pilihRole = () => {
  if (roleOption.value == "Admin") {
    avatar1.style.display = "none";
    avatar2.style.display = "block";
    avatar3.style.display = "none";
  } else if (roleOption.value == "Lecturer") {
    avatar1.style.display = "none";
    avatar2.style.display = "none";
    avatar3.style.display = "block";
  } else if (roleOption.value == "Student") {
    avatar1.style.display = "block";
    avatar2.style.display = "none";
    avatar3.style.display = "none";
  }
};

const pilih = () => {
  if (masukRadio.checked) {
    signInButton.style.display = "block";
    signUpButton.style.display = "none";
    roleOptionContainer.style.display = "none";
  } else if (daftarRadio.checked) {
    signInButton.style.display = "none";
    signUpButton.style.display = "block";
    roleOptionContainer.style.display = "block";
  }
};

const allStorage = () => {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  return values;
};

const search = (input) => {
  const storageValues = allStorage();
  for (i = 0; i < storageValues.length; i++) {
    if (input == storageValues[i]) {
      return input;
    }
  }
};

const searchKeys = (values) => {
  const storageKeys = [...Object.keys(localStorage)];
  let i = 0;
  for (i; i < storageKeys.length; i++) {
    if (localStorage.getItem(storageKeys[i]) == values) {
      return storageKeys[i];
    }
  }
};

const makeUserNumber = () => {
  let usernumber = Number(localStorage.getItem("usernumber"));
  if (localStorage.getItem("usernumber") == null) {
    localStorage.setItem("usernumber", "0");
  } else if (localStorage.getItem("usernumber")) {
    usernumber++;
    localStorage.setItem("usernumber", usernumber.toString());
  }
  return usernumber;
};

const signUp = () => {
  const userNumber = makeUserNumber();
  if (roleOption.value == 0) {
    swal("Role Nya Di Pilih Dulu Cuy!!!");
  } else if (username.value === "") {
    swal("Harap masukan username dengan benar");
  } else if (password.value === "") {
    swal("Harap masukan password dengan benar");
  } else if (username.value == search(username.value)) {
    swal("Username sudah ada cuy silahkan ganti username");
  } else if (username.value && password.value) {
    localStorage.setItem(`username${userNumber}`, username.value);
    localStorage.setItem(`password${userNumber}`, password.value);
    localStorage.setItem(`role${userNumber}`, roleOption.value);
    swal("Good Job", "Kamu sudah terdaftar cuy silahkan login!!!", "success");
    masukRadio.click();
  }
};

let usernumber;
const signIn = () => {
  if (username.value === "" || password.value === "") {
    swal("Masukan Username Atau Password!!!");
  } else if (!search(username.value) || !search(password.value)) {
    swal("Username Atau Password Tidak Ditemukan!!!");
  } else if (search(username.value) && search(password.value)) {
    usernumber = searchKeys(username.value).split("username")[1];
    let role = localStorage.getItem(`role${usernumber}`);
    roleStatus.innerHTML = `${role}`;
    usernameProfile.innerHTML = `${localStorage.getItem(`username${usernumber}`)}`;
    usernameJumbotron.innerHTML = `${localStorage.getItem(`username${usernumber}`)}`;
    loginPage.style.visibility = "hidden";
    dashboardPage.style.visibility = "visible";
    swal(`Kamu Sudah Masuk Cuy!!! Sebagai ${role}!!!`);
    loginBox.reset();
  }
};

const logOut = () => {
  swal("Yakin Cuy Kamu Mau keluar ? (T_T)").then((willLogOut) => {
    if (willLogOut) {
      loginPage.style.visibility = "visible";
      dashboardPage.style.visibility = "hidden";
    } else {
      return;
    }
  });
};

const deleteAccount = () => {
  swal({
    title: "Are you sure?",
    text: "Yakin Cuy Akun Kamu Mau di Hapus ? (T_T)",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Akun Kamu Telah dihapus!", {
        icon: "success",
      });
      console.log(usernumber);
      localStorage.removeItem(`username${usernumber}`);
      localStorage.removeItem(`password${usernumber}`);
      localStorage.removeItem(`role${usernumber}`);
      localStorage.removeItem(`images${usernumber}`);
      loginPage.style.visibility = "visible";
      dashboardPage.style.visibility = "hidden";
    } else {
      swal("OK, Akun Aman!");
    }
  });
};

//sidebar
const sidebarToggler = () => {
  sidebar.classList.toggle("sidebar-active2");
};

const resetApp = () => {
  swal({
    title: "Are you sure?",
    text: "Aplikasi Akan di Reset, Semua Username dan Password Yang Tersimpan Akan Hilang. Yakin ?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Aplikasi telah di reset!", {
        icon: "success",
      });
      localStorage.clear();
      loginPage.style.visibility = "visible";
      dashboardPage.style.visibility = "hidden";
    } else {
      swal("OK, Aplikasi Aman!");
    }
  });
};

//photo profile
const ganti = () => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem(`images${usernumber}`, reader.result);
  });

  reader.readAsDataURL(inputImages.files[0]);
  swal({
    title: "Are you sure?",
    text: "Photo Profile Akan Diganti...",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Photo Profile Telah Diganti...", {
        title: "Good Job!!",
        icon: "success",
      });
      photoProfile.setAttribute("src", localStorage.getItem(`images${usernumber}`));
    }
  });
};

//Load Photo Profile
signInButton.addEventListener("click", () => {
  if (localStorage.getItem(`images${usernumber}`) === null) {
    console.log(localStorage.getItem(`images${usernumber}`));
    photoProfile.setAttribute("src", "./asset/kawaii.jpg");
  } else {
    photoProfile.setAttribute("src", localStorage.getItem(`images${usernumber}`));
  }
});
