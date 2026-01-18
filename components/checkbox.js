function Checkbox(selected, productId, parentElementId, onCheckboxChangeHandler) {
  _ = new Component(this, parentElementId, "");

  this.underlyingCheckboxId = "underlying-checkbox-" + this.id;

  objects.register(`${this.id}`, 'checkbox-onChange', (target) => {
    onCheckboxChangeHandler(productId, target.checked)
  });

  this.content = () => {
    return `
      <input id="${this.underlyingCheckboxId}" class="checkbox" type="checkbox" ${selected?"checked": ""} onchange="objects.call('checkbox-onChange', '${this.id}', this)"/> 
    `;  
  }  
}
