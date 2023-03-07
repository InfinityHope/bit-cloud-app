import bgImg from "@/assets/4-bg.jpg"
import Meta from "@/components/meta/Meta"
import { CustomSpinner, PageHeader } from "@/components/ui"
import { useMusicians } from "@/hooks/user-hooks/useMusicians"
import { Flex, Heading, Text } from "@chakra-ui/react"
import MusiciansList from "./musicians-list/MusiciansList"

const MusiciansScreen = () => {
	const { musicians, isLoading } = useMusicians()

	return (
		<>
			<Meta title={"Bit Cloud Authors"} />
			{isLoading ? <CustomSpinner /> : null}
			<Flex color={"#fff"} flexDirection={"column"}>
				<PageHeader bgImg={bgImg.src}>
					<Heading as={"h3"}>Все музыканты</Heading>
				</PageHeader>

				{musicians && musicians.length !== 0 ? (
					<MusiciansList musicians={musicians} />
				) : (
					<Text mt={"1em"} ml={"1em"} fontSize={"2xl"} color={"white"}>
						Пока что нет ни одного доступного музыканта
					</Text>
				)}
			</Flex>
		</>
	)
}

export default MusiciansScreen
