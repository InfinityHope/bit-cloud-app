export const stringCut = (str: string) => {
	let sliced = str.slice(0, 23)
	if (sliced.length < str.length) {
		sliced += '...'
	}
	return sliced
}
