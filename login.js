const Login = () => {
    const users = JSON.parse(localStorage.getItem("user_data")) || [];
    const user = document.getElementById("login_eml").value;
    const pass = document.getElementById("login_pas").value;

    const userFound = users.find(u => u.email === user && u.password === pass);
    if (userFound) {
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("mssg").innerText = "Fill the information correct";
        document.getElementById("mssg").style.color = "red"
    }
}
const forgotpassword = () => {
    const email = document.getElementById("login_eml").value;
    const newPassword = document.getElementById("login_pas").value;

    let users = JSON.parse(localStorage.getItem("user_data")) || []
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword
        localStorage.setItem("user_data", JSON.stringify(users))
        window.location.href = "index.html"
    }else{
        document.getElementById("mssg").innerText = "Fill the information correct";
        document.getElementById("mssg").style.color = "red"
    }
}