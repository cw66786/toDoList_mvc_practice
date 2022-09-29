//*~~~~~ View

const View = (()=>{

    const domStrings = {
        list: "#list",
        addBtn: "#add-btn",
        input: "#text-input",
        removeBtn: "#remove-btn",
    };

    const render = (el, tmp) => {
       
		el.innerHTML = tmp;
	};


	const listTemp = (arr) => {
		let tmp = "";

		arr.forEach((el) => {
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
        if(userInput.value.trim() !== ""){
            toDoList.push({item: userInput.value.trim(),id: toDoList.length +1});
            userInput.value = "";
            localStorage.setItem("toDoList",JSON.stringify(toDoList));
            view.render(document.querySelector(view.domStrings.list),view.listTemp(toDoList))
        }
       
        
        
    
};


const removeItem = (item) =>{
    let idToRemove = item;
  toDoList = toDoList.filter(el =>
    el.id != idToRemove
  )

 localStorage.setItem("toDoList",JSON.stringify(toDoList))
 view.render(list,view.listTemp(toDoList)) 
 
}

    return {toDoList,getItem,removeItem};
})(View);

//*~~~~~ Controller

const Controller = ((model,view)=>{

   let list = document.querySelector(view.domStrings.list);
   
    

    document.addEventListener("keyup",(event)=>{
     
        if( event.key === "Enter"){
           model.getItem();
            
           view.render(list,view.listTemp(model.toDoList));
           
        }
    })
    
    
    
    document.addEventListener("click", (event) =>{
       
        if(event.target.id === "add-btn"){
            model.getItem();
           
           
            
            
        }else if(event.target.className === "remove-btn"){
            model.removeItem(event.target.id)
            
            
            
        }
        
});

      const bootstrap = ()=>{
          
          view.render(list,view.listTemp(model.toDoList));

      }
    


    return {bootstrap};
})(Model,View);

Controller.bootstrap();
console.log(localStorage.getItem("toDoList"))

