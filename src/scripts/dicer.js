'Strict Mode';
let currentDiceValues = {};
let rollTemplate = '';
let rollsElm = {};
let isEmpty;

// Takes the current dice and add it's to the DOM.
function captureRoll() {
  if (isEmpty) {
    rollsElm.innerHTML = '';
  }
  isEmpty = false;
  rollsElm.innerHTML += rollTemplate
    .replace(
      '{rollIndex}',
      (rollsElm.innerHTML.match(/<table/gim) || []).length + 1
    )
    .replace('{die1}', currentDiceValues.die1)
    .replace('{die2}', currentDiceValues.die2);
}

// Removes all dice from the DOM.
function clearRolls() {
  rollsElm.innerHTML = '<h3>No Roles Captured Yet!</h3>';
  isEmpty = true;
}

//Initializes the randomization of the die
(() => {
  const ran = () => Math.floor(Math.random() * 6) + 1;
  const die1Elm = document.getElementById('die1');
  const die2Elm = document.getElementById('die2');
  rollsElm = document.getElementById('rolls');
  //In the markup I had to change "img src" to "img [src]" to avoid having the browser load invalid images on load
  rollTemplate = rollsElm.innerHTML.replace(/\[src\]/gim, 'src');
  clearRolls();
  setInterval(() => {
    currentDiceValues = {
      die1: `./assets/images/dice${ran()}.png`,
      die2: `./assets/images/dice${ran()}.png`
    };
    die1Elm.src = currentDiceValues.die1;
    die2Elm.src = currentDiceValues.die2;
  }, 500);
})();
