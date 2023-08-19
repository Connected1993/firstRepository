const DRAGZONE = document.querySelector('.dragZone');
// разрешенные типы загрузки файлов
const IMAGES = ['png', 'jpg', 'jpeg', 'webp', 'svg'];
const OTHER = ['zip', 'rar', '7z'];
const MAP = {
    zip: 'fa-solid fa-file-zipper',
    default: 'fa-solid fa-file'
}
const MAXSIZE = 20 * (1024 ** 2) // bytes
const PREVIEW = document.querySelector('.dragZone__preview');

let data = null;

DRAGZONE.addEventListener('dragenter', Event => {
    Event.preventDefault();
    console.log('dragenter');
});

DRAGZONE.addEventListener('dragleave', Event => {
    Event.preventDefault();
    console.log('dragleave');
});

DRAGZONE.addEventListener('dragover', Event => {
    Event.preventDefault();
    console.log('dragover');
});

DRAGZONE.addEventListener('drop', Event => {
    Event.preventDefault();
        // очистка
    PREVIEW.innerHTML = '';
    // объект с входящими файлами
    let files = Event.dataTransfer.files;

    // если старом массиве файлы есть
    if (data) {

        Array.from(files).forEach(file => {
            let add = null
            // массив с старыми файлами ( если есть )
            data.forEach(oldFile => {
                if (file.size === oldFile.size) add = true
            })

            // доб файл если отсутствует в data
            if (!add && validationFile(file) ) {
                data.push(file);
            }
        })
    }

    else 
    {
         // объект с входящими файлами
        tmp = Array.from(files);
        data = [];
        tmp.forEach(file=> { if (validationFile(file)) data.push(file) } )
    }


    if (data.length)
    {
        // перебор файла
        for (let file of data) {
            let getType = file.name.split('.').pop();
            // для изображений
            if (IMAGES.includes(getType) && file.size <= MAXSIZE) {
                // генерируем ссылку для изображения 
                let url = URL.createObjectURL(file);
                PREVIEW.insertAdjacentHTML('afterbegin', `
                    <div class="dragZone__img">
                        <img src="${url}">
                        <i data-size="${file.size}" class="close fa-solid fa-circle-xmark fa-2xs"></i>
                    </div>`);
            }

            if (OTHER.includes(getType) && file.size <= MAXSIZE) {
                let url = (MAP[getType]) ? MAP[getType] : MAP.default;
                PREVIEW.insertAdjacentHTML('afterbegin', `
                    <div class="dragZone__img">
                        <i class="${url}"></i>
                        <i data-size="${file.size}" class="close fa-solid fa-circle-xmark fa-2xs"></i>
                    </div>`);
            }
        }
    }
});

PREVIEW.addEventListener('click', Event => {

    let elem = Event.target;
    if (elem.classList.contains('close')) {
        // получаем размер удаляемого файла
        let fSize = elem.getAttribute('data-size');
        // удаляем элемент визуально
        elem.parentNode.remove();
        // удаляем файл с массива
        data.forEach((file,idx)=>{
            if (file.size == fSize) data.splice(idx,1);
        })
    }
})


function validationFile(file)
{
    // расширение файла
    let getType = file.name.split('.').pop();
    let AllExtensions = [];
    // склеили все массивы
    AllExtensions = AllExtensions.concat(IMAGES,OTHER);
    // проверка на валидность расширения и размера
    if (AllExtensions.includes(getType) && file.size <= MAXSIZE)
    {
        return file;
    }
    return false;
}

function upload() {
    fetch('to do url',{
        method:"POST",
        body: data 
    })
    .then(responce => responce.json())
    .then(success=>console.log('success uploades'))
    .catch(err=>console.warn(err));
}

