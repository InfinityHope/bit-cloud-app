export const animationsConfig = {
	initialFadeScale: {
		opacity: 0,
		scale: 0.5
	},
	animateFadeScale: {
		opacity: 1,
		scale: 1
	},
	initialFromLeft: {
		x: -500
	},
	animateFromLeft: {
		x: 0
	},
	initialFromTop: {
		y: -500
	},
	animateFromTop: {
		y: 0
	},
	initialFromBottom: {
		y: 200
	},
	animateFromBottom: {
		y: 0
	},
	listInitialFade: {
		opacity: 0,
		scale: 0.5
	},
	listAnimateFade: (i: number) => ({
		opacity: 1,
		scale: 1,
		transition: {
			duration: (i + 1) * 0.2
		}
	}),
	listInitialTop: {
		opacity: 0,
		y: -100
	},
	listAnimateTop: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: (i + 1) * 0.3
		}
	}),
	listInitialLeft: {
		opacity: 0,
		x: -100
	},
	listAnimateLeft: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3 * (i + 1)
		}
	}),
	listInitialRight: {
		opacity: 0,
		x: 100
	},
	listAnimateRight: (i: number) => ({
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4 * (i + 1)
		}
	})
}
