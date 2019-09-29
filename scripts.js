createGrid(16);

function createGrid(gridSize) {
    let gridArea = document.getElementById("grid-area");

    gridArea.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    for (let i = 0; i < gridSize ** 2; i++) {
        const div = document.createElement("div");
        const para = document.createElement("p");

        gridArea.appendChild(div);
    }
}

