function hamburger() {
  document.getElementById("line1").classList.toggle("line_1");
  document.getElementById("line2").classList.toggle("line_2");
  document.getElementById("line3").classList.toggle("line_3");
  document.getElementById("SpNav").classList.toggle("in");
  console.log("OK");
}
document.getElementById("Hamburger").addEventListener("click", function() {
  hamburger();
});
