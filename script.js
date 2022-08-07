const masukRadio = document.getElementById("btnradio1")
const daftarRadio = document.getElementById("btnradio2")
const username = document.getElementById("username")
const password = document.getElementById("password")
const signInButton = document.getElementById("signInButton")
const signUpButton = document.getElementById("signUpButton")
const roleOptionContainer = document.getElementById("roleOptionContainer")
const roleOption = document.getElementById("roleOption")
const avatar1 = document.getElementById("avatar1")
const avatar2 = document.getElementById("avatar2")
const avatar3 = document.getElementById("avatar3")
const navbarList = document.getElementById("navbarList")
const dashboardPage = document.getElementById("dashboard-page")
const loginPage = document.getElementById("login-page") 

const pilihRole = () => {
    if (roleOption.value == 1) {
        avatar1.style.display = "none"
        avatar2.style.display = "block"
        avatar3.style.display = "none"
    } else if (roleOption.value == 2) {
        avatar1.style.display = "none"
        avatar2.style.display = "none"
        avatar3.style.display = "block"
    } else if (roleOption.value == 3) {
        avatar1.style.display = "block"
        avatar2.style.display = "none"
        avatar3.style.display = "none"
    }
}

const pilih = () => {
    if (masukRadio.checked) {
        signInButton.style.display = "block"
        signUpButton.style.display = "none"
        roleOptionContainer.style.display = "none"
    } else if (daftarRadio.checked) {
        signInButton.style.display = "none"
        signUpButton.style.display = "block"
        roleOptionContainer.style.display = "block"
    }
}

const allStorage = () => {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    return values;
}

const storageValues = allStorage()

const search = (input) => {
    for(i = 0; i < storageValues.length; i++) {
        if (input == storageValues[i]) {
            return input
        }
    }
}

let i = 0
const signUp = () => {
    if(username.value && password.value) {
        console.log(i)
        i+=1
        localStorage.setItem(`username${i}`, username.value)
        localStorage.setItem(`password${i}`, password.value)
    } else if (username.value === "") {
        console.log("Harap masukan username dengan benar")
    } else if (password.value === "")
        console.log("Harap masukan password dengan benar")
}


const signIn = () => {
    if (search(username.value) && search(password.value)) {
        console.log('ok')
        loginPage.style.visibility  = 'hidden'
        dashboardPage.style.visibility = 'visible'
    } else if (username.value === "" || password.value === "") {
        console.log("masukan username atau password")
    } else if (!search(username.value) || !search(password.value)) {
        console.log('username atau password anda salah')
    }
}


