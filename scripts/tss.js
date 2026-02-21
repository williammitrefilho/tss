class ThreeSimpleScripts{
	static start(){
		let tss = new ThreeSimpleScripts()
		tss.bind()
		ThreeSimpleScripts.main = tss
		ThreeSimpleScripts.root = tss.main.element
	}
	constructor(){
		this.main = Soum.svg(330)
	}
	bind(){
		this.main.appendTo(document.body)
	}
}

const TSS = ThreeSimpleScripts
