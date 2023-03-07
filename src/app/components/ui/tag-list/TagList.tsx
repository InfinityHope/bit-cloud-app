import { animationsConfig } from '@/app/config/animations.config'
import { useNotification } from '@/app/hooks/useNotification'
import { Flex, List, ListItem, Tag, TagCloseButton, TagLabel, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FC, useRef } from 'react'
import CustomPopover from '../custom-popover/CustomPopover'

interface ITagList {
	tags: string[]
	addTag?: (value: string) => void
	removeTag?: (index: number) => void
	action?: boolean
}

const MotionListItem = motion(ListItem)

const TagList: FC<ITagList> = ({ tags, addTag, removeTag, action = true }) => {
	const { errorMessage } = useNotification()
	const tagRef = useRef<HTMLInputElement | null>(null)

	const add = () => {
		if (addTag && tagRef.current) {
			if (tagRef.current.value !== '') {
				addTag(tagRef.current.value)
				tagRef.current.value = ''
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
				{action && <CustomPopover addFunc={add} ref={tagRef} formLabel={'Введите тег'} />}
			</Flex>
		</Flex>
	)
}

export default TagList
