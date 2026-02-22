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
	constructor(elements = []){
		super("g")
		this.elements = elements
	}
	set x(x){
		super.x = x
		this._elements.forEach((element)=>{
			element.x = x
		})
	}
	set y(y){
		super.y = y
		this._elements.forEach((element)=>{
			element.y = y
		})
	}
	set elements(elements){
		this.element.innerHTML = ""
		elements.forEach(element=>element.appendTo(this.element))
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
