let cartID;

// Funkcja pobierająca dane z API
function fetchData() {
    var url = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/products';
    //var set = new Set();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas pobierania danych.');
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                    addNewProduct(data[i].id, data[i].name, data[i].price, data[i].imageURL, data[i].category)
            }
        })
        .catch(error => {
            console.log(error);
        });
        //console.log(set);
}

function addNewCart() {
    var url = "https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/cart";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(result => {
            cartID = JSON.parse(result).id;
            console.log(cartID);
        })
        .catch(error => console.error('Błąd:', error));
}

function addItemToCart(id, quantity) {

    const itemsToAdd = [
        {
            "productID": id,
            "quantity": quantity
        }
    ];

    const url3 = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/cart/' + cartID + "/add";
    console.log(url3);

    fetch(url3, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemsToAdd)
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => console.error('Błąd:', error));
}

function removeItem(id) {
    console.log(id);
    const itemsToRemove =
        {
            "itemID": id
        };

    const url3 = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/cart/' + cartID + "/delete";
    console.log(url3);

    fetch(url3, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemsToRemove)
    })
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => console.error('Błąd:', error));
}

function updateItem(id) {

    console.log(id);
    const itemsToUpdate =
        {
            "itemID": id
        };

}


// Wywołanie funkcji pobierającej dane po załadowaniu strony
window.onload = () => {
    fetchData();
    addNewCart();
}
console.log(cartID)
