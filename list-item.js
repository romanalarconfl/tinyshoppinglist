function ListItem(product, parentElementId, checkboxChangeHandler) {
  this.id = product.id
  this.title = product.name
  this.selected = product.selected
  this.parentElementId = parentElementId
  this.checkboxChangeHandler = checkboxChangeHandler

  objects.register(this.id, 'checkbox-onChange1', (target) => {
      this.checkboxChangeHandler(this.id, target.checked)
  });

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += `
             <div class="list-item-row">
               <label class="list-item">${this.title}</label>
               <input id="checkbox1" type="checkbox" ${this.selected?"checked": ""} onchange="objects.call('checkbox-onChange1', ${this.id}, this)"/>   
             </div>
         `;
      }
  }
}
