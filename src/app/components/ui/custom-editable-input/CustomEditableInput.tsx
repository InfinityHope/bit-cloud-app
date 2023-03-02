import {
	Editable,
	EditableInput,
	EditablePreview,
	FormControl,
	FormErrorMessage,
	Input
} from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

interface ICustomEditableInput {
	name: string
	defaultValue: string
	control: Control<any, any>
	isRequired?: boolean
	pattern?: RegExp
	patternMessage?: string
	fontSize?: 'xl' | '2xl' | '3xl' | '4xl' | 'lg' | 'md' | 'xs'
	fontWeight?: 'bold' | 'regular' | 'medium' | 'light'
}

const CustomEditableInput: FC<ICustomEditableInput> = ({
	name,
	defaultValue,
	control,
	isRequired = false,
	pattern,
	patternMessage = '',
	fontSize = '2xl',
	fontWeight = 'regular'
}) => {
	const [errors, setErrors] = useState<any>([])

	useEffect(() => {
		setErrors(control._formState.errors)
	}, [control._formState.errors])

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={{
				required: {
					value: isRequired,
					message: 'Поле обязательно для заполнения'
				},
				pattern: {
					value: pattern ? pattern : /^/i,
					message: patternMessage
				}
			}}
			render={({ field }: any) => (
				<FormControl isInvalid={!!errors[name]}>
					<Editable
						borderBottom={'1px solid white'}
						fontSize={fontSize}
						fontWeight={fontWeight}
						placeholder={'Введите значение'}
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
					{errors[name] && <FormErrorMessage>{errors[name].message}</FormErrorMessage>}
				</FormControl>
			)}
		/>
	)
}

export default CustomEditableInput
