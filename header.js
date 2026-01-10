function Header(title, subtitle, parentElementId) {
  this.title = title
  this.subtitle = subtitle
  this.parentElementId = parentElementId

  this.render = () => {
      let htmlComponent = document.getElementById(this.parentElementId);

      if (htmlComponent != undefined) {
         htmlComponent.innerHTML += 
             "<div class=\"header-items\">" +
               "<label class=\"header-title\">" + this.title + "</label>" +
               "<label class=\"header-subtitle\">" + this.subtitle + "</label>" +
             "</div>";
      }
  }
}
