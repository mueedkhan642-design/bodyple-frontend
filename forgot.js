const forgotpassword = async () => {
    const userEmail = document.getElementById("login_eml").value.trim();
    const newPass = document.getElementById("login_pas").value.trim();
    const messageBox = document.getElementById("mssg");

    messageBox.innerText = "";
    messageBox.style.color = "";

    if (!userEmail) {
        messageBox.innerText = "Please enter your email";
        messageBox.style.color = "red";
        return;
    }

    if (!newPass) {
        messageBox.innerText = "Please enter a new password";
        messageBox.style.color = "red";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: userEmail,
                newPassword: newPass
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            messageBox.innerText = "Password reset successfully! Redirecting to login...";
            messageBox.style.color = "green";

            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 2000);
        } else {
            messageBox.innerText = data.message || "Failed to reset password";
            messageBox.style.color = "red";
        }

    } catch (error) {
        console.error("Forgot password error:", error);
        messageBox.innerText = "Server connection error. Try again!";
        messageBox.style.color = "red";
    }
};