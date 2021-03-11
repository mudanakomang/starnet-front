let template = document.getElementById("eventCategoryContentTemplate");

for (let i = 0; i < 16; i++) {

  let clone = template.content.cloneNode(true);

  document.getElementById("eventCategoryContents").appendChild(clone);

}