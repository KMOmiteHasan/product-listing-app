const productAddBtn = document.querySelector(".product-add-btn")
const productAddForm = document.querySelector(".product-add-form")
const productName = document.querySelector("#productName")
const productQuantity = document.querySelector("#productQuantity")
const productVolume = document.querySelector("#productVolume")
const productImg = document.querySelector("#productImg")
const productComment = document.querySelector("#productComment")
const formSubmit = document.querySelector(".form-submit")
const productListings = document.querySelector(".product-listings")
const convertPDF = document.querySelector("#convertPDF")


formSubmit.addEventListener("click", () => {
    if (!productName.value || !productQuantity.value || !productVolume.value || !productImg.files[0] || !productComment.value) {
        alert("Please fill in all the fields and upload an image.")
        return;
    }

    const productList = document.createElement('li');
    productList.classList.add('product-lists');

    const productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = URL.createObjectURL(productImg.files[0]);

    const productListText = document.createElement('div');
    productListText.classList.add('product-lists-text');

    const productText = document.createElement('p');
    productText.innerHTML = `<b>Product Name: </b> ${productName.value}`;

    const productQt = document.createElement('p');
    productQt.innerHTML = `<b>Product Quantity: </b> ${productQuantity.value}`;

    const productVol = document.createElement('p');
    productVol.innerHTML = `<b>Product Volume: </b> ${productVolume.value}CBM3`;

    const commentText = document.createElement('p');
    commentText.innerHTML = `<b>Comment: </b> ${productComment.value}`;


    productListText.appendChild(productText);
    productListText.appendChild(productQt);
    productListText.appendChild(productVol);
    productListText.appendChild(commentText);

    productList.appendChild(productImage);
    productList.appendChild(productListText);

    productListings.appendChild(productList);


    productName.value = '';
    productQuantity.value = '';
    productVolume.value = '';
    productImg.value = '';
    productComment.value = '';
})

convertPDF.addEventListener("click", () => {
    window.print()
})

