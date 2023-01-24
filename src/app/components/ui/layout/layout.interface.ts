import { IMeta } from '@/components/meta/meta.interface'

export interface ILayout {
	meta: IMeta
	content?: {
		justifyContent: string
		alignItems: string
	}
}
