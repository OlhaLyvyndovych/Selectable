class ListSelect {
  constructor(options) {
    this.options = options;
    this.elem = options.elem;
    this.lastClickedLi = null;

    this.elem.onmousedown = this.mouseDown;
    this.elem.onclick = this.onClick.bind(this);
  }

  selectSingle(li) {
    this.deselectAll();
    li.classList.add('selected');
  }

  mouseDown() {
    return false;
  }

  onClick(e) {
    let li = e.target.closest('li');
    if (!li) return;

    if (e.metaKey || e.ctrlKey) { // для Mac проверяем Cmd, т.к. Ctrl + click там контекстное меню
      this.toggleSelect(li);
    } else if (e.shiftKey) {
      this.selectFromLast(li);
    } else {
      this.selectSingle(li);
    }

    this.lastClickedLi = li;
  }

  deselectAll() {
    [].forEach.call(this.elem.children, function(child) {
      child.classList.remove('selected')
    });
  }

  toggleSelect(li) {
    li.classList.toggle('selected');
  }

  selectFromLast(target) {
    let startElem = this.lastClickedLi || this.elem.children[0];

    target.classList.add('selected');
    if (startElem == target) {
      return;
    }

    var isLastClickedBefore = startElem.compareDocumentPosition(target) & 4;

    if (isLastClickedBefore) {
      for (let elem = startElem; elem != target; elem = elem.nextElementSibling) {
        elem.classList.add('selected');
      }
    } else {
      for (let elem1 = startElem; elem1 != target; elem1 = elem1.previousElementSibling) {
        elem1.classList.add('selected');
      }
    }
  }

  getSelected() {
    return [].map.call(this.elem.querySelectorAll('.selected'), function(li) {
      return li.innerHTML;
    });
  }
}
