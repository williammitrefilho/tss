JumiLoader.scriptPath = "file:///home/mitre/tss/scripts/"

JumiLoader.include('kbugol/kbugol')
JumiLoader.include('soum/soum')
JumiLoader.include('tss')

Jumi.ready = ()=>{

	TSS.start()
	kbug = new KBugol()
	kbug.listen()

	TSS.main.listenTo("letterKeyKPressed", ()=>{
		console.log("I sense a key")
	})
	TSS.main.listenTo("keyTPressed", ()=>{
		TSS.add("text").in(TSS.root).focus()
	})
	TSS.main.listenTo("keyCPressed", ()=>{
		TSS.add("circle").in(TSS.root).focus()
	})
}
