const link = document.querySelector('a');
const attribute = link.getAttribute('href');
console.log(attribute);
link.setAttribute('href', 'https://www.google.bg/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png');
link.setAttribute('target', '_blank');
const img = document.querySelector('img');
img.setAttribute('src', 'https://img2.sportal.bg/images/header/logo.png');

(document.getElementsByTagName('body')[0]).style.background = 'black';
