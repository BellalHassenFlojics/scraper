let allElements = [] ;

allElements.push(...document.getElementsByTagName('p'));

allElements.push(...document.getElementsByTagName('h1'));
allElements.push(...document.getElementsByTagName('h2'));
allElements.push(...document.getElementsByTagName('h3'));
allElements.push(...document.getElementsByTagName('h4'));
allElements.push(...document.getElementsByTagName('h5'));

allElements.push(...document.getElementsByTagName('div'));
// ✅ Loop through all elements (including html, head, meta, scripts)
for (const element of allElements) {
if (element.tagName.toLowerCase() !== 'div')
element.innerText = 'Flojics';
else{
console.log(element.lastChild.innerText)
element.lastChild.innerText = 'Flojicsss'
}
}
