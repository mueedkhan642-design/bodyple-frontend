const Login = () => {
    const users = JSON.parse(localStorage.getItem("user_data")) || [];
    const user = document.getElementById("login_eml").value;
    const pass = document.getElementById("login_pas").value;

    const userFound = users.find(u => u.email === user && u.password === pass);
    if (userFound) {
        window.location.href = "detail.html";
    } else {
        document.getElementById("mssg").innerText = "Fill the information correct";
        document.getElementById("mssg").style.color = "red"
    }
}