//*~~~~~ View

const View = (()=>{

    const domStrings = {
        list: "#list",
        addBtn: "#add-btn",
        input: "#text-input",
        removeBtn: "#remove-btn",
    };

    const render = (el, tmp) => {
        console.log(el)
		el.innerHTML = tmp;
	};


	const listTemp = (arr) => {
		let tmp = "";

		arr.forEach((el,i) => {
			tmp += `
        <li>
          <span>${el.item}</span>
          <button id="${el.id}" class="remove-btn">X</button>
        </li>
      `;
		});
		return tmp;
	};


    return {render,listTemp,domStrings};
})();

//*~~~~~~ Model

const Model = ((view)=>{

    let toDoList = JSON.parse(localStorage.getItem("toDoList"))|| [];
  

    const getItem =()=>{
        let userInput = document.querySelector(view.domStrings.input);
    
        toDoList.push({item: userInput.value.trim(),id: toDoList.length +1});
        userInput.value = "";
        localStorage.setItem(0,toDoList);
        view.render(document.querySelector(view.domStrings.list),view.listTemp(toDoList))
        console.log(toDoList)

        
    
};


    return {toDoList,getItem};
})(View);

//*~~~~~ Controller

const Controller = ((model,view)=>{

   let list = document.querySelector(view.domStrings.list);
   
    

    document.addEventListener("keyup",(event)=>{
     
        if( event.key === "Enter"){
           model.getItem();
            

        }
})

let addBtn =document.querySelector(view.domStrings.addBtn)

     addBtn.addEventListener("click", () =>{
    model.getItem();
    view.render(list,view.listTemp(model.toDoList));
    
})

      const bootstrap = ()=>{
          
          view.render(list,view.listTemp(model.toDoList));

      }
    


    return {bootstrap};
})(Model,View);

Controller.bootstrap();

