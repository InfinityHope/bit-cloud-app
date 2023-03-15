import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = `${process.env.API_URL}/api`

export const getContentType = () => ({
	'Content-type': 'application/json'
})

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

export const axiosAuth = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

axiosAuth.interceptors.request.use(config => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})
