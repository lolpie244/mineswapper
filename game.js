let cells = []
let game = 1
let bomb = localStorage["bombs"]
let flag = 0
let count_of_used = n * m - bomb
let first_click = 0
let st = 0
const flag_obj = document.getElementById("flag")
const bombs_count = document.getElementById("bombs_count")

bombs_count.innerText = `- ${bomb}`


for (let i = 0; i < n; i++) {
    let a = []
    for (let j = 0; j < m; j++)
        a.push(new Object({ used: 0, count: 0 }))
    cells.push(a)
}


function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cout() {
    for (let k = 0; k < n; k++)
        for (let p = 0; p < m; p++) {
            const objj = document.getElementById(`${k}, ${p}`)
            objj.src = `text/${cells[k][p].count}.png`
        }
}

function start() {
    for (let w = 0; w < bomb; w++) {
        let i = Random(0, n - 1)
        let j = Random(0, m - 1)
        while (cells[i][j].count == -1) {
            i = Random(0, n - 1)
            j = Random(0, m - 1)
        }
        cells[i][j].count = -1
    }
    for (let i = 0; i < n; i++)
        for (let j = 0; j < m; j++) {
            if (cells[i][j].count == -1)
                continue
            for (let k = -1; k <= 1; k++)
                for (let v = -1; v <= 1; v++)
                    if (i + k >= 0 && i + k < n && j + v >= 0 && j + v < m && cells[i + k][j + v].count == -1)
                        cells[i][j].count++
        }

}
start()

function flag_button() {
    flag = !flag
    if (flag)
        flag_obj.src = "text/use_flag.png"
    else
        flag_obj.src = "text/don`t_use_flag.png"
}

function count_of_flag(i, j) {
    let sum = 0
    for (let k = -1; k <= 1; k++)
        for (let v = -1; v <= 1; v++)
            if (i + k >= 0 && i + k < n && j + v >= 0 && j + v < m && cells[i + k][j + v].used == 3)
                sum++
                return sum
}

function game_over(obj) {
    obj.src = "text/-1.png"
    game = 0
    bombs_count.style.fontSize = "25px"
    bombs_count.innerText = `Ви програли`
    flag_obj.remove()
    setTimeout(() => { cout() }, 2000)
    setTimeout(() => { window.close() }, 4500)
}

function game_win() {
    if (game == 1) {
        game = 0
        let ed = Date.now()
        st = ed - st
        let sek = parseInt(st / 1000)
        st = sek
        sek %= 60
        bombs_count.style.fontSize = "25px"
        bombs_count.innerText = `Ви перемогли з часом:` + '\n' + `${Math.floor(st / 60)} хвилин, ${sek} секунд`
        flag_obj.remove()
        setTimeout(() => { window.close() }, 5500)
    }
}

function rec(i, j, f, str) {
    if (count_of_used == 1)
        game_win()
    if (i < 0 || i >= n || j < 0 || j >= m || cells[i][j].used == 3)
        return
    if (cells[i][j].used == 1 && str == 1)
        return
    const obj = document.getElementById(`${i}, ${j}`)
    if (cells[i][j].count == -1)
        game_over(obj)
    obj.src = `text/${cells[i][j].count}.png`
    if (cells[i][j].used == 0)
        count_of_used--
        cells[i][j].used = 1
    if (cells[i][j].count > 0 && str == 1)
        return
    if (cells[i][j].count != count_of_flag(i, j))
        return
    rec(i - 1, j - 1, f, 1)
    rec(i - 1, j, f, 1)
    rec(i - 1, j + 1, f, 1)

    rec(i, j - 1, f, 1)
    rec(i, j + 1, f, 1)

    rec(i + 1, j - 1, f, 1)
    rec(i + 1, j, f, 1)
    rec(i + 1, j + 1, f, 1)
}

function cell(obj, i, j, event) {
    if (!game)
        return
    if (first_click == 0) {
        st = Date.now()
        first_click = 1
        console.dir(st)
    }
    if (flag || event.which == 3) {
        if (cells[i][j].used == 0 && bomb > 0) {
            obj.src = "text/flag_cell.png"
            bomb--
            cells[i][j].used = 3
        } else
        if (cells[i][j].used == 3) {
            obj.src = "text/empty_cell.png"
            bomb++
            cells[i][j].used = 0
        }
        bombs_count.innerText = `- ${bomb}`
        return
    }
    if (cells[i][j].used == 3)
        return
    if (cells[i][j].count == -1) {
        game_over(obj)
    }
    if (event.which == 1)
        rec(i, j, cells[i][j].used, 0)

}

function on_obj(obj, i, j) {
    if (!game)
        return
    if (!cells[i][j].used)
        obj.src = "text/empty_cell.png"
}

function out_obj(obj, i, j) {
    if (!game)
        return
    if (!cells[i][j].used)
        obj.src = "text/cell.png"
}
function key(event)
{
    if(event.keyCode == 70)
        flag_button();
}
for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
        const obj = document.getElementById(`${i}, ${j}`)
        obj.ondragstart = function() {
            return false;
        };
        obj.addEventListener("mousedown", function(event) { cell(obj, i, j, event) })
        obj.addEventListener("mouseover", function(event) { on_obj(obj, i, j, event) })
        obj.addEventListener("mouseout", function() { out_obj(obj, i, j) })
    }
flag_obj.addEventListener("mousedown", function() { flag_button() })
document.addEventListener("keydown", function(event){key(event)});
