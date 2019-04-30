const deleteProduct = (btn, page) => { // this from product.ejs refers to btn argument here
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const productElement = btn.closest('article');
    fetch('/admin/product/' + prodId, {
        method: 'DELETE',
        headers: {
            'csrf-token': csrf,
        },
    })
        .then(
            (result) => {
                return result.json();
            })
        .then(
            (data) => {
                console.log(data);
                productElement.remove(); // in all modern brawsers
                // productElement.parentNode.removeChild(productElement); // in all browsers (IE included)
            })
        .catch(
            (err) => {
                console.log(err);
            }
        );
};

