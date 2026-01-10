function Label(id, caption, parentElementId) {
  this.labelId = "label_" + id;
  this.caption = caption
  this.parentElementId = parentElementId;

  this.strikeOut = () => {
    const wrappedLabel = document.getElementById(this.labelId)

    if(wrappedLabel != undefined) {
      wrappedLabel.style.color = 'gray';  
      wrappedLabel.style.textDecoration = 'line-through';
    }
  }

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);
      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <label id="${this.labelId}" class="list-item">${this.caption}</label> 
        `;
      }
  }
}