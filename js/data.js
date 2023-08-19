const Products = [
    {
        id: 1,
        source: 'https://basket-10.wb.ru/vol1463/part146355/146355649/images/big/1.jpg',
        price: 10500,
        name: 'Gigabyte',
        description: 'Ноутбук Gigabyte G5 GE [GE-51RU263SD]/15.6" FHD/RTX 3050',
    },
    {
        id: 2,
        source: 'https://basket-12.wb.ru/vol1671/part167148/167148732/images/big/1.jpg',
        price: 87400,
        name: 'Apple MacBook Pro 16/M2 Max/32/1 ',
        description: '(Space Grey)'
    },
    {
        id: 3,
        source: 'https://basket-05.wb.ru/vol821/part82120/82120311/images/big/1.jpg',
        price: 57300,
        name: 'Компьютер Игровой Компьютер i7',
        description: 'RX-580-8G/16G/SSD-512G/Монитор 27'
    },
    {
        id: 4,
        source: 'https://basket-08.wb.ru/vol1144/part114465/114465982/images/big/1.jpg',
        price: 87523,
        name: 'RobotComp',
        description: 'Мощный игровой компьютер Зевс 2.0 V3'
    },
];

const PRODUCT_TMP = document.querySelector('.products__item');
const PRODUCTS = document.querySelector('.products');


Products.forEach(function(item){
    // сделали копию объекта
    let product = PRODUCT_TMP.cloneNode(true);
    // удаляем  класс d-none
    product.classList.remove('d-none');
    // найди обьект по тегу img и ему устанавливаем src
    product.querySelector('img').setAttribute('src',item.source);
    product.querySelector('.products__price').textContent = item.price;
    product.querySelector('.products__name').textContent = item.description;
    // установили кнопке id
    product.querySelector('.btn').setAttribute('data-id',item.id);
    // добавить элемент в родительский блок - PRODUCTS
    PRODUCTS.append(product);
})

PRODUCTS.addEventListener('click',handlers);

function handlers(Event)
{

    let elem = Event.target

    // если нажали на кнопку
    if (elem.classList.contains('btn'))
    {
        // elem.classList.toggle('active');

        // получаем id товара 
        let id = elem.getAttribute('data-id');

        if (elem.classList.contains('active'))
        {
            elem.classList.remove('active');
            //elem.textContent = 'В корзину';
            // удалили товар из корзины
            rmProduct(id);
        }
        else
        {
            console.log('добавили товар в корзину')
            elem.classList.add('active');
            //elem.textContent = 'В корзине';
            // добавить товар
            addProduct(id);
        }
    }

     // если нажали на звезду
    if (elem.classList.contains('fa-star'))
    {
        console.log('добавили товар в избранное')
        return false
        elem.classList.toggle('active');
    }

}

// JSON.stringify - преобразуем обьект в строку
// JSON.parse - преобразуем строку в обьект
// сохраниили в браузере
// localStorage.setItem('basket', JSON.stringify(id) );

// навешиваем обработчик события при загрузки страницы
// window.addEventListener('DOMContentLoaded',Event=>{
//     console.log('DOM загружен');
// })
window.addEventListener('load',Event=>{
    console.log('Страница была полностью загружена!');

    // получаем данные из хранилища
    let storage = getStorage();

    if (storage)
    {
        console.log('Объект',storage);
        console.log('Ключи',Object.keys(storage) );
        // console.log('Значение',Object.values(storage) );
        // console.log('Ключи и значения',Object.entries(storage) );

        Object.keys(storage).forEach( idProduct =>{

            let getBtn = document.querySelector(`.btn[data-id='${idProduct}']`);

            if (getBtn)
            {
                getBtn.classList.add('active');
            }
        })
    }
    
})

// функция для добавляения товара в хранилище
function addProduct(id)
{
    let storage  = getStorage();
    // добавили id 
    storage[id] = 1;
    // сохраниили целиком объект ( который преобразовали в строку)
    localStorage.setItem('basket',JSON.stringify(storage) );
}

// удаление товара по id
function rmProduct(id)
{
    let storage = getStorage();
    // удаляем товар из объекта
    delete storage[id];
    // сохраниили целиком объект ( который преобразовали в строку)
    localStorage.setItem('basket',JSON.stringify(storage) );
}

// функция для получения данных из хранилища
function getStorage()
{
    let storage = localStorage.getItem('basket');
    // если данные есть возвращаем
    if (storage) 
    return JSON.parse(storage)
    else
    return {};
}
