const container = document.getElementById("container");

window.onload = function () {
    container.textContent = randomChars(getRandomInt(0, 2));
    container.focus();
};

window.addEventListener("keyup", function (e) {
    if (!/^[a-z]$/.test(e.key)) {
        return;
    }

    let text = container.textContent;

    if (text.length > 0 && e.key === text[0]) {
        text = text.substring(1);
    }

    text += randomChars(getRandomInt(1, 3));
    container.textContent = text;
});

function randomChars(n) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 0; i < n; i++) {
        const index = Math.floor(Math.random() * 26);
        result += chars[index];
    }

    return result;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
