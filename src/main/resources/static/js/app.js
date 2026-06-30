const signupForm = document.querySelector(".login-form");

if (signupForm && window.location.pathname.includes("signup")) {

    signupForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const user = {
            id: crypto.randomUUID(),
            name: document.querySelector("#fullName").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            college: "",
            degree: "",
            year: "",
            careerGoal: ""
        };

        if (user.password !== document.querySelector("#confirmPassword").value) {
            alert("Passwords do not match");
            return;
        }

        try {

const response = await fetch("/signup", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            });

            const message = await response.text();
            alert(message);
            window.location.href = "/login";

            window.location.href = "login.html";

        } catch (error) {

            alert("Signup failed.");

            console.error(error);

        }

    });

}
const loginForm = document.querySelector(".login-form");

if (loginForm && window.location.pathname.includes("login")) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const loginData = {
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value
        };

        try {

            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

const message = await response.text();

alert(message);

if (
    response.ok &&
    !message.toLowerCase().includes("not found") &&
    !message.toLowerCase().includes("invalid") &&
    !message.toLowerCase().includes("incorrect") &&
    !message.toLowerCase().includes("wrong")
) {
    window.location.href = "/dashboard.html";
}
        } catch (err) {
            alert("Something went wrong. Please try again.");
        }

    });

}