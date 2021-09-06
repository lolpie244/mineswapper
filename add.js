var f = 0

const button = document.querySelector('button')
const k = document.querySelector('.k')

const b = document.querySelectorAll('h1')
const n = b[0]
const m = b[1]

const range = document.getElementById('bomb')

let nn = parseInt((window.innerHeight) / 35) - 4
nn = Math.max(3, nn)
let mm = parseInt((window.innerWidth) / 35)
range.min = Math.min(nn, mm) * 2
range.max = Math.max(mm, nn) * 2
// console.dir(n)

n.innerText = `Кількість клітинок в рядку: ${nn}`
m.innerText = `Кількість клітинок в стовпчику: ${mm}`
k.innerText = `Кількість бомб: ${range.valueAsNumber}`


function press(event) {
    console.dir(event)
    // window.close()
    const game = window.open('gamme.html', `13`, `resizeble`)
    localStorage["bombs"] = range.valueAsNumber
    localStorage["n"] = nn
    localStorage["m"] = mm
    button.remove()
    n.remove()
    m.remove()
    k.remove()
    range.remove()
    button.remove()
    document.getElementById("ADD").insertAdjacentHTML("beforeend", `<h1 style="font-size: 20px;">перезагрузіть сторінку</h1>`)
}

function res() {
    nn = parseInt((window.innerHeight) / 35) - 4
    mm = parseInt((window.innerWidth) / 35)
    nn = Math.max(3, nn)
    range.min = Math.min(nn, mm) * 2
    range.max = Math.max(mm, nn) * 2
    n.innerText = `Кількість клітинок в рядку: ${nn}`
    m.innerText = `Кількість клітинок в стовпчику: ${mm}`
    k.innerText = `Кількість бомб: ${range.valueAsNumber}`
}

function scroll() {
    k.innerText = `Кількість бомб: ${range.valueAsNumber}`
}

window.onresize = res
window.onmousemove = scroll
button.onclick = press