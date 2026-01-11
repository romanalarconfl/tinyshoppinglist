function Header(title, subtitle, parentElementId) {
  this.elementId = "header_" + Math.random()
  this.parentElementId = parentElementId

  this.titleLabel = new Label(title, "header-title", this.elementId);
  this.subtitleLabel = new Label(subtitle, "header-subtitle", this.elementId);

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += ` 
             <div id="${this.elementId}" class=\"header-items\"></div>
         `;    

         this.titleLabel.render()    
         this.subtitleLabel.render() 
         
         console.log(htmlComponent.innerHTML)
      }
  }
}
