let users = JSON.parse(localStorage.getItem("user_data")) || [];

const SignUp = () => {
    const user = document.getElementById("SignUp_eml").value;
    const pass = document.getElementById("SignUp_pas").value;
    const name = document.getElementById("username").value;

    const userExists = users.find(u => u.email === user)
    if (userExists) {
        document.getElementById("mssg").innerText = "This user is already registered";
        document.getElementById("mssg").style.color = "red"
        return;
    }
    if (user && pass) {
        users.push({ email: user, password: pass, username: name });
        localStorage.setItem("user_data", JSON.stringify(users));
        window.location.href = "detail.html"
    } else {
        document.getElementById("mssg").innerText = "Fill the information";
        document.getElementById("mssg").style.color = "red"
    }
}