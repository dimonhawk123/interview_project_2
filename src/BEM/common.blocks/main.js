/* 
Так как отправляя запрос с локальной 
страницы мы не сможем получить разрешение 
от удалённой стороны и не получим заголовок
Access-Control-Allow-Origin, то мы вынуждены использовать 
прокси
*/
let proxyCORS = 'https://cors-anywhere.herokuapp.com/';
let requestLink = 'https://registry.npmjs.org/';
//получаем необходимые DOM элементы
let search = document.querySelector('.search__field');
let npmName = document.querySelector('.npmName');
let npmInstall = document.querySelector('.npmInstall');
let npmLink = document.querySelector('.npmLink');
let npmDownload = document.querySelector('.npmDownload');
let errorText = document.querySelector('.main__error-text');
let firstText = document.querySelector('.main__first-text');
let secondText = document.querySelector('.main__second-text');
let timer;
let version;
let versionLink; 
let response;
let data;
//объявляем Set для отслеживания нажатия кнопок 
let set = new Set();

async function message() {
    // отправляем запрос по указанному нами url, 
    //ответ записывается в переменну response    
    response = await fetch(proxyCORS + requestLink + search.value);
    // если код HTTP-статуса в диапазоне от 200 до 299
    if (response.ok) {
        errorText.style.display = 'none';

        if (search.value === '') {
            firstText.style.display = 'block';
            secondText.style.display = 'none';            
        } else {
            // получаем тело ответа в формате json
            data = await response.json();
            
            npmName.innerText = data.name;   
            npmInstall.innerText = `npm -install ${data.name}`;  
            npmLink.innerText = `https://www.npmjs.com/package/${data.name}`;
            npmLink.href = `https://www.npmjs.com/package/${data.name}`;

            // получаем ссылку на скачивание последней версии искомого модуля 
            version = Object.values(data.versions);
            versionLink = version[version.length - 1].dist.tarball;
            npmDownload.innerText = versionLink;
            npmDownload.href = versionLink;    

            firstText.style.display = 'none';
            secondText.style.display = 'block';            
        }  
    } else {
        firstText.style.display = 'none';
        secondText.style.display = 'none';
        errorText.style.display = 'block';
    }
}

// обрабатываем нажатие клавиш 
// при нажатии добавляем физический код клавиши в Set
// используем Set, чтобы хранить только уникальное значение нажатой клавиши
// (это необходимо при зажатии клавиши)
search.onkeydown = function(event) {
    set.add(event.code);
    clearTimeout(timer);
}

// Обрабатываем отжатие клавиш 
// При отжатии клавиши, удаляем её физический код из Set
// и проверяем, чтобы Set был пустой
// Это необходимо для того, чтобы не отправлять несколько запросов
// при нажатии нескольких клавиш одновременно
// Также имеется задержка на отправку запроса 
// для того, чтобы успеть написать запрос в search
search.onkeyup = function(event) {
    set.delete(event.code);
    if (set.size == 0) {
        timer = setTimeout(message, 700);
    }    
}