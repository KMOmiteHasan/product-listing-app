const productAddBtn = document.querySelector(".product-add-btn")
const productAddForm = document.querySelector(".product-add-form")
const productName = document.querySelector("#productName")
const productVolume = document.querySelector("#productVolume")
const productImg = document.querySelector("#productImg")
const productComment = document.querySelector("#productComment")
const formSubmit = document.querySelector(".form-submit")
const productListings = document.querySelector(".product-listings")
const convertPDF = document.querySelector("#convertPDF")

productVolume.oninput = (event) => positiveValue(event, productVolume);

function positiveValue(event, input) {
    var value = parseInt(input.value, 10);
    value = value < 0 ? 0 : value;
    input.value = value;
}

// Function to create an "Edit" button
function createEditButton() {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    return editButton;
}

// Function to create the counter HTML
function createCounter() {
    const counterDiv = document.createElement('div');
    counterDiv.classList.add('counter');

    const decreaseButton = document.createElement('span');
    decreaseButton.classList.add('down');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = (event) => decreaseCount(event, decreaseButton.nextElementSibling);

    const countInput = document.createElement('input');
    countInput.classList.add("counter-input")
    countInput.type = 'number';
    countInput.value = '1';
    countInput.oninput = (event) => updateCount(event, countInput);

    const increaseButton = document.createElement('span');
    increaseButton.classList.add('up');
    increaseButton.textContent = '+';
    increaseButton.onclick = (event) => increaseCount(event, increaseButton.previousElementSibling);

    counterDiv.appendChild(decreaseButton);
    counterDiv.appendChild(countInput);
    counterDiv.appendChild(increaseButton);

    return counterDiv;
}

formSubmit.addEventListener("click", () => {
    if (!productVolume.value) {
        alert("Please fill in the volume field.")
        return;
    }
    if (!productImg.files[0]) {
        alert("Please upload an image.")
        return;
    }


    const productList = document.createElement('li');
    productList.classList.add('product-lists');

    const editButton = createEditButton();
    productList.appendChild(editButton);

    const counterDiv = createCounter();
    productList.appendChild(counterDiv);

    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = URL.createObjectURL(productImg.files[0]);

    const productListText = document.createElement('div');
    productListText.classList.add('product-lists-text');

    const productText = document.createElement('p');
    productText.classList.add('product-name');
    productText.innerHTML = `<b>Product Name: </b> ${productName.value}`;

    const productVol = document.createElement('p');
    productVol.classList.add('product-volume');
    productVol.innerHTML = `<b>Product Volume: </b> <span>${productVolume.value}</span>CBM3`;

    const productTotVol = document.createElement('p');
    productTotVol.classList.add('product-total-volume');
    productTotVol.innerHTML = `<b>Total Volume: </b> <span>${Number(productVolume.value)}</span>CBM3`;

    const commentText = document.createElement('p');
    commentText.classList.add('product-comment');
    commentText.innerHTML = `<b>Comment: </b> ${productComment.value}`;


    productListText.appendChild(productText);
    productListText.appendChild(productVol);
    productListText.appendChild(productTotVol);
    productListText.appendChild(commentText);

    productList.appendChild(productImage);
    productList.appendChild(productListText);

    productListings.appendChild(productList);


    productName.value = '';
    productVolume.value = '';
    productImg.value = '';
    productComment.value = '';
})

convertPDF.addEventListener("click", () => {
    window.print()
})

productListings.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
        const listItem = event.target.parentElement;
        handleEditProduct(listItem);
    }
});

function increaseCount(event, input) {
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
    let valueChange = input.parentElement.nextElementSibling.nextElementSibling.children[1].children[1].innerHTML
    input.parentElement.nextElementSibling.nextElementSibling.children[2].children[1].innerHTML = `${Number(input.value) * Number(valueChange)}`;
}

function decreaseCount(event, input) {
    var value = parseInt(input.value, 10);
    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
    }
    let valueChange = input.parentElement.nextElementSibling.nextElementSibling.children[1].children[1].innerHTML
    input.parentElement.nextElementSibling.nextElementSibling.children[2].children[1].innerHTML = `${Number(input.value) * Number(valueChange)}`;
}

function updateCount(event, input) {
    var value = parseInt(input.value, 10);
    value = value < 0 ? 0 : value;
    input.value = value;
    let valueChange = input.parentElement.nextElementSibling.nextElementSibling.children[1].children[1].innerHTML
    input.parentElement.nextElementSibling.nextElementSibling.children[2].children[1].innerHTML = `${Number(input.value) * Number(valueChange)}`;
}

function handleEditProduct(productListItem) {
    const editForm = document.createElement('div');
    editForm.classList.add('product-edit-form');

    const editNameInput = document.createElement('input');
    editNameInput.type = 'text';
    editNameInput.value = productListItem.querySelector('.product-name').textContent;

    const editVolumeInput = document.createElement('input');
    editVolumeInput.type = 'text';
    editVolumeInput.value = productListItem.querySelector('.product-volume').textContent;

    const editCommentInput = document.createElement('textarea');
    editCommentInput.value = productListItem.querySelector('.product-comment').textContent;

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';

    saveButton.addEventListener('click', () => {
        const updatedProductName = editNameInput.value;
        const updatedProductVolume = editVolumeInput.value;
        const updatedProductComment = editCommentInput.value;

        productListItem.querySelector('.product-name').innerHTML = `<b>Product Name: </b> ${updatedProductName}`;
        productListItem.querySelector('.product-volume').innerHTML = `<b>Product Volume: </b> ${updatedProductVolume}CBM3`;
        productListItem.querySelector('.product-comment').innerHTML = `<b>Comment: </b> ${updatedProductComment}`;

        productListItem.removeChild(editForm);
    });

    editForm.appendChild(editNameInput);
    editForm.appendChild(editVolumeInput);
    editForm.appendChild(editCommentInput);
    editForm.appendChild(saveButton);

    productListItem.innerHTML = '';
    productListItem.appendChild(editForm);
}
