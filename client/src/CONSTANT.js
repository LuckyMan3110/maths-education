export const CONSTANT = {
    server: "http://localhost:4000/",
};

export const setMessage = (text, color, el = "error") => {
    let error = document.getElementById(el);
    error.innerHTML = text;
    error.classList.add("text-" + color);
    error.style.display = "block";
};

export const resetMessage = (el = "error") => {
    let error = document.getElementById(el);
    error.innerText = "";
    error.style.display = "none";
    error.classList.remove("text-danger");
    error.classList.remove("text-success");
};

export const isMessage = (el = "error") => {
    let error = document.getElementById(el);
    if (error.style.display === "none") {
        return false;
    }
    return true;
};