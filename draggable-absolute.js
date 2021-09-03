let dragged;
let draggedStyles;
class DraggedPos {
	constructor() {
		this.startTop = null
		this.dragTop = null
		this.dragOverTop = null
		this.dropTop = null
	}
	// self: this,
	log() {

		console.log(this);

	}
}

class OverTargetPos {
	constructor(el) {
		this.el = el;
		this.styles = window.getComputedStyle(el)
		// this._y = this.styles.y;
	}
	log() {
		console.log(this)
	}
}
const draggedPos = new DraggedPos();

let container = document.querySelector('.dropzone')
/* events fired on the draggable target */
container.addEventListener("drag", e => {
	// e.preventDefault();
	// e.stopPropagation()
	draggedStyles = window.getComputedStyle(dragged)
	dragged.style.y = `${dragged.scrollHeight}px`;

	console.log('drag targ', draggedStyles);
}, false);

container.addEventListener("dragstart", e => {
	// e.preventDefault();
	// e.stopPropagation()
	dragged = e.target;
	// const targ = e.target
	draggedStyles = window.getComputedStyle(dragged)
	dragged.style.y = `${dragged.scrollHeight}px`;
	console.log('start targ', dragged.style.y);
	console.log('dragenter draggedStyles', draggedStyles);
	e.target.style.opacity = .5;
}, false);

container.addEventListener("dragend", e => {
	e.preventDefault();
	e.stopPropagation()
	e.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
container.addEventListener("dragover", e => {

	// prevent default to allow drop
	e.preventDefault();
	e.stopPropagation()
}, false);

container.addEventListener("dragenter", e => {
	e.preventDefault();
	e.stopPropagation()

	const targ = e.target

	if (targ.classList.contains('dropzone')) {
		targ.style.background = "purple";
	}
	if (targ.classList.contains('draggable')) {
		e.target.style.background = "blue";
	}

}, false);

container.querySelectorAll('.draggable')
	.forEach(el => el.addEventListener("dragenter", e => {
		e.preventDefault();
		e.stopPropagation()

		const targ = e.target
		const styles2 = window.getComputedStyle(targ)
		console.log('targ', targ);
		console.log('dragenter targ styles', styles2);

		// if (targ.classList.contains('dropzone')) {
		// 	targ.style.background = "purple";
		// }
		// if (targ.classList.contains('draggable')) {
		// 	e.target.style.background = "blue";
		// }

	}, false));

container.addEventListener("dragleave", e => {
	// reset background of potential drop target when the draggable element leaves it
	e.preventDefault();
	e.stopPropagation()
	const targ = e.target
	if (targ.classList.contains('draggable')) {
		e.target.style.background = "";
	}

}, false);

container.addEventListener("drop", e => {
	// prevent default action (open as link for some elements)
	console.log('e,', e);
	const targ = e.target
	// e.preventDefault();
	// e.stopPropagation()
	dragged.style.y = e.y
	dragged.style.top = `${e.y}px`;

	if (targ.classList.contains('draggable')) {
		targ.style.background = "";
		dragged.parentNode.removeChild(dragged);
		container.insertBefore(dragged, targ.nextSibling);
	}
}, false);
container.querySelectorAll('.draggable')
	.forEach(el => el.addEventListener("dragenter", e => { // prevent default action (open as link for some elements)
		const targ = e.target
		e.preventDefault();
		e.stopPropagation()
		if (targ.classList.contains('draggable')) {
			targ.style.background = "";
			dragged.parentNode.removeChild(dragged);
			container.insertBefore(dragged, targ.nextSibling);
		}
	}, false));


let stackHeight = '10px';
//Position items
container.querySelectorAll('.draggable')
	.forEach(el => {
		el.style.top = stackHeight;
		el.style.position = 'absolute';
		container.style.position = 'relative';

		const compStyles = window.getComputedStyle(el);
		stackHeight = `${parseInt(stackHeight) + parseInt(compStyles.height) + 15}px`;



		// if (targ.classList.contains('draggable')) {
		// 	targ.style.background = "";
		// 	dragged.parentNode.removeChild(dragged);
		// 	container.insertBefore(dragged, targ.nextSibling);
		// }
	});