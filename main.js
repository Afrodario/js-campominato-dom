
//Funzione di creazione della griglia dinamica
function createGrid () {

    const bombNumber = 16;
    const attempts = [];
    const maxAttempts = 10;
    //Avvio un ciclo che stampi un numero definito di celle con all'interno ogni iterazione di i

    for (let i = 1; i <= cellNumb; i++) {

        const node = document.createElement("div");
        node.classList.add("cell");
        node.classList.add(cellMax);
        node.append(i);

        grid.appendChild(node);

        //Aggiungo un ascoltatore di eventi al click
        node.addEventListener("click", cellSelect);

        
    }

    //Il programma genera le bombe
    const pumpkinBombs = generateBomb(bombNumber, cellNumb);    

    //FUNZIONI DI SERVIZIO

    //Funzione di selezione celle
    function cellSelect () {
        console.log(this);
        this.classList.add("select");
        this.removeEventListener("click", cellSelect);

        const cellClick = parseInt(this.innerText);

        //Condizioni di click su bomba
        if (pumpkinBombs.includes(cellClick)) {
            this.classList.add("bomb");
            alert("Una bomba zucca è detonata! Devi abbandonare l'edificio!");
            endGame();

        } else {
            attempts.push(cellClick);
            console.log(attempts);
            counter.innerHTML = ("Ostaggi tratti in salvo: " + attempts.length);

            if (attempts.length >= maxAttempts) {
                alert("Il Daily Bugle è stato completamente evacuato!");
                endGame();
            }

        }

    }

    //Funzione di generazione bombe
    function generateBomb (bombNumber, cellNumb) {
        const bombArray = [];
        while (bombArray.length < bombNumber) {
            const singleBomb = randomNumber(1, cellNumb);
            if (!bombArray.includes(singleBomb)) {
                bombArray.push(singleBomb);
            }
            
            console.log(bombArray);
        }
        return bombArray;
        
    }

    //Funzione di fine gioco
    function endGame() {
        const cellBoxes = document.getElementsByClassName("cell");
        for (let i = 0; i < cellBoxes.length; i++) {

            if (pumpkinBombs.includes(parseInt(cellBoxes[i].innerText))) {
                cellBoxes[i].classList.add("bomb");
                cellBoxes[i].innerHTML = ("<img src='img/pumpkin-bomb.png'>");
            }

            cellBoxes[i].removeEventListener("click", cellSelect);

        }

        const score = attempts.length;
        result.innerHTML = ("Sei riuscito a salvare " + score + " ostaggi prima che il palazzo esplodesse!");

        if (score == maxAttempts) {
            result.append(" Tutti gli ostaggi sono stati tratti in salvo!");
        } else {
            result.append(" Prova ancora!");
        }

    }

}


const grid = document.getElementById("grid");
const result = document.getElementById("final-result");
const counter = document.getElementById("counter");

const startGame = document.getElementById("start");
const optionDifficulty = document.getElementById("selection");
console.log(optionDifficulty.value);

let cellNumb;
let cellMax;

//Aggiungo un ascoltatore di eventi al pulsante PLAY che al click selezioni la difficoltà e crei la griglia apposita
startGame.addEventListener("click",
    function() {

        grid.innerHTML = "";
        result.innerHTML = "";
        counter.innerHTML = "";
        

        if (optionDifficulty.value == "easy") {

            cellNumb = 100;
            cellMax = ("easy-grid");
            createGrid();
           

        } else if (optionDifficulty.value == "hard") {
            
            cellNumb = 81;
            cellMax = ("hard-grid");
            createGrid();
            
            

        } else {

            cellNumb = 49;
            cellMax = ("crazy-grid");
            createGrid();
            
            

        }
        
    }

)

//Funzione di generazione numeri casuali
function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

