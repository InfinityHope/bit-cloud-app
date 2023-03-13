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
	Portal,
	useDisclosure,
	useMediaQuery
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

interface ICustomPopover {
	addFunc: () => void
	formLabel: string
}

const CustomPopover = forwardRef<ICustomPopover, 'input'>(({ addFunc, formLabel }, ref: any) => {
	const { onOpen, onClose, isOpen } = useDisclosure()

	const [isLargerThan500] = useMediaQuery('(min-width: 500px)', {
		ssr: true,
		fallback: false
	})

	return (
		<Popover
			isOpen={isOpen}
			onOpen={onOpen}
			initialFocusRef={ref}
			onClose={onClose}
			placement={isLargerThan500 ? 'right' : 'bottom'}
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
			<Portal>
				<PopoverContent p={3} bgColor={'primary'} color={'white'}>
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
			</Portal>
		</Popover>
	)
})

export default CustomPopover
