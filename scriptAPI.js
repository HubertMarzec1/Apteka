// Funkcja pobierająca dane z API
function fetchData() {
    var url = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/product';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Wystąpił błąd podczas pobierania danych.');
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                addNewProduct(data[i].product.name, data[i].product.price, data[i].product.imageURL)
            }
        })
        .catch(error => {
            console.log(error);
        });

}

// Wywołanie funkcji pobierającej dane po załadowaniu strony
window.onload = fetchData;

