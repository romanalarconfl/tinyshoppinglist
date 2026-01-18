function Component(object, parentElementId, cssClass) {
  object.id = Math.random();
  object.cssClass = cssClass;
  object.parentElementId = parentElementId;
  
  object.reload = () => {
    const container = document.getElementById(object.id);
    if(container) {
      if(object.onReloadContainer) {
        container.innerHTML = "";
        object.onReloadContainer();
      } else if(object.content) {
        container.innerHTML = object.content();
      }
    }

    if (object.afterReload) {
      object.afterReload(); 
    }
  }

  object.render = () => {
    object.unmount();
    object.mount();
    if (object.onRenderContainer) {
      object.onRenderContainer(); 
    } else if (object.content) {
      const container = document.getElementById(object.id);
      if(container) {
        container.innerHTML = object.content();
      }
    } 

    if (object.afterRender) {
      object.afterRender(); 
    }
  }

  object.mount = () => {
    if (object.element) return; // Already mounted

    const parentElement = document.getElementById(object.parentElementId);
    
    if (parentElement) {
      parentElement.innerHTML += `
        <div id="${object.id}" class="${object.cssClass}"></div>
      `; 
    }
  }

  object.unmount = () => {
    const container = document.getElementById(object.id);
    if (container) {
        container.remove();
    }
  }
}