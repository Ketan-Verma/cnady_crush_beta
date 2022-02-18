let row = 5;//horiz
let col = 5;//vertical
let totCell = row * col;
let colarr=[];
let sel_elm = [];
let samplecol = ["red","orange","blue","green","yellow"];
let selistrue = false;
let score = 0;
startGame();

    function horCheck(a){
    let verarr=[];
    verarr.push(a-1)
    this.abc = a%row-1;
    if(a%row==0){
        this.abc= 4;
    }
    for(let i=0;i<this.abc;i++){
        if(colarr[a-1]==colarr[a-2-i]){

            verarr.push(a-1-i);
            // console.log(a-1-i)
            // verarr.push(colarr[a-2-i]);
        }else{
            break;
        }
    }
    for(let i=0;i<row-a%row;i++){
        if(colarr[a-1]==colarr[a+i]){
            verarr.push(a+i+1);
            // console.log(a+i+1)
        }else{
            break;
        }
    }
    if(verarr.length>2){
        // console.log(verarr.length,colarr[a-1]);
        score+=verarr.length;
        document.getElementById("score").innerText = score;
        cngcrl(verarr);
    }
}
function vertcheck(a){
    this.verarr=[];
    this.verarr.push(a);
    if(a%row!=0){
        this.row= ((a+(row - a%row))/row);

    }
    else{
        this.row=a/row
        
    }
    for(let i=0;i<this.row-1;i++){
        if(colarr[a-1]==colarr[a-1-(row*(i+1))]){
            // console.log(a-(row*(i+1)));        
            this.verarr.push(a-(row*(i+1)));
        }else{
            break;
        }
    }
    // for(let i=0;i<;i++)
    // console.log(col-this.row);
    for(let i=1;i<=col-this.row;i++){
        if(colarr[a-1]==colarr[a-1+(row*(i))]){
            this.verarr.push(a+(row*(i)));
        }else{
            break;
        }
    }        
    if(this.verarr.length>2){

        cngvert(this.verarr);
    }

}
function cngvert(arr){
    // console.log(arr.length)
    score+=arr.length;
    document.getElementById("score").innerText = score;
    for(let i= 0; i<arr.length;i++){
        let card = document.getElementById(arr[i]);
        card.style.backgroundColor =  "pink";  
    }
    setTimeout(()=>{
        for(let i= 0; i<arr.length;i++){

            colarr[arr[i]-1]=samplecol[Math.floor(Math.random()*samplecol.length)];
            // console.log(colarr[arr[i]-1]);
            let card = document.getElementById(arr[i]);
            card.style.backgroundColor =  "white"//colarr[arr[i]-1];  
            const img = document.getElementById("img"+arr[i]);
            img.src=imgsel(colarr[arr[i]-1]);
        }
    }, 500);
    
}
function cngcrl(arr){
    
    arr[0]+=1;
    for(let i= 0; i<arr.length;i++){
        let card = document.getElementById(arr[i]);
        card.style.backgroundColor =  "pink";  
    } 
    setTimeout(()=>{
        for(let i= 0; i<arr.length;i++){

            colarr[arr[i]-1]=samplecol[Math.floor(Math.random()*samplecol.length)];    
            let card = document.getElementById(arr[i]);
           card.style.backgroundColor =  "white"//colarr[arr[i]-1];  
           const img = document.getElementById("img"+arr[i]);
           img.src=imgsel(colarr[arr[i]-1]);
        }    
    }, 500);
    
    }
function checkMatch(a,b){

    horCheck(a);
    horCheck(b);
    vertcheck(a);
    vertcheck(b);
}
function selCrd(e){
    if(selistrue){
        if(sel_elm.length <2){
            sel_elm.push(e);
            }
     if(sel_elm.length==2){
         swapCrd(sel_elm[0],sel_elm[1]);
         checkMatch(sel_elm[0],sel_elm[1]);
        }
}
}
function setselCrd(val){
    selistrue=val;
    if(!val){
        sel_elm = [];
    }
}
function startGame(){
    score=0;
    selistrue=false;
    const grid = document.querySelector(".grid");
    grid.addEventListener("mousedown",()=>{
        setselCrd(true);
    });
    grid.addEventListener("mouseup",()=>{
        setselCrd(false);
    });
    let collen = " ";
    for (let i = 0; i < totCell; i++) {
        colarr.push(samplecol[Math.floor(Math.random()*samplecol.length)]);
    }
    for (let i = 0; i < col; i++) {
        collen+=" auto"
    }
    grid.style.gridTemplateColumns=collen;
    for (let i = 1; i <= totCell; i++) {
        const card = document.createElement("div") ;
        card.classList.add("card");
        card.id = i;
        // card.innerText=i;
        // card.style.backgroundColor=  colarr[i-1];

        const img = document.createElement("img");
        img.id = "img"+i;
        img.src=imgsel(colarr[i-1]);
        img.setAttribute('draggable',false)
        card.style.backgroundImage=imgsel(colarr[i-1]);
        card.append(img);
        card.addEventListener("mousedown",()=>{
            setselCrd(true);
            const tempcarvar = i;
            selCrd(tempcarvar);
        });
        card.addEventListener("mouseup",()=>{
            setselCrd(false);
        });
        
        card.addEventListener("mouseover",()=>{
            const tempcarvar = i;
            selCrd(tempcarvar);
        });
        grid.append(card);
        
    }    
}
function swapCrd(a,b){
    let card_a = document.getElementById(a);
    let card_b = document.getElementById(b);
    // card_a.style.backgroundColor =  colarr[b-1];    
    // card_b.style.backgroundColor =  colarr[a-1];
    const imgA = document.getElementById("img"+a);
    const imgB = document.getElementById("img"+b);    
    imgA.src=imgsel(colarr[b-1]);
    imgB.src=imgsel(colarr[a-1]);
    console.log(colarr[b-1],colarr[a-1]);
    let temp_col = colarr[b-1];
    colarr[b-1] = colarr[a-1];
    colarr[a-1] = temp_col;
}
function imgsel(colr){

    switch (colr) {
        case "red":
            return "images/red.png";
            break;
        case "green":
            return "images/pink.png";
            break;
        case "blue":
            return "images/blue.png";
            break;
        case "orange":
            return "images/orange.png";
            break;
        case "yellow":
            return "images/yellow.png";
            break;
    
        default:
            break;
    }
}