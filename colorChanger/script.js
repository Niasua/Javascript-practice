const button = document.querySelector("#btn");
const currentColor = document.querySelector("#current-color");
const copyButton = document.querySelector("#copy-btn");
const copyImage = document.querySelector("#copy-image");

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let currentCol;

button.addEventListener("click", () => {
    const color = getRandomColor();

    document.body.style.background = color;
    currentColor.textContent = `Current color: ${color}`;

    currentCol = color;
});

copyButton.addEventListener("click", () => {
    copyButton.style.backgroundColor = "lightgreen";
    copyImage.src = "./images/check.png";

    setTimeout(() => {
        copyButton.style.backgroundColor = "grey";
        copyImage.src = "./images/copy.png";
    }, 1000);
    navigator.clipboard.writeText(currentCol);
})


