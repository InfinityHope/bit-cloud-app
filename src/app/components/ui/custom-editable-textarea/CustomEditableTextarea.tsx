import { Editable, EditablePreview, EditableTextarea, Textarea } from '@chakra-ui/react'
import { FC } from 'react'
import { Control, Controller } from 'react-hook-form'

interface ICustomEditableTextarea {
	name: string
	control: Control<any, any>
	defaultValue: string
}

const CustomEditableTextarea: FC<ICustomEditableTextarea> = ({ name, control, defaultValue }) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue ? defaultValue : ''}
			render={({ field }) => (
				<Editable
					border={'1px solid white'}
					borderRadius={'10px'}
					px={'10px'}
					py={'5px'}
					minH={'95px'}
					placeholder={'Изменить описание...'}
					value={field.value}
					mt={'1em'}
				>
					<EditablePreview display={'block'} minHeight={'inherit'} />
					<Textarea
						lineHeight={'1em'}
						variant={'unstyled'}
						minH={'95px'}
						focusBorderColor={'transparent'}
						onChange={field.onChange}
						as={EditableTextarea}
					/>
				</Editable>
			)}
		/>
	)
}

export default CustomEditableTextarea
