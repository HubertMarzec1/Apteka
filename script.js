// Pobranie elementów
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.getElementsByClassName('close')[0];
const closeBtnWysylka = document.getElementsByClassName('close')[1];
const closeBtnOpis = document.getElementsByClassName('close')[2];

const guzikWysylka = document.getElementById('recepta-button');
const wysylkaModal = document.getElementById('shippingModal');

const opisModal = document.getElementById('descriptionModal');

// Obsługa kliknięcia na ikonę koszyka
cartIcon.addEventListener('click', function() {
    cartModal.style.display = 'block'; // Wyświetlenie modala
});

// Obsługa kliknięcia na przycisk zamknięcia
closeBtn.addEventListener('click', function() {
    cartModal.style.display = 'none'; // Ukrycie modala
});

closeBtnOpis.addEventListener('click', function() {
    opisModal.style.display = 'none'; // Ukrycie modala
});

// Obsługa kliknięcia poza modalem, aby go zamknąć
window.addEventListener('click', function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = 'none'; // Ukrycie modala
    }
});

guzikWysylka.addEventListener('click', function() {
    wysylkaModal.style.display = 'none'; // Ukrycie modala
    cartModal.style.display = 'block'; // Wyświetlenie modalaw
});

closeBtnWysylka.addEventListener('click', function() {
    cartModal.style.display = 'none'; // Ukrycie modala
    wysylkaModal.style.display = 'none'; // Ukrycie modala
});

// Przechowywanie produktów w koszyku
let cartItems = [];


// Dodanie produktu do koszyka
function addToCart(event) {
    const product = event.target.parentNode;
    const productName = product.querySelector('h3').textContent;
    const productPrice = parseFloat(product.querySelector('p').textContent.split(' ')[1]);
    const productQuantity = parseInt(product.querySelector('input').value);
    const productId = product.querySelector('input').id;

    // Sprawdź, czy produkt już istnieje w koszyku
    const existingItem = cartItems.find(item => item.name === productName);

    if (productQuantity > 0) {
        if (existingItem) {
            // Jeśli produkt już istnieje, zaktualizuj jego ilość
            existingItem.quantity += productQuantity;
            updateItem(productId, existingItem.quantity);
        } else {
            // Jeśli produkt nie istnieje, dodaj go do koszyka
            const item = { id: productId, name: productName, price: productPrice, quantity: productQuantity };
            cartItems.push(item);
            addItemToCart(productId, productQuantity);
        }
        updateCart();
    }
}

// Aktualizacja zawartości koszyka
function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = '';

    let total = 0;


    cartItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} zł x ${item.quantity}`;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', () => removeItemFromCart(item));
        li.appendChild(removeButton);

        cartList.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = `Suma: ${total.toFixed(2)} zł`;
}

function removeItemFromCart(item) {
    // Usuwanie przedmiotu z koszyka
    const index = cartItems.indexOf(item);
    if (index > -1) {
        cartItems.splice(index, 1);
        updateCart();
        removeItem(item.id);
    }
}


const replacePolishLetters = (text) => {
    const polishLetters = {
        ą: 'a',
        ć: 'c',
        ę: 'e',
        ł: 'l',
        ń: 'n',
        ó: 'o',
        ś: 's',
        ź: 'z',
        ż: 'z',
    };

    return text
        .toLowerCase()
        .replace(/[ąćęłńóśźż]/g, (match) => polishLetters[match]);
};


// Zmniejszanie ilości produktu
function decrementQuantity(event) {
    const input = event.target.parentNode.querySelector('input');
    let quantity = parseInt(input.value);

    if (quantity > 1) {
        quantity--;
        input.value = quantity;
    }
}

// Zwiększanie ilości produktu
function incrementQuantity(event) {
    const input = event.target.parentNode.querySelector('input');
    let quantity = parseInt(input.value);

    quantity++;
    input.value = quantity;
}

/*  DODAWNAIE PRODUKTÓW */
function addNewProduct(id, name, price, imageUrl, categories, des) {
    // Tworzenie kontenera produktu
    const productContainer = document.createElement('div');
    productContainer.classList.add('product');


    // Dodawanie obrazka produktu
    const productImage = document.createElement('img');
    productImage.src = imageUrl;
    productImage.style.width = '120px';
    productImage.style.height = '120px';
    productImage.setAttribute("des", des);
    productImage.addEventListener('click', function() {
        descriptionImg.src = imageUrl;
        descriptionDiv.innerHTML = des;

        opisModal.style.display = 'block';
    });

    productContainer.appendChild(productImage);

    // Dodawanie nazwy produktu
    const productName = document.createElement('h3');
    productName.textContent = name;
    productContainer.appendChild(productName);

    // Dodawanie ceny produktu
    const productPrice = document.createElement('p');
    productPrice.textContent = `Cena: ${price/100} zł`;
    productContainer.appendChild(productPrice);

    // Dodawanie pola ilości
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');

    const minusButton = document.createElement('button');
    minusButton.classList.add('quantity-btn', 'minus');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', decrementQuantity);
    quantityContainer.appendChild(minusButton);

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.max = '99';
    quantityInput.value = '1';
    quantityInput.setAttribute('id', id);
    quantityContainer.appendChild(quantityInput);

    const plusButton = document.createElement('button');
    plusButton.classList.add('quantity-btn', 'plus');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', incrementQuantity);

    quantityContainer.appendChild(plusButton);

    productContainer.appendChild(quantityContainer);

    // Dodawanie przycisku "Dodaj do koszyka"
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.textContent = 'Dodaj do koszyka';
    addToCartButton.addEventListener('click', addToCart);
    productContainer.appendChild(addToCartButton);

    // Dodawanie produktu do sekcji "products"
    const categoryClass = replacePolishLetters(categories).replace(/\s/g, '');
    const productsSection = document.getElementById(categoryClass);
    console.log(categoryClass);
    productsSection.appendChild(productContainer);

}


document.getElementById("checkout-button").addEventListener("click", () => {
    wysylkaModal.style.display = 'block'; // Wyświetlenie modala
});


document.getElementById("submit-shipping").addEventListener("click", () => {
    const url3 = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/cart/' + cartID + "/purchase";
    console.log(url3);

    fetch(url3, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => console.error('Błąd:', error));

})

document.getElementById("recepta-button").addEventListener("click", () => {
    const url3 = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/rx';

    const item =
        {
            "code": document.getElementById('kod-input').value,
            "pesel": document.getElementById('pesel-input').value
        }

    fetch(url3, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.text())
        .then(result => {
            cartItems = [];
            console.log(result);
            const data = JSON.parse(result);
            data.items.forEach(item => {
                const item2 = { id: item.product.id, name: item.product.name, price: item.product.price / 100, quantity: item.quantity };
                cartItems.push(item2);
            });

            updateCart();
        })
        .catch(error => console.error('Błąd:', error));

})



/*
for (let i = 1; i <= 9; i++) {
    addNewProduct('Produkt '+i , 19.99 + i, 'img/cart-icon.png');
}
*/






