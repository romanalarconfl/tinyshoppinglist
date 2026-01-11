function Checkbox(parentElementId, selected, productId, onCheckboxChangeHandler) {
  this.checkboxId = "button_" + Math.random();
  this.parentElementId = parentElementId;
  this.selected = selected;
  this.productId = productId;
  this.onCheckboxChangeHandler = onCheckboxChangeHandler;

  objects.register(this.productId, 'checkbox-onChange', (target) => {
      this.onCheckboxChangeHandler(this.productId, target.checked)
  });

  this.disable = () => {
    const wrappedButton = document.getElementById(this.buttonId)

    if(wrappedButton != undefined) {
      wrappedButton.style.color = 'lightgray';  
    }
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <input id="${this.checkboxId}" type="checkbox" ${this.selected?"checked": ""} onchange="objects.call('checkbox-onChange', ${this.productId}, this)"/> 
        `;
      }
  }
}