export function msToTime(duration: number) {
	let seconds: string | number = Math.floor(duration % 60),
		minutes: string | number = Math.floor((duration / 60) % 60)

	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	return minutes + ':' + seconds
}
