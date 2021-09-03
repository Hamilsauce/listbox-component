class Listbox {
	constructor(root, listEl, itemEls) {
		this.root = root;
		this.listEl = listEl;
		this.itemEls = itemEls;
		this._activeItem;

		this.listEl.addEventListener('click', this.handleClick)
	}

	handleClick({ target }) {
		this.activeItem = target;
		console.log('targ', target.textContent);
	}

	get activeItem() {
		return this._activeItem;
	}
	set activeItem(newVal) {
		this._activeItem = newVal;
	}
}

const app = document.querySelector('#app');
const listbox = document.querySelector('.listbox');
const list = document.querySelector('.listbox-list');
const listItems = document.querySelectorAll('.listbox-item');

const lister = new Listbox(listbox, list, listItems)

console.log('lisyet', lister);

const handleTouchDown = e => {
	console.log('rouch down', e.target);
	e.target.draggable = true;
	e.target.addEventListener('touchend', handleTouchEnd)
}
const handleTouchEnd = e => {}
const startTouch = e => {}

// listItems.forEach(item => {
// 	item.addEventListener('touchstart', handleTouchDown)
// 	item.addEventListener('touchstart', handleTouchDown)
// })


let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
	// store a ref. on the dragged elem
	dragged = event.target;
	// make it half transparent
	event.target.style.opacity = .5;
	console.log('drag s');
}, false);

document.addEventListener("dragend", function(event) {
	// reset the transparency
	event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
	// prevent default to allow drop
	event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
	// highlight potential drop target when the draggable element enters it
	if (event.target.classList.contains('listbox-list')) {
		event.target.style.background = "purple";
	}

}, false);

document.addEventListener("dragleave", function(event) {
	// reset background of potential drop target when the draggable element leaves it
	if (event.target.classList.contains('listbox-list')) {
		event.target.style.background = "";
	}

}, false);

document.addEventListener("drop", function(event) {
	// prevent default action (open as link for some elements)
	event.preventDefault();
	// move dragged elem to the selected drop target
	if (event.target.classList.contains('listbox-list')) {
		event.target.style.background = "";
		dragged.parentNode.removeChild(dragged);
		event.target.appendChild(dragged);
	}
}, false);