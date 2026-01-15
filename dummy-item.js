function DummyItem(cssClassId, parentElementId) {
  this.dummyItemId = "dummy_bottom" + Math.random();
  this.cssClassId = cssClassId
  this.parentElementId = parentElementId;

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);
      if (htmlComponent != undefined) {
        htmlComponent.innerHTML += `
          <div id="${this.dummyItemId}" class="${this.cssClassId}"></div> 
        `;
      }
  }
}