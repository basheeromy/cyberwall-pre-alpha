import React, { FormEvent, useEffect, useState } from 'react'
import {
	ChakraProvider,
	Box,
	Flex,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Button,
	Wrap,
	WrapItem,
	Text,
	InputLeftAddon,
	Icon,
	Link,
} from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import { PiArrowRightBold, PiMagicWand } from 'react-icons/pi'
import { PasteFromClipBoard } from '../components/HomePage/PasteFromClipBoard'
import { NavBar } from '../components/NavBar'
import { FiSearch } from 'react-icons/fi'
import SearchBar from '../components/HomePage/searchBar'

// Main Home Component
const Home: React.FC = () => {
	const [query, setQuery] = useState<string>('')

	return (
		<ChakraProvider>
			<Box margin="0 auto" height="100vh">
				<Flex
					as="main"
					direction="column"
					minHeight="100vh"
					justifyContent="space-between"
				>
					<NavBar />
					{/* searchbox */}
					<Flex
						direction="column"
						flex="1"
						padding={4}
						alignItems="center"
						justifyContent="center"
					>
						<Box width={['80%', '70%', '50%', '30%']} mt={4}>
							<Logo />
						</Box>
						<Box width={['90%', '80%', '50%', '40%']} mt={4}>
							<SearchBar query={query} setQuery={setQuery} />
						</Box>
						<PasteFromClipBoard
							onSuccessFullClipBoard={(data) => {
								setQuery(data)
							}}
						/>
					</Flex>
					<YouCanSearchForComponent />
				</Flex>
			</Box>
		</ChakraProvider>
	)
}

export default Home

const YouCanSearchForComponent: React.FC = () => {
	return (
		<Flex
			direction="column"
			alignItems="center"
			alignContent="center"
			padding={4}
		>
			<Text color="#808080" textAlign="center">
				You can check authenticity of
			</Text>
			<Flex
				color="blue"
				textDecoration="underline"
				wrap="wrap"
				gap="3px"
				justifyContent="center"
			>
				<Link>SMS Contents, </Link>
				<Link>Facebook Profiles, </Link>
				<Link>Links, </Link>
				<Link>APK's</Link>
			</Flex>
		</Flex>
	)
}

// QuickQuestions Component
interface QuickQuestionsProps {
	onQuestionClick: (question: string) => void
}