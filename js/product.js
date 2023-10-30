const tshirt = document.getElementById("tshirt");
const print = document.getElementById("print");
const fileInput = document.getElementById("file-input");
const removeButton = document.getElementById("remove-button");

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            print.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

removeButton.addEventListener("click", () => {
    print.src = "";
});
