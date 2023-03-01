import { animationsConfig } from '@/app/config/animations.config'
import { useNotification } from '@/app/hooks/useNotification'
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	HStack,
	Input,
	List,
	ListItem,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC, useRef } from 'react'
import { BiPlus } from 'react-icons/bi'

interface ITagList {
	tags: string[]
	addTag?: (value: string) => void
	removeTag?: (index: number) => void
	action?: boolean
}

const MotionListItem = motion(ListItem)

const TagList: FC<ITagList> = ({ tags, addTag, removeTag, action = true }) => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	const { errorMessage } = useNotification()
	const tagRef = useRef<any>('')

	const add = () => {
		if (addTag) {
			if (tagRef.current.value !== '') {
				addTag(tagRef.current.value)
				tagRef.current.value = ''
				onClose()
			} else {
				errorMessage('Введите значение', 'Тег не может быть пустым')
			}
		}
	}

	const remove = (index: number) => {
		if (removeTag) removeTag(index)
	}

	return (
		<Flex mt={'1.5em'}>
			<Text mr={'1em'}>Теги:</Text>
			<Flex alignItems={'center'}>
				{tags.length !== 0 && (
					<List display={'flex'}>
						{tags.map((tag, index) => (
							<MotionListItem
								variants={animationsConfig}
								initial={'listInitialFade'}
								animate={'listAnimateFade'}
								custom={index}
								mr={'1em'}
								key={tag}
							>
								<Tag size={'md'} color={'white'} bgColor={'lightBlue'}>
									<TagLabel>{tag}</TagLabel>
									{action && <TagCloseButton onClick={() => remove(index)} />}
								</Tag>
							</MotionListItem>
						))}
					</List>
				)}
				{action && (
					<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement='right'>
						<PopoverTrigger>
							<Button
								size={'xs'}
								_hover={{ bgColor: 'darkBlue' }}
								bgColor={'lightBlue'}
							>
								<BiPlus />
							</Button>
						</PopoverTrigger>
						<PopoverContent p={3} bgColor={'primary'}>
							<PopoverArrow bgColor={'primary'} />
							<PopoverCloseButton />
							<HStack spacing={2} alignItems={'flex-end'}>
								<FormControl>
									<FormLabel>Название тега</FormLabel>
									<Input ref={tagRef} />
								</FormControl>
								<Button
									_hover={{ bgColor: 'darkBlue' }}
									bgColor={'lightBlue'}
									onClick={add}
								>
									Добавить
								</Button>
							</HStack>
						</PopoverContent>
					</Popover>
				)}
			</Flex>
		</Flex>
	)
}

export default TagList
