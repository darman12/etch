class Cell extends HTMLDivElement {
    constructor() {
        super();
    }

    transitionTime;
    erasureEnabled = false;

    connectedCallback() {
        this.style.transition = `${Math.random() * 2}s`;
        this.classList.add("grid-cell");

        this.addEventListener('mouseenter', this.mouseEntered);
        this.addEventListener('mousedown', this.mouseClicked);
        this.addEventListener('contextmenu', this.mouseRightButtonClicked);
    }
    
    connectedMoveCallback() {
        // Prevents Cell from being re-initialized if it is moved in the DOM,
        // per advice from https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
        return;
    }
    
    mouseEntered(event) {
        if (event.buttons === 1) {
            this.hide()
        } else if (event.buttons === 2) {
            this.show()
        }
    }

    mouseClicked() { this.hide(); }

    mouseRightButtonClicked() { this.show(); }

    hide() {
        this.classList.add("invisible")
    }

    show() {
        this.classList.remove("invisible")
    }

}

customElements.define("grid-cell", Cell, { extends: "div" });

class Settings {
    constructor() {
        return;
    }
    eraseEnabled = true;
}

/*****************************************************************************/

init(16);

function init(gridSize) {
    createGrid(gridSize);

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener('click', reset);
    
    const resizeButton = document.getElementById("resize-button");
    resizeButton.addEventListener('click', resizeGrid);
}

function createGrid(gridSize) {
    let gridArea = document.getElementById("grid-area");

    gridArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const cell = document.createElement("div", { is: "grid-cell" });
        gridArea.appendChild(cell);
    }
}

function reset() {
    let cells = getCells();
    cells.forEach((cell) => {
        cell.show();
    });
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}
   
function promptForNumber() {
    let processed_input
    do {
	let raw_input = prompt("Enter a number between 2 and 25:");
	    if (raw_input === null) { return null }
	processed_input = Number(raw_input)
    } while (!isNumeric(processed_input) || processed_input < 2 || processed_input > 25)
    return processed_input
}	  

function resizeGrid() {
    new_size = promptForNumber()
    if (new_size === null) { return }
    cells = getCells();
    cells.forEach((cell) => {
        cell.parentNode.removeChild(cell);
    });
    init(new_size)
}

function getCells() {
    return document.querySelectorAll(".grid-cell");

}
