JumiLoader.include('kbugol/kbugol')
JumiLoader.include('soum/soum')

let A, TSS

Jumi.ready = () => {

	class ThreeSimpleScripts{
		static add(type, name){

			if(!TSS[`${type}s`])
				TSS[`${type}s`] = {}
			let soum = A(type)

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
			tss.bind()
			ThreeSimpleScripts.tss = tss
			ThreeSimpleScripts.main = tss.main
			ThreeSimpleScripts.root = tss.main.element
		}

		constructor(){
			this.main = Soum.svg(330)
		}
		bind(){
			this.main.appendTo(document.body)
		}
	}

	class Group {
		constructor(elements = []){
			this.elements = elements
		}
		set x(x){
			this._x = x
			this.elements.forEach((element)=>{
				element.x = x
			})
		}
		set y(y){
			this._y = y
			this.elements.forEach((element)=>{
				element.y = y
			})
		}
	}
	
	SoumElement.prototype.listenTo = function(eventName, callback){
		KBugol.addListener(eventName, this)
		this[eventName] = callback
	}
	SoumElement.prototype.stopListeningTo = function(eventName){
		KBugol.removeListener(eventName, this)
	}
	SoumElement.prototype.keyESCAPEPressed = ()=>{
		KBugol.target?.unfocus?.()
	}
	SoumElement.prototype.focus = function(){
		Array.from(document.querySelector("svg *")).forEach((element)=>{
			element.classList.remove("focused")
		})
		this.element.classList.add("focused")
		KBugol.target = this
	}
	SoumElement.prototype.unfocus = function(){
		this.element.classList.remove("focused")
		KBugol.target = TSS.main
	}
	SoumGraphic.prototype.keyARROWUPPressed = function(){
		this.y = Number(this.y) - 5
	}
	SoumGraphic.prototype.keyARROWDOWNPressed = function(){
		this.y = Number(this.y) + 5
	}
	SoumGraphic.prototype.keyARROWLEFTPressed = function(){
		this.x = Number(this.x) - 5
	}
	SoumGraphic.prototype.keyARROWRIGHTPressed = function(){
		this.x = Number(this.x) + 5
	}
	A = Soum.a
	TSS = ThreeSimpleScripts

	JumiLoader.broadcast(Group)
}
