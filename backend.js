let colorStyle = 0
let table

//Define DOM
//let inputSize = document.getElementById('gridSize').value;
let size = document.getElementById('gridSize').value;
let sizeButton = document.getElementById('applyGrid');
let clearButton = document.getElementById('reset');
let select = document.querySelector('select');
let container = document.querySelector('.row.table-container');

// Initialize application
window.addEventListener('load', initialApp);

function initialApp() {
  // Initialize default table
  renderTable(size);

  // Event Listeners
  sizeButton.addEventListener('click', handleSizeRequest);
  select.addEventListener('change', handleColorStyleSelection);
  clearButton.addEventListener('click', handleClearTable);

}

//testing
function getValue(){
  var x = inputSize;
  alert(x);
}
////////

function handleSizeRequest() {

  const answer = document.getElementById('gridSize').value ; //if we change to newSize() it doesnt work, why?
  const sizeNumber = Number(answer);

  createNewTable(sizeNumber);
}

function newSize(){
  return size;
}

function createNewTable(size) {
  // Remove previous table
  container.removeChild(table);

  // Render a new table
  renderTable(Math.round(size));
}

function renderTable(size) {
  // Create a new table
  table = new Table(size).element;

  // Display table
  container.appendChild(table);
}


class App {
  constructor(classNames, elementType = 'div') {
    this.createElementWithClass(classNames, elementType);
  }

  createElementWithClass(classNames, elementType) {
    this.element = document.createElement(elementType);
    this.element.setAttribute('class', classNames);
  }

  setInlineStyle(count) {
    this.element.style.cssText = `grid-template-columns: repeat(${count}, 1fr);`;
  }

  renderChildren(count, Child) {
    for (let i = 0; i < count; i++) {
      const childElement = new Child(count).element;
      this.element.appendChild(childElement);
    }
  }
}


class Table extends App {
  constructor(rowCount) {
    super('table shadow row column');
    super.setInlineStyle(rowCount);
    super.renderChildren(rowCount * rowCount, Square);
  }
}

class Square extends App {
  constructor() {
    super();

    this.red = 255;
    this.green = 255;
    this.blue = 255;

    this.colorStyles = {
      0: this.setBlackWhiteColor.bind(this),
      1: this.getRandomColor.bind(this),
      2: this.setColorOnRepeat.bind(this)
    };

    this.changeBackgroundColor(this.setRgbColor());

    this.element.addEventListener(
      'mouseenter',
      this.handleBackgroundChange.bind(this)
    );
  }

  handleBackgroundChange() {
    const colorHandler = this.colorStyles[colorStyle];
    const color = colorHandler();
    this.changeBackgroundColor(color);
  }

  changeBackgroundColor(color) {
    this.element.style.backgroundColor = color;
  }

  setBlackWhiteColor() {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    return this.setRgbColor();
  }

  getRandomColor() {
    this.red = this.getRandomNumber();
    this.green = this.getRandomNumber();
    this.blue = this.getRandomNumber();
    return this.setRgbColor();
  }

  setColorOnRepeat() {
    this.red = Math.floor(this.red * 0.9);
    this.green = Math.floor(this.green * 0.9);
    this.blue = Math.floor(this.blue * 0.9);
    return this.setRgbColor();
  }

  getRandomNumber() {
    return Math.floor(Math.random() * 255);
  }

  setRgbColor() {
    return `rgb(${this.red},${this.green},${this.blue})`;
  }
}


function handleColorStyleSelection({ target }) {
  colorStyle = target.value;
}

function handleClearTable() {
  createNewTable(size);
}



