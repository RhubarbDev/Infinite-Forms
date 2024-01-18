const threshold = 500;
const regex = /(?<!\d)(\d+)(?!\d)/g;

const listDiv = document.querySelector('div[role="list"]');
const element = listDiv.querySelector('[role="listitem"]:has(.AgroKb)'); // .AgroKb being text input
const textItem = element.cloneNode(true);

const defaultText = "nothing to see here."

const serious = [
    "A serious question",
    "Another serious question"
]

const silly = [
    "A silly question",
    "Another silly question"
]

// I don't like this but I'm being lazy
let currentSerious = JSON.parse(JSON.stringify(serious));
let currentSilly = JSON.parse(JSON.stringify(silly));

function generateText() {
    currentSerious.length === 0 ? currentSerious = JSON.parse(JSON.stringify(serious)) : null;
    currentSilly.length === 0 ? currentSilly = JSON.parse(JSON.stringify(silly)) : null;
    const length = currentSerious.length + currentSilly.length;
    const probability = currentSerious.length / length;
    const arr = Math.random() < probability ? currentSerious : currentSilly;

    return arr.length === 0 ? defaultText : arr.splice(Math.floor(Math.random() * arr.length), 1)[0];
}

function getRandomNumber(length) {
    const min = 1 * 10 ** (length - 1);
    const max = 9 * 10 ** (length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addItem() {

    if(!listDiv || !element) return;

    const clone = textItem.cloneNode(true);
    const cloneTitle = clone.querySelector(".M7eMe"); // .M7eMe being title text
    if (cloneTitle) {
        cloneTitle.textContent = generateText();
    }

    const cloneDataParams = clone.children[0].getAttribute("data-params");
    if (cloneDataParams) {
        const randomNumber = getRandomNumber(10);

        let count = 0;
        const newParams = cloneDataParams.replace(regex, function(match) {
            return ++count === 3 ? randomNumber : match;
        });

        clone.children[0].setAttribute("data-params", newParams);
    }

    listDiv.appendChild(clone);
}

function isNearBottom(Y) {
    var documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    );

    return Y > documentHeight - window.innerHeight - threshold;
}

let lastY = 0;

function checkPosition() {
    let Y = window.scrollY;
    const nearBottom = isNearBottom(Y);
    const scrollingDown = Y > lastY;
    lastY = Y;
    if(nearBottom && scrollingDown) addItem();
}

window.addEventListener('scroll', checkPosition);