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
					fontSize={'4xl'}
					lineHeight={'1.2em'}
					fontWeight={'bold'}
					value={field.value}
				>
					<EditablePreview />
					<Input onChange={field.onChange} as={EditableInput} />
				</Editable>
			)}
		/>
	)
}

export default CustomEditableInput
