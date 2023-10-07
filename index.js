document.addEventListener("DOMContentLoaded", function (event) {
    let columnContainer = document.getElementsByClassName(
        "column-name-container"
      );
    let rowContainer = document.getElementsByClassName("row-name-container");
    let  selectedCellBox = document.getElementsByClassName(" selected-cell");
  for (let i = 1; i <= 100; i++) {
    let ans = "";
    let n = i;
    while (n > 0) {
      let rem = n % 26;

      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem - 1 + 65) + ans;
        n = Math.floor(n / 26);
      }
    }
    // `<div class="column-name" id="colCode-${ans} colId-${i}">${ans}</div>`
    // creating the column heading
    // let column = document.createElement("div");
    // column.classList.add("column-name");
    // column.innerText = `${ans}`;
   
    // columnContainer[0].appendChild(column);
    columnContainer[0].innerHTML += `<div class="column-name colId-${i}" id="colCode-${ans} ">${ans}</div>`;

    // creating the sr.no row
    // let row = document.createElement("div");
    // let colId = `colId-${i}`;
    // let colCod =  `colCod-${ans};`
    // row.classList.add("row-name colId");
    // row.innerText = i;

  
    rowContainer[0].innerHTML += `<div class="row-name" id="rowId-${i}">${i}</div>`;
  }

  //   creating the input-cell
  let cellContainer = document.getElementsByClassName("input-cell-container");
  for (let i = 1; i <= 100; i++) {
    let row = document.createElement("div");
    row.className = "cell-row";
    for (let j = 1; j <= 100; j++) {
      let colCode = document
        .getElementsByClassName(`colId-${j}`)[0]
        .attributes["id"].value.split("-")[1];
      if (i == j && j == 1) {
        row.innerHTML += `<div class="input-cell selected" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"> </div>`;
      } else {
        row.innerHTML += `<div class="input-cell" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"> </div>`;
      }
    }
    cellContainer[0].appendChild(row);
  }

  let alignment = document.querySelectorAll(".align-icon");
  // Iterate through each "align-icon" element and attach a click event listener
  alignment.forEach(function (alignIcon) {
    alignIcon.addEventListener("click", function () {
      // Remove the "selected" class from all elements with class "align-icon"
      var selectedElements = document.querySelectorAll(".align-icon.selected");
      selectedElements.forEach(function (selectedElement) {
        selectedElement.classList.remove("selected");
      });

      // Add the "selected" class to the clicked element
      this.classList.add("selected");
    });
  });

  let styleIcons = document.querySelectorAll(".style-icon");
  styleIcons.forEach(function (StIcon) {
    StIcon.addEventListener("click", function () {
      var clickedElement = this;
      // Check if the clicked element has the "selected" class
      if (clickedElement.classList.contains("selected")) {
        // If it has the class, remove it
        clickedElement.classList.remove("selected");
      } else {
        // If it doesn't have the class, add it
        clickedElement.classList.add("selected");
      }
    });
  });

  let cells = document.querySelectorAll(".input-cell");
  cells.forEach(function (cell) {
    
    cell.addEventListener("click", function (e) {
        var clickedElement = this;
        let colname = clickedElement.attributes['data'].nodeValue.split("-")[1];
        let [rowId,colId]=getRowCol(clickedElement);
        selectedCellBox[0].textContent=`${colname}${rowId}`;
    //    multiple cells select
       if(e.ctrlKey){
        // let [rowId,colId]=getRowCol(clickedElement);
        // if(rowId>1){
        //     let topCellSelected = document.getElementById(`row-${rowId-1}-col-${colId}`).classList.contains("selected");
        //     if(topCellSelected){
        //         clickedElement.className="top-cell-selected";
        //         document.getElementById(`row-${rowId-1}-col-${colId}`).className="bottom-cell-selected";
        //     }
        // }
       }else{
        document.getElementsByClassName("input-cell selected")[0].classList.remove("selected");
        // If it doesn't have the class, add it
        clickedElement.classList.add("selected");
    
       }
      
     
    });

    cell.ondblclick=function () {
        var clickedElement = this;
        document.getElementsByClassName("input-cell selected")[0].classList.remove("selected");
          // If it doesn't have the class, add it
          clickedElement.classList.add("selected");
        //   clickedElement[0]
        clickedElement.setAttribute("contenteditable",true);
        clickedElement.focus();
    };

    // cell.addEventListener("blur", function(){
    //     document.getElementsByClassName("input-cell selected")[0].setAttribute("contetEditable",false);
    // })

  });


//   scroll left and top
  cellContainer[0].addEventListener("scroll",function(){
     columnContainer[0].scrollLeft=this.scrollLeft;
     rowContainer[0].scrollTop = this.scrollTop;
  });


  function getRowCol(ele){
    let selectedCell=ele.attributes['id'].value.split("-");
    let rowId = parseInt(selectedCell[1]);
    let colId = parseInt(selectedCell[3]);
    return [rowId,colId]; 
  }

  function updateCell(property,value){
    let selectedCells = document.querySelectorAll(".input-cell.selected");
      selectedCells.forEach(function (cell) {
        cell.style.setProperty(property, value);
      })
  }

  let boldIcon = document.getElementsByClassName("icon-bold");
  let italicIcon = document.getElementsByClassName("icon-italic");
  let underLIneIcon = document.getElementsByClassName("icon-underline");
  let alignLeftIcon = document.getElementsByClassName("icon-align_left");
  let alignCenterIcon = document.getElementsByClassName("icon-align_center");
  let alignRightIcon = document.getElementsByClassName("icon-align_right");

  boldIcon[0].addEventListener("click",function(){
    if(!this.classList.contains("selected")){
        updateCell("font-weight","");
    }else{
        updateCell("font-weight","bold");
    }
  })

  italicIcon[0].addEventListener("click",function(){
    if(!this.classList.contains("selected")){
        updateCell("font-style","");
    }else{
        updateCell("font-style","italic");
    }
  })

  underLIneIcon[0].addEventListener("click",function(){
    if(!this.classList.contains("selected")){
        updateCell("text-decoration-line","");
    }else{
        updateCell("text-decoration-line","underline");
    }
  })

  alignCenterIcon[0].addEventListener("click",function(){
    if(!this.classList.contains("selected")){
        updateCell(" text-align","");
    }else{
        updateCell("text-align","center");
    }
  })
  alignLeftIcon[0].addEventListener("click",function(){
    if(!this.classList.contains("selected")){
        updateCell(" text-align","");
    }else{
        updateCell("text-align","left");
    }
  })
  alignRightIcon[0].addEventListener("click",function(){
    if(!this.classList.contains("selected")){
        updateCell(" text-align","");
    }else{
        updateCell("text-align","right");
    }
  })



});
function sizeFunction() {
    var x = document.getElementById('size-selector');
    var i = x.selectedIndex;
    let output="";
    if(i!=undefined){
       output = x.options[i].text;
    }
    let selectedCells = document.querySelectorAll(".input-cell.selected");
    selectedCells.forEach(function (cell) {
      cell.style.fontSize = output+"px";
    })
  }

  function fontFamilyFunction(){
    var  d = document.getElementById("font-family");
    var i = d.selectedIndex;
    let output="";
    if(i!=undefined){
       output = d.options[i].text;
    }
    let selectedCells = document.querySelectorAll(".input-cell.selected");
    selectedCells.forEach(function (cell) {
      cell.style.fontFamily = output;
    })
  }