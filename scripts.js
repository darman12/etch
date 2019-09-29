init();

function init() {
    createGrid(16);
    createListeners();

    const resetButton = document.getElementById("reset-button");
    
    resetButton.addEventListener('click', () => {
        let cells = document.querySelectorAll(".grid-cell");
        cells.forEach((cell) => {
            cell.classList.remove("invisible");
        });
    });
}

function createGrid(gridSize) {
    let gridArea = document.getElementById("grid-area");

    gridArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-cell");
        gridArea.appendChild(div);
    }
}

function createListeners() {
    let cells = document.querySelectorAll(".grid-cell");
    
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
            // cell.style.backgroundColor = "#44c2fc";
            cell.classList.toggle("invisible");
        });
    });
}