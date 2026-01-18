function Button(caption, cssClass, parentElementId, onClickHandler) {
  _ = new Component(this, parentElementId, "");
  
  this.underlyingButtonId = "underlying-button-" + this.id;

  objects.register(`${this.id}`, 'button-Click', (target) => {
    onClickHandler(target)
  });

  this.content = () => {
    return `
      <button id="${this.underlyingButtonId}" class="${cssClass}" onclick="objects.call('button-Click', '${this.id}', this)">
        ${caption}
      </button> 
    `;  
  }  
}
