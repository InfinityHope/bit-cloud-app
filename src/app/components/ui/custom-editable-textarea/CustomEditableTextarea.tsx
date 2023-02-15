import { Editable, EditablePreview, EditableTextarea, Textarea } from '@chakra-ui/react'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

interface ICustomEditableTextarea {
	name: string
	control: Control
	defaultValue: string
}

const CustomEditableTextarea: FC<ICustomEditableTextarea> = ({ name, control, defaultValue }) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue ? defaultValue : 'Добавить описание...'}
			control={control}
			render={({ field }) => (
				<Editable value={field.value} mt={'1em'}>
					<EditablePreview />
					<Textarea onChange={field.onChange} as={EditableTextarea} />
				</Editable>
			)}
		/>
	)
}

export default CustomEditableTextarea
