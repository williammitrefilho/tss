class Incrementable{
	static counter = 0
}
Incrementable.newId = function(){
	return TSS.getCounterFor(this)
}

class ThreeSimpleScripts{
	static add(type, name){

		if(!TSS[`${type}s`])
			TSS[`${type}s`] = {}
		let soum = Soum.a(type)

		if(!name)
			name = `${type}${TSS.numberOf(type)+1}`

		TSS[`${type}s`][name]?.element.remove()
		TSS[`${type}s`][name] = soum
		return soum
	}
	static numberOf(type){
		if(!TSS[`${type}s`])
			return 0

		return Object.getOwnPropertyNames(TSS[`${type}s`]).length
	}
	static start(){
		let tss = new ThreeSimpleScripts()
		let kbug = new KBugol()
		tss.bind()
		kbug.listen()
		ThreeSimpleScripts.tss = tss
		ThreeSimpleScripts.main = tss.main
		ThreeSimpleScripts.root = tss.main.element

		ThreeSimpleScripts.kbug = kbug
	}

	constructor(){
		this.main = Soum.svg(330)
	}
	bind(){
		this.main.appendTo(document.body)
	}
}

class Group extends SoumGraphic{
	constructor(elements, id = Soum.newId()){
		super("g", id)
		this.elements = elements
		this.pivot = {
			x:0.0, y:0.0,
		}
	}
	get transform(){
		let transform = `translate(${this.pivot.x} ${this.pivot.y})`
		return transform
	}
	set transform(transform){
		this.element.setAttribute("transform", transform)
	}

	set x(x){

		let dx = x - this.pivot.x
		this._elements.forEach((element)=>{
//			element.x -= -dx
		})
		this.pivot.x = x
		this.transform = this.transform
	}
	set y(y){
		let dy = y - this.pivot.y
		this._elements.forEach((element)=>{
//			element.y -= -dy //You really want to to this?
		})
		this.pivot.y = y
		this.transform = this.transform
	}
	get x(){
		return this.pivot.x
	}
	get y(){
		return this.pivot.y
	}
	set elements(elements){
		this.element.innerHTML = ""
		elements.forEach(element=>element.appendTo(this.element))
		this._elements = elements
	}
	redrawElement(element){
		let redrawable = this._elements.find(_element=>_element.id==element.id)
		redrawable.redraw()
	}
}

SoumElement.prototype.listenTo = function(eventName, callback){
	KBugol.addListener(eventName, this)
	this[eventName] = callback
}

SoumElement.prototype.listenToSome = function(namedCallbacks){
	for(var eventName in namedCallbacks)
		this.listenTo(eventName, namedCallbacks[eventName])
}
SoumElement.prototype.stopListeningTo = function(eventName){
	KBugol.removeListener(eventName, this)
}
SoumElement.prototype.focus = function(){
	KBugol.target = this
	this.element.classList.add("focused")
}
SoumElement.prototype.unfocus = function(){
	KBugol.target = null
	this.element.classList.remove("focused")
}

const TSS = ThreeSimpleScripts
const A = TSS.add

TSS.getCounterFor = (object)=>{
	if(!globalThis[object.prototype.constructor.name])
		globalThis[object.prototype.constructor.name] = object.prototype.constructor
	return ++globalThis[object.prototype.constructor.name].counter
}
