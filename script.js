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
const roleStatus = document.getElementById("role")
const dashboardPage = document.getElementById("dashboard-page")
const loginPage = document.getElementById("login-page")
const sidebar = document.getElementById("sidebar") 

const pilihRole = () => {
    if (roleOption.value == 'admin') {
        avatar1.style.display = "none"
        avatar2.style.display = "block"
        avatar3.style.display = "none"
    } else if (roleOption.value == 'lecturer') {
        avatar1.style.display = "none"
        avatar2.style.display = "none"
        avatar3.style.display = "block"
    } else if (roleOption.value == 'student') {
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

const storageKeys = [...Object.keys(localStorage)]
const searchKeys = (values) => {
    let i = 0
    for (i; i < storageKeys.length; i++) {
        if (localStorage.getItem(storageKeys[i]) == values) {
            return storageKeys[i]
        } 
    }
}

const makeUserNumber = () => {
    let usernumber = Number(localStorage.getItem('usernumber'))
    if (localStorage.getItem('usernumber') == null) {
        localStorage.setItem('usernumber', '0')
    } else if (localStorage.getItem('usernumber')) {
        usernumber++
        localStorage.setItem('usernumber', usernumber.toString())
        console.log(usernumber)
    }
    return usernumber
}
const userNumber = makeUserNumber()

const signUp = () => {
    if (roleOption.value == 0) {
        window.alert ('pilih role nya dulu cuy')
    } else if (username.value === "") {
        window.alert("Harap masukan username dengan benar")
    } else if (password.value === "") {
        window.alert("Harap masukan password dengan benar")
    } else if(username.value && password.value) {
        localStorage.setItem(`username${userNumber}`, username.value)
        localStorage.setItem(`password${userNumber}`, password.value)
        localStorage.setItem(`role${userNumber}`, roleOption.value)
        window.confirm("Kamu sudah terdaftar cuy silahkan login")
        location.reload()
    }
}

let signedInUser
let signedInPassword
let usernumber
let role
const signIn = () => {
    if (search(username.value) && search(password.value)) {
        signedInUser = `${username.value}del`
        signedInPassword = `${password.value}del`
        usernumber = searchKeys(username.value).split('username')[1]
        role = localStorage.getItem(`role${usernumber}`)
        roleStatus.innerHTML = `${role}`
        window.alert(`Kamu sudah Masuk Cuy!!! Sebagai ${role}!!!`)
        loginPage.style.visibility  = 'hidden'
        dashboardPage.style.visibility = 'visible'
    } else if (username.value === "" || password.value === "") {
        window.alert("masukan username atau password")
    } else if (!search(username.value) || !search(password.value)) {
        window.alert('username atau password anda salah')
    }
}


const logOut = () => {
    window.alert('Yakin Cuy Kamu Mau keluar ? (T_T)')
    loginPage.style.visibility  = 'visible'
    dashboardPage.style.visibility = 'hidden'
    location.reload()
}

const deleteAccount =() => {
    window.alert('Yakin Cuy Akun Kamu Mau di Hapus ? (T_T)')
    localStorage.removeItem(searchKeys(signedInUser.split("del")[0]))
    localStorage.removeItem(searchKeys(signedInPassword.split("del")[0]))
    location.reload()
}

//sidebar
const sidebarToggler = () => {
    sidebar.classList.toggle("sidebar-active2")
}

