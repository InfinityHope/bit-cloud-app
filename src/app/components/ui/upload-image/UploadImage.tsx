import { animationsConfig } from '@/app/config/animations.config'
import { Box, Image as Img, Input } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from 'react'

interface IUploadImage {
	upload: boolean
	image: Blob | null
	setImage: Dispatch<SetStateAction<Blob | null>>
	initialImage: string
	borderRadius?: string
	width?: string
	height?: string
}

const MotionImage = motion(Img)

const UploadImage: FC<IUploadImage> = ({
	upload,
	setImage,
	initialImage,
	borderRadius = '10px',
	width = '300px',
	height = '300px'
}) => {
	const imgRef = useRef<HTMLInputElement | null>(null)
	const [imageSrc, setImageSrc] = useState<string | null>(null)

	const changeImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0]
			const image = new Image(300)
			image.src = URL.createObjectURL(file)
			setImage(file)
			setImageSrc(image.src)
		}
	}

	return (
		<Box>
			<MotionImage
				variants={animationsConfig}
				initial={'initialFadeScale'}
				animate={'animateFadeScale'}
				transition={{
					opacity: { ease: 'linear' },
					duration: 0.4
				}}
				width={width}
				height={height}
				maxHeight={'300px'}
				maxWidth={'300px'}
				minHeight={'100px'}
				minWidth={'100px'}
				cursor={upload ? 'pointer' : 'default'}
				border={upload ? '3px solid white' : ''}
				objectFit={'cover'}
				borderRadius={borderRadius}
				src={imageSrc ? imageSrc : initialImage}
				alt={initialImage}
				onClick={() => imgRef.current && upload && imgRef.current.click()}
				mr={'1em'}
			/>
			<Input ref={imgRef} type='file' accept='image/*' onChange={changeImage} hidden />
		</Box>
	)
}

export default UploadImage
