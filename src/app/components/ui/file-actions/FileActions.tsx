import { animationsConfig } from '@/app/config/animations.config'
import { stringCut } from '@/app/utils/stringCut'
import { Button, Input, Stack, useMediaQuery } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ChangeEvent, FC, useRef } from 'react'

interface IFileActions {
	audio: File | null
	resources: File | null
	setAudio: (e: ChangeEvent<HTMLInputElement>) => void
	setResources: (e: ChangeEvent<HTMLInputElement>) => void
	setAudioDuration: (value: number) => void
	variant?: string
}

const MotionButton = motion(Button)

const FileActions: FC<IFileActions> = ({
	audio,
	resources,
	setAudio,
	variant = 'vertical',
	setAudioDuration,
	setResources
}) => {
	const inputAudioRef = useRef<HTMLInputElement | null>(null)
	const inputResourcesRef = useRef<HTMLInputElement | null>(null)

	const [isLargerThan500] = useMediaQuery('(min-width: 500px)', {
		ssr: true,
		fallback: false
	})

	const setAudioHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]
			if (e.target.files[0].type === 'audio/mpeg') {
				const audio = new Audio()
				audio.src = URL.createObjectURL(file)
				audio.onloadedmetadata = () => {
					setAudioDuration(Math.ceil(audio.duration))
				}
			}
		}
		setAudio(e)
	}

	const buttons = [
		{
			fileName: audio ? stringCut(audio.name) : 'Загрузить новый аудиофайл',
			ref: inputAudioRef,
			accept: 'audio/*',
			setFunction: (e: ChangeEvent<HTMLInputElement>) => setAudioHandler(e)
		},
		{
			fileName: resources ? stringCut(resources.name) : 'Загрузить новый архив',
			ref: inputResourcesRef,
			accept: '.zip,.rar,.7zip',
			setFunction: (e: ChangeEvent<HTMLInputElement>) => setResources(e)
		}
	]

	return (
		<Stack direction={isLargerThan500 && variant === 'vertical' ? 'row' : 'column'} spacing={3}>
			{buttons.map(({ ref, fileName, accept, setFunction }, index) => (
				<div key={index}>
					<MotionButton
						variants={animationsConfig}
						initial={'listInitialFade'}
						animate={'listAnimateFade'}
						custom={index}
						onClick={() => ref.current && ref.current.click()}
					>
						{fileName}
					</MotionButton>
					<Input ref={ref} type='file' accept={accept} onChange={setFunction} hidden />
				</div>
			))}
		</Stack>
	)
}

export default FileActions
