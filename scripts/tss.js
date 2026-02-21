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

	SoumElement.prototype.listenToSome = function(namedCallbacks){
		for(var eventName in namedCallbacks)
			this.listenTo(eventName, namedCallbacks[eventName])
	}
	SoumElement.prototype.stopListeningTo = function(eventName){
		KBugol.removeListener(eventName, this)
	}
	A = Soum.a
	TSS = ThreeSimpleScripts

	JumiLoader.broadcast(Group)
}
