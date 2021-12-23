
var p1 = "X"
var p2 = "O"

var Player = [p1, p2]

var winComb = [
    [0, 1, 2],[3, 4, 5],
    [6, 7, 8],[0, 3, 6],
    [1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]
]
var plyBoard = []
var cells = document.querySelectorAll('.cells')
var disPlayer = document.getElementById('disPlayer')

var idStartGam = document.querySelector("#idstr")
var count = 0
idStartGam.addEventListener('click', startGame)

function startGame() {
    for (let i = 0; i < cells.length; i++) {
        console.log('count', count)
        cells[i].addEventListener('click', cellClick)
        cells[i].innerText = ''
    }
    plyBoard = []
    disPlayer.innerText = "Player X and Player O"
}
function cellClick(e) {
    var cl = e.target.id
    ply=Player[count % 2]
    cellTurn(cl,ply)
}
function cellTurn(cnt,py) {
    plyBoard[cnt] = py
    document.getElementById(cnt).innerText = py
    count++
    if (py === 'X') {
        disPlayer.innerText = "Player X"
    }
    else {
        disPlayer.innerText = "Player O"
    }
    let gamewon = checkWin(plyBoard, py)
    //let gamewon = checkWin(py)
    if (gamewon) return gameOver(gamewon)
}
//function checkWin(ply) {
function checkWin(pb, ply) {
    let gameWon = null
    for(let [index,win] of winComb.entries()){
        var counter=0;
        for (let x = 0; x < win.length; x++) {
            let elem = win[x]
            
            //if(cells[elem].innerText === ply){
                console.log(`pb[win[x]]`, pb[win[x]])
                console.log(`pb[win[x]]`, pb)
                console.log(`win[x]`, win[x])
                if (pb[win[x]] === ply) {
                    counter++;
                }
             
                else if(pb.length ===9){
                    // debugger;
                    if(pb[win[x]] !== win[x] && counter===2 ){
                        disPlayer.innerText = `Tie between PlayerX and Player O`
                    }
                    //disPlayer.innerText = `Tie between PlayerX and Player O`
                }
                // else if(pb[win[x]] !==ply){
                //     counter--
                // }
            //}
        }
        console.log(`counter`, counter)
        if(counter === 3)
         {
            gameWon = { index: index, ply: ply }
            break;
         }
        //  else if(counter !== 3){
        //     //gameWon ='Tie'
        //     disPlayer.innerText = `Tie between PlayerX and Player O`
        //  }
    }
    return gameWon
}

// function checkWin(pb, ply) {
//     let plays = pb.reduce((a, e, i) => (e === ply) ? a.concat(i) : a, [])
    // let plays =null
    // let a=[]
    // for (let x=0; x<pb.length;x++){
    //     let e=pb[x];
    //     if(e===ply){
    //         plays = a.concat(x)
    //     }
    //     else{
    //         a,[]
    //     }
    // }
 //   console.log(`plays`, plays)
 //   let gameWon = null
    //debugger
    // console.log(`winComb.entries()`, winComb.entries())
  //  for(let [index,win] of winComb.entries()){
    //let wlen = winComb.length
    //for (let i = 0; i < wlen; i++) {
        // console.log(index, win);
        //let win = winComb[i]
   //     var chkWin;
   //     chkWin=win.every(elem=>
   //         plays.indexOf(elem) > -1
   //     )

        // for (let x = 0; x < win.length; x++) {
        //     let elem = win[x]
        //     console.log(`elem`, elem)
        //     // let ckxWin=plays.indexOf(elem)
        //     //for(j=0;j<win[x].length;j++){

        //     if (elem <= -1) {
        //         chkWin = false

        //     }
        // }
        //  chkWin=true

  //      console.log(`ckWin`, chkWin)

  //      if (chkWin) {
            //debugger
  //          console.log(`ckWin`, chkWin)

  //          gameWon = { index: index, ply: ply }
  //          break;
  //      }
        // let chekWin = null

        // for(let elem of win){
        //     if(plays.indexOf(elem > -1)){
        //         gameWon={index:index,ply:ply}
        //     }
        // }

  //  }
  //  return gameWon
//}
function gameOver(gw) {
    for (let index of winComb[gw.index]) {
        disPlayer.innerText = ``
        document.getElementById(index).innderText = gw.ply !== Player[0] && Player[1] ? 'tie':'still playing'
            //document.getElementById(index).style.backgroundColor=
            if(gw.ply == Player[0]){
              disPlayer.innerText = `Player X Won`
            }else if(gw.ply == Player[1]){
              disPlayer.innerText = `Player O Won`
            }else if(gw.ply !== Player[0] && Player[1]){
                disPlayer.innerText = `Tie between PlayerX and Player O`

            }
            
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', cellClick, false)
    }
}
