var divs = document.querySelectorAll('div[class*="logo"]');

for (const div of divs) {
    if(div.lastChild.nodeName.toLowerCase() === 'a')
    {
        div.lastChild.setAttribute('href','#');
        div.lastChild.lastChild.setAttribute('src','../images/flojics-logo.png');
    }
}
