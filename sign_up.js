let users = JSON.parse(localStorage.getItem("user_data")) || [];

const SignUp = () => {
    const user = document.getElementById("SignUp_eml").value;
    const pass = document.getElementById("SignUp_pas").value;
    const name = document.getElementById("username").value;

    if (!user || !pass) {
        document.getElementById("mssg").innerText = "Fill the information";
        document.getElementById("mssg").style.color = "red";
        return;
    }

    fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: name, email: user, password: pass })
    })
        .then(res => {                                  
            if (!res.ok) {
                return res.json().then(err => { throw new Error(err.error) });
            }
            return res.json();
        })
        .then(data => {
            const generatedToken = 'user_token_' + Math.random().toString(36).substring(2);
            localStorage.setItem("authToken", JSON.stringify(generatedToken));
            localStorage.setItem("username", name);
            if (data.user) {
                localStorage.setItem("user_id", data.user.id);
                localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            }
            window.location.href = "detail.html";
        })
        .catch(error => {
            document.getElementById("mssg").innerText = error.message;
            document.getElementById("mssg").style.color = "red";
        });
}   