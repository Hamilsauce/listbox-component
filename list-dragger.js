class DragItem {
	constructor(rootElement = undefined, data = {}, parent = undefined) {
		this.root = rootElement || this.createRootElement();

		this.setEventHandlers();

	}

	createRootElement() {
		const el = document.createElement('li');
		el.classList.add('listbox-item');
		el.setAttribute('draggable', 'true');
		el.textContent = 'Add txt content';
		return el;
	}
	setEventHandlers() {
		this.root.addEventListener('dragstart', e => {
			e.dataTransfer.setData('text/plain', null)

		});
	}
}

class DragContainer {
	constructor(element, containerSelector = '.drag-container', childSelector = '.drag-item', children = []) {
		this.el = element;
		this._children = this.el.children;
		this._dragItems = new Map(this.children.reduce((acc, curr, i) => [...acc, Object.values(this.createItem(curr, {
			text: `New Item ${i}`,
			id: i
		}))], []));
		this.childSelector = childSelector;
		this.containerSelector = containerSelector;
		this._dragged;
		this._dropTarget;
		this.draggedStartIndex;
		this.dropTargetIndex;
		this.setDragHandlers();
		window.dragger = this;
	}

	createItem(el, data = {}, shouldMapItem = false) {
		const newItem = {
			containerElement: this.el,
			dragContainer: this,
			data: Object.keys(data).length !== 0 ? data : {
				text: el.textContent
			}
		};

		el.textContent = newItem.data.text
		el.setAttribute('draggable', 'true');
		el.classList.add('listbox-item');

		if (shouldMapItem === true) this.dragItems.set(el, newItem);
		this.el.appendChild(el);

		return {
			el,
			data: newItem
		};
	}

	resetItems() {}
	renderItems() {}

	get children() {
		return [...this._children]
	}
	set children(newVal) {
		this._children = newVal
	}

	get dragItems() {
		return this._dragItems
	}
	set dragItems(newVal) {
		this._dragItems = newVal
	}

	get dragged() {
		return this._dragged
	}
	set dragged(newVal) {
		this.draggedStartIndex = this.children.findIndex(el => el === newVal);
		this._dragged = newVal
	}
	get dropTarget() {
		return this._dropTarget
	}
	set dropTarget(newVal) {
		this.dropTargetIndex = this.children.findIndex(el => el === newVal);
		this._dropTarget = newVal
	}

	get className() {
		return this.containerSelector.startsWith('.') ? this.containerSelector.replace('.', '') : 'drag-container'
	}

	get childClassName() {
		return this.childSelector.startsWith('.') ? this.childSelector.replace('.', '') : 'drag-item'
	}

	eachElement(rootElement, callback) {
		if (false === callback(rootElement)) return false;
		if (!callback) {
			const elements = [];
			eachElement(rootElement, element => elements.push(element));
			return elements;
		}
		if (rootElement.children.length > 0) {
			const elements = rootElement.children
			for (let i = 0, l = elements.length; i < l; ++i) {
				if (false === eachElement(elements[i], callback)) {
					return;
				}
			}
		}
	}

	setDragHandlers() {
		/* events fired on the draggable target */
		this.el.addEventListener("drag", e => {}, false);

		this.el.addEventListener("dragstart", e => {
console.log('dragstart' ,this);
			this.dragged = e.target;
			this.dragged.style.opacity = 0.3;
		}, false);

		this.el.addEventListener("dragend", e => {
			e.preventDefault();
			e.stopPropagation();
			e.target.style.opacity = "";
		}, false);

		/* events fired on the drop targets */
		this.el.addEventListener("dragover", e => {
			e.preventDefault();
			e.stopPropagation();
		}, false);

		this.el.addEventListener("dragenter", e => {
			const targ = e.target;
			if (targ.classList.contains(this.childClassName)) targ.style.background = "blue";
		}, false);

		// @@DRAG ENTER FOR DRAG ITEMS
		this.el.querySelectorAll(this.childSelector)
			.forEach(el => el.addEventListener("dragenter", e => {
				const targ = e.target;
				targ.style.background = "blue";
			}, false));

		this.el.querySelectorAll(this.childSelector)
			.forEach(el => el.addEventListener("click", e => {
				const targ = e.target;
				console.log(this.dragItems.get(targ));
			}, false));

		this.el.addEventListener("dragleave", e => {
			const targ = e.target;
			if (targ.classList.contains(this.childClassName)) {
				targ.style.background = "";
			}
		}, false);

		this.el.addEventListener("drop", e => {
			// prevent default action (open as link for some elements)
			e.preventDefault();
			e.stopPropagation();
			const targ = e.target;
			this.dropTarget = targ;
			if (targ.classList.contains(this.childClassName)) {
				targ.style.background = "";

				if (this.dragged.isSameNode(targ)) {
					return;
				} else if (this.draggedStartIndex > this.dropTargetIndex) {
					this.dragged.parentElement.removeChild(this.dragged);
					targ.parentElement.insertBefore(this.dragged, targ);
				} else if (this.dragged.parentElement !== targ.parentElement) {
					this.dragged.parentElement.removeChild(this.dragged);
					targ.parentElement.insertBefore(this.dragged, targ);
				} else {
					this.dragged.parentElement.removeChild(this.dragged);
					targ.parentElement.insertBefore(this.dragged, targ.parentElement.children[this.dropTargetIndex]);
				}
			}

			if (targ.classList.contains(this.className)) {
				console.log('drop targ  = parent');
				targ.style.background = "";
				this.dragged.parentElement.removeChild(this.dragged);
				targ.appendChild(this.dragged);
			}

			this.el.focused = true;
			this.el.focus();
			this.dragged = null;
			this.dropTarget = null;
		}, false);
	}
}