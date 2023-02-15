export const convertDate = (date: string) => {
	return new Date(date).toLocaleDateString('ru', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}
