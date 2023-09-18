// Define consts
const [ delayMin, delayMax ] = [0, 14];
const [ speedMin, speedMax ] = [12, 18];
const [ blinkMin, blinkMax ] = [1, 4];

// Process headlines imported in HTML as headlines.js
let headlines = blueValleyHeadlines;

// Shuffle them array with Fisher-Yates algorithm
function shuffle(arr) {
  var i = arr.length,
    j,
    temp;
  while (--i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
}
shuffle(headlines);

// Function to generate a single HTML span for a headline
function generateSingleSentimentSpan(headlineObj) {
  const color = headlineObj.isPositive
    ? "var(--positive-color)"
    : "var(--negative-color)";
  const text = headlineObj.headline;
  return `<span style="color: ${color}; filter: drop-shadow(0 0 0.5rem ${color});">${text}</span>`;
}

// Get the ticker container
const ticker = document.getElementById("ticker");

// Populate the ticker with ticker-inner divs
headlines.forEach((headlineObj, index) => {
  const delay = (delayMin + Math.random() * delayMax) - ((delayMax-delayMin)/2);
  const scrollSpeed = speedMin + Math.random() * speedMax;
  const blinkSpeed = blinkMin + Math.random() * blinkMax;

  const tickerInner = document.createElement("div");
  tickerInner.classList.add("ticker-inner");
  tickerInner.style.animation = `scroll ${scrollSpeed}s linear infinite, blink-random ${blinkSpeed}s ease-in-out infinite`;
  tickerInner.style.animationDelay = `${delay}s`;
  tickerInner.innerHTML = generateSingleSentimentSpan(headlineObj);
  ticker.appendChild(tickerInner);
});
