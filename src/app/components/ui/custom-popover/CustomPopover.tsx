import {
	Button,
	FormControl,
	FormLabel,
	forwardRef,
	HStack,
	Input,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	useDisclosure
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

interface ICustomPopover {
	addFunc: () => void
	formLabel: string
}

const CustomPopover = forwardRef<ICustomPopover, 'input'>(({ addFunc, formLabel }, ref: any) => {
	const { onOpen, onClose, isOpen } = useDisclosure()
	return (
		<Popover
			isOpen={isOpen}
			onOpen={onOpen}
			initialFocusRef={ref}
			onClose={onClose}
			placement='right'
		>
			<PopoverTrigger>
				<Button
					size={'xs'}
					_hover={{ bgColor: 'darkBlue' }}
					bgColor={'lightBlue'}
					ml={'1em'}
				>
					<BiPlus />
				</Button>
			</PopoverTrigger>
			<PopoverContent p={3} bgColor={'primary'}>
				<PopoverArrow bgColor={'primary'} />
				<PopoverCloseButton />
				<HStack spacing={2} alignItems={'flex-end'}>
					<FormControl>
						<FormLabel>{formLabel}</FormLabel>
						<Input
							ref={ref}
							onKeyDown={e => {
								if (e.code === 'Enter') {
									addFunc()
								}
							}}
						/>
					</FormControl>
					<Button
						_hover={{ bgColor: 'darkBlue' }}
						bgColor={'lightBlue'}
						onClick={addFunc}
					>
						Добавить
					</Button>
				</HStack>
			</PopoverContent>
		</Popover>
	)
})

export default CustomPopover
