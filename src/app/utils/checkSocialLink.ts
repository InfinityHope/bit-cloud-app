export const checkSocialLink = (link: string) => {
	if (link.includes('vk.com')) {
		return 'VK'
	} else if (link.includes('t.me')) {
		return 'Telegram'
	} else if (link.includes('wa.me')) {
		return 'WhatsApp'
	} else if (link.includes('facebook.com')) {
		return 'facebook'
	} else {
		return link
	}
}
