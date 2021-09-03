let dragged;
let draggedStyles;
class DraggedPos {
	constructor() {
		this.startTop = null
		this.dragTop = null
		this.dragOverTop = null
		this.dropTop = null
	}
	log() {
		console.log(this);
	}
}

let containers = document.querySelectorAll('.dropzone')

containers.forEach(container => {

	/* events fired on the draggable target */
	container.addEventListener("drag", e => {
		draggedStyles = window.getComputedStyle(dragged)
		dragged.style.y = `${dragged.scrollHeight}px`;
	}, false);

	container.addEventListener("dragstart", e => {
		dragged = e.target;
		draggedStyles = window.getComputedStyle(dragged)
		dragged.style.y = `${dragged.scrollHeight}px`;
		e.target.style.opacity = 0.3;
	}, false);

	container.addEventListener("dragend", e => {
		e.preventDefault();
		e.stopPropagation()
		e.target.style.opacity = "";
	}, false);

	/* events fired on the drop targets */
	container.addEventListener("dragover", e => {
		e.preventDefault();
		e.stopPropagation()
	}, false);

	container.addEventListener("dragenter", e => {
		e.preventDefault();
		e.stopPropagation()
		const targ = e.target

		if (targ.classList.contains('dropzone')) targ.style.background = "purple";
		if (targ.classList.contains('draggable')) targ.style.background = "blue";
	}, false);

	container.querySelectorAll('.draggable')
		.forEach(el => el.addEventListener("dragenter", e => {
			e.preventDefault();
			e.stopPropagation()

			const targ = e.target
			targ.style.background = "blue";
		}, false));

	container.addEventListener("dragleave", e => {
		// reset background of potential drop target when the draggable element leaves it
		e.preventDefault();
		e.stopPropagation()
		const targ = e.target
		if (targ.classList.contains('draggable')) {
			targ.style.background = "";
		}

	}, false);

	container.addEventListener("drop", e => {
		// prevent default action (open as link for some elements)
		const targ = e.target
		e.preventDefault();
		e.stopPropagation()
		if (targ.classList.contains('draggable')) {
			targ.style.background = "";

			if ([...container.children].findIndex(el => el === dragged) > [...container.children].findIndex(el => el === targ)) {
				dragged.parentNode.removeChild(dragged);
				targ.parentNode.insertBefore(dragged, targ);
			} else if (dragged.parentNode !== targ.parentNode) {
				dragged.parentNode.removeChild(dragged);
				targ.parentNode.insertBefore(dragged, targ);
			} else {
				dragged.parentNode.removeChild(dragged);
				targ.parentNode.insertBefore(dragged, targ.nextSibling);

			}
		}
		if (targ.classList.contains('dropzone')) {
			targ.style.background = "";
			dragged.parentNode.removeChild(dragged);
			targ.appendChild(dragged);
		}
	}, false);
})
// container.querySelectorAll('.draggable')
// 	.forEach(el => el.addEventListener("dragenter", e => { // prevent default action (open as link for some elements)
// 		const targ = e.target
// 		e.preventDefault();
// 		e.stopPropagation()
// 		if (targ.classList.contains('draggable')) {
// 			targ.style.background = "";
// 			dragged.parentNode.removeChild(dragged);
// 			container.insertBefore(dragged, targ.nextSibling);
// 		}
// 	}, false));