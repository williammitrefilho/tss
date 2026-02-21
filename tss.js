JumiLoader.scriptPath = "file:///home/mitre/tss/scripts/"

let A, kbug

GreediScript
.needs('kbugol/kbugol')
.and('soum/soum')
.to(()=>{
	init()
	TSS.main.listenTo("letterKeyKPressed", ()=>{
		console.log("I sense a key")
	})
	TSS.main.listenTo("keyTPressed", ()=>{
		TSS.add("text", "textOne").in(TSS.root).focus()
	})
	TSS.main.listenTo("keyCPressed", ()=>{
		TSS.add("circle", "circleOne").in(TSS.root).focus()
	})
})

function init(){
	TSS.start()
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
		this.y -= 5
	}
	TSS.add = (type, name)=>{
		if(!TSS[`${type}s`])
			TSS[`${type}s`] = {}
		let soum = A(type)

		
		TSS[`${type}s`][name]?.element.remove()
		TSS[`${type}s`][name] = soum
		return soum
	}
	A = Soum.a
	kbug = new KBugol()
	kbug.listen()
}
