//*~~~~~ View

const View = (()=>{

    const domStrings = {
        listContainer: "#list-container",
        addBtn: "#add-btn",
        input: "#input-text",
        removeBtn: "#remove-btn",
    };

    const render = (el, tmp) => {
		el.innerHTML = tmp;
	};


	const listTemp = (arr) => {
		let tmp = "";

		arr.forEach((el,i) => {
			tmp += `
        <li>
          <span>${el}</span>
          <button id="${el[i+1]}" class="remove-btn">X</button>
        </li>
      `;
		});
		return tmp;
	};


    return {render,listTemp,domStrings};
})();

//*~~~~~~ Model

const Model = ((view,Controller)=>{

    let toDoList = [];



    return {toDoList};
})(View,Controller);

//*~~~~~ Controller

const Controller = ((model,view)=>{

   
      

        const getItem =()=>{

            let userInput = document.querySelector(view.domStrings.input).value;
            let addBtn = document.querySelector(view.domStrings.addBtn);

            addBtn.addEventListener("click",()=>{
                model.toDoList.push(userInput);
                userInput.value = "";
                console.log(Model.toDoList)
        })
    };
    
       let list = document.querySelector(view.domStrings.listContainer);

    view.render(list,view.listTemp(model.toDoList));

    return {getItem};
})(Model,View);


