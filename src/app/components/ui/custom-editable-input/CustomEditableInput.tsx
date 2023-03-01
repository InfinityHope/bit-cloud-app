import { Editable, EditableInput, EditablePreview, Input } from '@chakra-ui/react'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

interface ICustomEditableInput {
	name: string
	defaultValue: string
	control: Control
}

const CustomEditableInput: FC<ICustomEditableInput> = ({ name, defaultValue, control }) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			render={({ field }: any) => (
				<Editable
					borderBottom={'1px solid white'}
					fontSize={'3xl'}
					fontWeight={'bold'}
					placeholder={'Введите название'}
					value={field.value}
				>
					<EditablePreview />
					<Input
						variant={'unstyled'}
						fontSize={'3xl'}
						onChange={field.onChange}
						as={EditableInput}
					/>
				</Editable>
			)}
		/>
	)
}

export default CustomEditableInput
