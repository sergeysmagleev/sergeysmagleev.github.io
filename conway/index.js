const canvas = document.getElementById('canvas-container')
const ctx = canvas.getContext('2d')
ctx.scale(2, 2);

var sourceArray = Array(50).fill(false).map(x => Array.from({length: 100}, () => Math.random() < 0.5))

function drawGrid(input) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'Gainsboro'
    ctx.fillStyle = 'black'
    ctx.lineWidth = 0.5;
    for (i = 0; i < input.length; i++) {
        for (j = 0; j < input[0].length; j++) {
            ctx.beginPath()
            ctx.rect(j * 5, i * 5, 5, 5)
            ctx.stroke()
            if (input[i][j]) {
                ctx.beginPath()
                ctx.rect(j * 5, i * 5, 5, 5)
                ctx.fill()
            }
        }
    }
}

function loop() {
    nextInteration()
    setTimeout(function() {
        loop()
    }, 500)
}

function nextInteration() {
    var next = Array(50).fill(false).map(x => Array(100).fill(false))
    for (i = 0; i < sourceArray.length; i++) {
        for (j = 0; j < sourceArray[0].length; j++) {
            var neighbors = 
            checkNeighbor(sourceArray, i - 1, j - 1) + 
            checkNeighbor(sourceArray, i - 1, j) + 
            checkNeighbor(sourceArray, i - 1, j + 1) + 
            checkNeighbor(sourceArray, i, j + 1) + 
            checkNeighbor(sourceArray, i + 1, j + 1) + 
            checkNeighbor(sourceArray, i + 1, j) + 
            checkNeighbor(sourceArray, i + 1, j - 1) +
            checkNeighbor(sourceArray, i, j - 1)
            if (neighbors < 2 || neighbors > 3) {
                next[i][j] = false
            } else if (neighbors == 3) {
                next[i][j] = true
            } else {
                next[i][j] = sourceArray[i][j]
            }
        }
    }
    sourceArray = next
    drawGrid(sourceArray)
}

function checkNeighbor(arr, i, j) {
    if (i < 0 || j < 0 || i >= arr.length || j >= arr[0].length) {
        return 0
    }
    return arr[i][j]
}

loop()