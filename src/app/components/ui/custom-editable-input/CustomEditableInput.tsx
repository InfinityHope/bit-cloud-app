import { useMaskInput } from '@/app/hooks/useMaskInput'
import {
	Editable,
	EditableInput,
	EditablePreview,
	FormControl,
	FormErrorMessage,
	Input
} from '@chakra-ui/react'
import { FC } from 'react'
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
	isMobileInput?: boolean
}

const CustomEditableInput: FC<ICustomEditableInput> = ({
	name,
	defaultValue,
	control,
	isRequired = false,
	pattern,
	patternMessage = '',
	fontSize = '2xl',
	fontWeight = 'regular',
	isMobileInput
}) => {
	const { handlePhoneInput } = useMaskInput()

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
			render={({ field, fieldState: { invalid, error } }) => (
				<FormControl isInvalid={invalid}>
					<Editable
						borderBottom={'1px solid white'}
						fontSize={fontSize}
						fontWeight={fontWeight}
						placeholder={'Введите значение'}
						value={field.value}
					>
						<EditablePreview display={'block'} />
						<Input
							onInput={isMobileInput ? handlePhoneInput : undefined}
							variant={'unstyled'}
							fontSize={fontSize}
							onChange={field.onChange}
							as={EditableInput}
						/>
					</Editable>
					{error?.message && <FormErrorMessage>{error?.message}</FormErrorMessage>}
				</FormControl>
			)}
		/>
	)
}

export default CustomEditableInput
