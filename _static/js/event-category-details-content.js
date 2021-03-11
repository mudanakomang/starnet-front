let template = document.getElementById("contentTemplate");

for (let i = 0; i < 6; i++) {

  let clone = template.content.cloneNode(true);

  document.getElementById("eventContents").appendChild(clone);

}

let ownerContentTemplate = document.getElementById("ownerContentTemplate");

for (let i = 0; i < 6; i++) {

  let clone = ownerContentTemplate.content.cloneNode(true);

  document.getElementById("ownerContents").appendChild(clone);

}