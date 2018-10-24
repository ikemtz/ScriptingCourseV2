'Strict Mode';
// Simply adds or removes the "show" class in repsponse to the burger being clicked.
function toggleNavBarBurger() {
  const nav = document.getElementById('navbarNav');
  const show = 'show';
  if (nav.classList.contains(show)) {
    nav.classList.remove(show);
  } else {
    nav.classList.add(show);
  }
}
// Uses an asynchronous XHR request to read the raw nav.html file and replace the <navelement> with it.
(async () => {
  const tag = 'navElement';
  const resp = await httpRequestWrapper('nav.html');
  const el = document.getElementsByTagName(tag)[0];
  if (!el) {
    console.error(`${tag} element is not defined!`);
  }
  el.outerHTML = resp;
})();
