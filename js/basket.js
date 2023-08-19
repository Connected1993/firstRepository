const CONTAINER = document.querySelector('.basket');
const ITEM_TMP = CONTAINER.querySelector('.basket__item');

function renderProduct(Products)
{
    for(let i=0; i < Products.length; i++ )
    {
        let data = Products[i];
        // делаем копию верстки
        let clone = ITEM_TMP.cloneNode(true);
        clone.setAttribute('data-id',data.id);
        clone.querySelector('img').src = data.source;
        clone.querySelector('.item__name').textContent = data.name;
        clone.querySelector('.item__price').textContent = data.price;
        clone.querySelector('.item__description').textContent = data.description;
        clone.classList.remove('d-none');
        // добавить в контейнер 
        CONTAINER.append(clone);
    }

    HISTORY = localStorage.getItem(STORAGE);
    renderTotal();
}