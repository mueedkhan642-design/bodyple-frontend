const Login = () => {
    const user = document.getElementById("login_eml").value;
    const pass = document.getElementById("login_pas").value;

    if (!user || !pass) {
        document.getElementById("mssg").innerText = "Fill the information correct";
        document.getElementById("mssg").style.color = "red";
        return;
    }

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user, password: pass })
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => { throw new Error(err.error) });
        }
        return res.json();
    })
    .then(data => {
        localStorage.setItem("user_id", data.user.id);
        localStorage.setItem("loggedInUser", JSON.stringify(data.user));
        
        const generatedToken = 'user_token_' + Math.random().toString(36).substring(2);
        localStorage.setItem("authToken", JSON.stringify(generatedToken));

        window.location.href = "dashboard.html";
    })
    .catch(error => {
        document.getElementById("mssg").innerText = error.message;
        document.getElementById("mssg").style.color = "red";
    });
}

