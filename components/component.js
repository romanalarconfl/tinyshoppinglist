function Component(object, parentElementId, cssClass) {
  object.id = Math.random();
  object.cssClass = cssClass;
  object.parentElementId = parentElementId;
  
  object.render = () => {
      object.mount();

      let children = object.children;

      if (children) {
        children.forEach(element => {
          element.render();    
        });    
      }
  }

  object.reload = () => {
    const thisElement = document.getElementById(object.id);
    
    if (thisElement) {
      thisElement.innerHTML = ""; 
      object.render();   
    }
  }

  object.mount = () => {
    const thisElement = document.getElementById(object.id);

    if (thisElement) return; // Already mounted

    const parentElement = document.getElementById(object.parentElementId);
    
    if (parentElement) {
      parentElement.innerHTML += `
        <div id="${object.id}" class=>"${object.cssClass}"></div>
      `;    
    }
  }

  object.unmount = () => {
    const element = document.getElementById(object.id) 

    if (element) {
        element.remove();
    }
  }
}