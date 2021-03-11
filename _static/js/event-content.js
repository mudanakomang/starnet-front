let template = document.getElementById("contentTemplate");

for (let i = 0; i < 10; i++) {

  let clone = template.content.cloneNode(true);

  document.getElementById("eventContents").appendChild(clone);

}

let filterButton = document.getElementById("filterButton");
filterButton.onclick = function() {
  document.getElementById("conditions").classList.toggle("conditions-toggle");
};