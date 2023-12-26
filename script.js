let board = document.querySelector(".board")
let n = 16
let images = [
    "./img/img1.png",
    "./img/img2.png",
    "./img/img3.png",
    "./img/img4.png",
    "./img/img5.png",
    "./img/img6.png",
    "./img/img7.png",
    "./img/img8.png",
    "./img/img1.png",
    "./img/img2.png",
    "./img/img3.png",
    "./img/img4.png",
    "./img/img5.png",
    "./img/img6.png",
    "./img/img7.png",
    "./img/img8.png",
]
let divs = []
for (let i = 0; i < n; i++) {
    let order = Math.floor(Math.random() * 30)
    let div = document.createElement("div")
    divs.push(div)
    div.style.order = order;
    div.innerHTML = `<img src="${images[i]}" alt="img">`
    board.appendChild(div)
}
let card1, card2;
let disableDeck = false
let correct = 0

function flipCard(e) {
    let clickCard = e.target;
        if (clickCard !== card1 && !disableDeck) {
            clickCard.parentElement.classList.add("flip")
            if (!card1) {
                return card1 = clickCard
            }
            card2 = clickCard
            disableDeck = true
            let card1Img = card1.src,
                card2Img = card2.src;
            matchCard(card1Img, card2Img)
    }
}

let timer;
let time = document.querySelector("#time")

let ttl = 0;
let display = document.createElement("div");
display.className = "displayWon";
display.style.width = "300px";
display.style.height = "300px";
display.style.background = "rgb(0,0,255,0.8)";
display.style.borderRadius = "10px";
display.style.transform = "translate(-50%,-50%)";
display.style.position = "absolute";
display.style.top = "50%";
display.style.left = "50%";
display.style.display = "none";
display.style.alignItems = "center";
display.style.justifyContent = "center";
display.style.fontSize = "22px";
display.style.fontFamily = "Bird";
display.style.fontWeight = "700";
display.style.color = "azure";
display.style.transition = "0.9s ease-in-out";
document.querySelector("body").appendChild(display)
function matchCard(img1, img2) {
    let total = document.querySelector(".moves")
    if (img1 === img2) {
        restart.disabled = false
        
        ttl += 10;
        total.innerHTML = ttl + "  (+10)";
        total.style.color = "lime"
        correct++;
        if (correct === 8) {
            clearInterval(timer)
            display.style.display = "flex";
            display.innerText = `Yutdingiz! ${sec + 1} s. ${ttl}$`
            setTimeout(() => {
                display.style.display = "none";                
            }, 4000);
        }
        card1.removeEventListener("click", flipCard)
        card2.removeEventListener("click", flipCard)
        card1 = card2 = "";
        // card1.classList.toggle("hide")
        // card2.classList.toggle("hide")
        return disableDeck = false;
    }

    total.style.color = "crimson"
    ttl -= 2;
    total.innerHTML = ttl + "  (-2)";
   setTimeout(() => {
     card1.parentElement.classList.add("shake")
     card2.parentElement.classList.add("shake")
    //  card1 = card2 = ""
   }, 800);
    
   setTimeout(() => {
     card1.parentElement.classList.remove("shake","flip")
     card2.parentElement.classList.remove("shake","flip")
       card1 = card2 = ""
       disableDeck = false
   }, 1500);
}
// console.log(divs[0].querySelector("img").src);

function displayAllCards() {
    divs.forEach(e => {
        e.classList.add("displaying")
    })
}
// displayAllCards()

let btn = document.querySelector("#btn")
let restart = document.querySelector("#return")
restart.disabled = true
let sec;
btn.onclick = () => {
    btn.disabled = true;
    sec = 60;
    timer = setInterval(() => {
        time.innerHTML = sec;
        if (sec < 10) {
            time.style.color = "red"
        }
        if (sec === 0) {
            restart.disabled = false
            
            time.innerHTML = 0
            sec = 0;
            clearInterval(timer);
            // btn.disabled = false
            divs.forEach(card => {
                displayAllCards()
                card.removeEventListener("click", flipCard)
            })
            display.style.display = "flex";
            display.innerText = `Yutqazdingiz! ${sec} s. ${ttl}$`
            setTimeout(() => {
                display.style.display = "none";                
            }, 4000);
        } else {
            sec--
            divs.forEach(card => {
                card.addEventListener("click", flipCard)
            })
        }
    }, 1000)
    
}

restart.onclick = () => {
    location.reload()
}