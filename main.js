
//Funzione di creazione della griglia dinamica
function createGrid () {

    const bombNumber = 16;
    //Avvio un ciclo che stampi un numero definito di celle con all'interno ogni iterazione di i

    for (let i = 1; i <= cellNumb; i++) {

        const node = document.createElement("div");
        node.classList.add("cell");
        node.classList.add(cellMax);
        node.append(i);

        grid.appendChild(node);

        //Aggiungo un ascoltatore di eventi al click
        node.addEventListener("click", blockCellSelect);

        
    }

    //Il programma genera le bombe
    generateBomb(bombNumber, cellNumb);    

    //FUNZIONI DI SERVIZIO
    function blockCellSelect () {
        console.log(this);
        this.classList.add("select");
        this.removeEventListener("click", blockCellSelect);
    }

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

}


const grid = document.getElementById("grid");

const startGame = document.getElementById("start");
const optionDifficulty = document.getElementById("selection");
console.log(optionDifficulty.value);

let cellNumb;
let cellMax;

//Aggiungo un ascoltatore di eventi al pulsante PLAY che al click selezioni la difficoltà e crei la griglia apposita
startGame.addEventListener("click",
    function() {

        grid.innerHTML = "";
        

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

