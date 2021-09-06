const n = localStorage["n"]
const m = localStorage["m"]

const x = n * 35
const y = m * 35

window.moveTo(300, 150)
window.resizeTo(y + 60, x + Math.min(25 * n, 250))

add()

function add() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            name = `<img id = "${i}, ${j}", src = "text/cell.png", style="height: 35px; width: 35px;"}>`
            document.getElementById("ADD").insertAdjacentHTML("beforeend", name)
        }
    }
}
window.onresize = function() {
    window.resizeTo(y + 60, x + Math.min(25 * n, 250))
}