import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { FC } from "react"

const SearchInput: FC<{ width: string }> = ({ width }) => {
	return (
		<InputGroup width={width} alignItems={"center"}>
			<InputRightElement pointerEvents='none' children={<SearchIcon color='white' />} />
			<Input variant={"unstyled"} placeholder={"Поиск по трекам"} />
		</InputGroup>
	)
}

export default SearchInput
