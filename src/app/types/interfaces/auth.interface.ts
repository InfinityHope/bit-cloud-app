export interface IAuthResponse {
	user: {
		id: number
		email: string
		name: string
		nickName: string
		avatar: string
		socialLinks: string[]
		telephone: string
		role: string
	}
	accessToken: string
}
export interface IRegisterFields {
	email: string
	password: string
	name: string
	nickName: string
	telephone: string
	isMusician: boolean
	avatar: File
}

export interface ILoginFields {
	email: string
	password: string
}
