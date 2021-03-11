let template = document.getElementById("ownerContentTemplate");

for (let i = 0; i < 10; i++) {

  let clone = template.content.cloneNode(true);

  document.getElementById("ownerEventContents").appendChild(clone);

}