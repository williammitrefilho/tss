JumiLoader.scriptPath = "file:///home/mitre/tss/scripts/"
GreediScript
.needs('kbugol/kbugol')
.and('soum/soum')
.and('tss')
.to(()=>{
	console.log('we are all here', KBugol, Soum, ThreeSimpleScripts)
	init()
})
let A
function init(){
	TSS.start()
	A = Soum.a
	let circle = A("circle").in(TSS.root)
}
