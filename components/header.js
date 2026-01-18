function Header(title, subtitle, parentElementId) {
  _ = new Component(this, parentElementId, "header-items");

  this.onRenderContainer = () => {
    this.titleLabel.render()    
    this.subtitleLabel.render() 
  }

  this.titleLabel = new Label(title, "header-title", this.id);
  this.subtitleLabel = new Label(subtitle, "header-subtitle", this.id);
}
