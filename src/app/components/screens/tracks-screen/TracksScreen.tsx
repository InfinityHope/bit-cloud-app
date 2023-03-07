import bgImg from "@/assets/secondary-bg.jpg"
import Meta from "@/components/meta/Meta"
import { PageHeader, TrackList } from "@/components/ui"
import { useTracks } from "@/hooks/tracks-hooks/useTracks"
import { Flex, Heading, Text } from "@chakra-ui/react"

const TracksScreen = () => {
	const tracks = useTracks()

	return (
		<>
			<Meta title={"Bit Cloud Tracks"} />
			<Flex color={"#fff"} flexDirection={"column"}>
				<PageHeader bgImg={bgImg.src}>
					<Heading as={"h3"}>Все треки</Heading>
				</PageHeader>
				{tracks && tracks.tracks.length !== 0 ? (
					<TrackList tracks={tracks.tracks} />
				) : (
					<Text mt={"1em"} ml={"1em"} fontSize={"2xl"} color={"white"}>
						Треки пока отсутствуют
					</Text>
				)}
			</Flex>
		</>
	)
}

export default TracksScreen
