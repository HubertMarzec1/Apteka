// Funkcja pobierająca dane z API
function fetchData(category) {
    var url = 'https://pharmacy-umcs-2th7ejkd5a-lz.a.run.app/product';
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
                for (let j = 0; j < data[i].product.categories.length; j++) {
                    addNewProduct(data[i].product.name, data[i].product.price, data[i].product.imageURL, data[i].product.categories[j])
                }
            }
        })
        .catch(error => {
            console.log(error);
        });
        //console.log(set);
}

// Wywołanie funkcji pobierającej dane po załadowaniu strony
window.onload = fetchData;

