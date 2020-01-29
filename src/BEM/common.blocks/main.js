let timer;
let proxyCORS = 'https://cors-anywhere.herokuapp.com/';
let requestLink = 'https://registry.npmjs.org/';
let search = document.querySelector('.search__field');
let npmName = document.querySelector('.npmName');
let npmInstall = document.querySelector('.npmInstall');
let npmLink = document.querySelector('.npmLink');
let npmDownload = document.querySelector('.npmDownload');
let errorText = document.querySelector('.main__error-text');
let firstText = document.querySelector('.main__first-text');
let secondText = document.querySelector('.main__second-text');
let version;
let arr; 
let response;
let data;

async function message() {
    response = await fetch(proxyCORS + requestLink + search.value);
    if (response.ok) {
        errorText.style.display = 'none';
        
        if (search.value === '') {
            firstText.style.display = 'block';
            secondText.style.display = 'none';            
        } else {
            data = await response.json();
            
            npmName.innerText = data.name;   
            npmInstall.innerText = `npm -install ${data.name}`;  
            npmLink.innerText = `https://www.npmjs.com/package/${data.name}`;
            npmLink.href = `https://www.npmjs.com/package/${data.name}`;

            version = Object.values(data.versions);
            arr = version[version.length - 1].dist.tarball;
            npmDownload.innerText = arr;
            npmDownload.href = arr;    

            firstText.style.display = 'none';
            secondText.style.display = 'block';            
        }  
    } else {
        firstText.style.display = 'none';
        secondText.style.display = 'none';
        errorText.style.display = 'block';
    }
}

search.onkeydown = function() {
    clearTimeout(timer);
}

search.onkeyup = function() {
    timer = setTimeout(message, 700);
}