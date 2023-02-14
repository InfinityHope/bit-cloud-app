import { Flex, List, ListItem, Tag, Text } from '@chakra-ui/react'
import { FC } from 'react'

const TagList: FC<{ tags: string[] }> = ({ tags }) => {
	return (
		<Flex display={'flex'} mt={'1em'}>
			<Text fontSize={'1.5em'} mr={'1em'}>
				Теги:
			</Text>
			<List display={'flex'} alignItems={'center'}>
				{tags.map(tag => {
					return (
						<ListItem mr={'1em'}>
							<Tag size={'lg'} color={'white'} bgColor={'lightBlue'}>
								{tag}
							</Tag>
						</ListItem>
					)
				})}
			</List>
		</Flex>
	)
}

export default TagList
