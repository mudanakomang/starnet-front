let ownerContentTemplate = document.getElementById("ownerContentTemplate");

for (let i = 0; i < 10; i++) {

  let clone = ownerContentTemplate.content.cloneNode(true);

  document.getElementById("ownerContents").appendChild(clone);

}