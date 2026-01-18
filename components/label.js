function Label(caption, cssClassId, parentElementId) {
  _ = new Component(this, parentElementId, "");

  this.underlyingLabelId = "underlying-label-" + this.id;
  this.strikedOut = false;

  this.strikeOut = () => {
    this.strikedOut = true;
    this.reload();  
  }

  this.content = () => {
    return `
      <label id="${this.underlyingLabelId}" class="${cssClassId}">${caption}</label>
    `;
  }  

  this.afterReload = () => {
    if(this.strikedOut) {
      const wrappedLabel = document.getElementById(this.underlyingLabelId)

      if(wrappedLabel != undefined) {
        wrappedLabel.style.color = 'lightgray';  
        wrappedLabel.style.textDecoration = 'line-through';
      }
    }
  }
}
