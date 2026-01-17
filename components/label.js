function Label(caption, cssClassId, parentElementId) {
  this.labelId = "label_" + Math.random();
  this.caption = caption
  this.cssClassId = cssClassId
  this.parentElementId = parentElementId;

  this.strikeOut = () => {
    const wrappedLabel = document.getElementById(this.labelId)

    if(wrappedLabel != undefined) {
      wrappedLabel.style.color = 'lightgray';  
      wrappedLabel.style.textDecoration = 'line-through';
    }
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);
      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <label id="${this.labelId}" class="${this.cssClassId}">${this.caption}</label> 
        `;
      }
  }
}