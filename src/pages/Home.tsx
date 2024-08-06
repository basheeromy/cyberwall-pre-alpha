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
				<Link>Facebook profiles, </Link>
				<Link>Links, </Link>
				<Link>Phone Numbers, </Link>
				<Link>Bank accounts</Link>
			</Flex>
		</Flex>
	)
}

// // SearchBar Component
// interface SearchBarProps {
// 	query: string
// 	setQuery: React.Dispatch<React.SetStateAction<string>>
// }

// const placeholders = [
// 	'e.g., IN-HDFCBK',
// 	'e.g., http://example.com',
// 	'e.g., 9876543210',
// 	'e.g., 123456789012',
// 	'e.g., https://facebook.com/username'
// ];

// export function SearchBar({ query, setQuery }: SearchBarProps) {
// 	const [placeholder, setPlaceholder] = useState(placeholders[0]);

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setPlaceholder((prev) => {
// 				const currentIndex = placeholders.indexOf(prev);
// 				const nextIndex = (currentIndex + 1) % placeholders.length;
// 				return placeholders[nextIndex];
// 			});
// 		}, 3000); // Change placeholder every 3 seconds
// 		return () => clearInterval(interval);
// 	}, []);

// 	return (
// 		<Box width="100%" marginY={4}>
// 			<InputGroup size="lg">
// 				<Input
// 					placeholder={placeholder}
// 					value={query}
// 					onChange={(e) => setQuery(e.target.value)}
// 					sx={{
// 						border: '2.5px solid transparent',
// 						borderRadius: 'md',
// 						_focus: {
// 							borderColor: 'black',
// 						},
// 					}}
// 				/>
// 				<InputRightElement>
// 					<FiSearch />
// 				</InputRightElement>
// 			</InputGroup>
// 		</Box>
// 	);
// }


// const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
// 	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
// 		e.preventDefault()
// 		if (query.trim()) {
// 			window.location.href = `/chat?query=${encodeURIComponent(query)}`
// 		}
// 	}

// 	const handleKeyDown = (e) => {
// 		if (e.key === 'Enter') {
// 			e.preventDefault() // Prevent default enter behavior
// 			handleSubmit(e as unknown as FormEvent<HTMLFormElement>) // Call submit handler
// 		}
// 	}

// 	const keyframes = `
//   @keyframes rotate-border {
//     0% {
//       border-image-source: linear-gradient(0deg, #FFCC00, #3C3795);
//     }
//     25% {
//       border-image-source: linear-gradient(90deg, #FFCC00, #3C3795);
//     }
//     50% {
//       border-image-source: linear-gradient(180deg, #FFCC00, #3C3795);
//     }
//     75% {
//       border-image-source: linear-gradient(270deg, #FFCC00, #3C3795);
//     }
//     100% {
//       border-image-source: linear-gradient(360deg, #FFCC00, #3C3795);
//     }
//   }
//   `

// 	return (
// 		<div>
// 			<style>{keyframes}</style>
// 			<form
// 				onSubmit={handleSubmit}
// 				style={{
// 					display: 'flex',
// 					flexDirection: 'column',
// 					alignItems: 'center',
// 					marginTop: '16px',
// 				}}
// 			>
// 				<div
// 					style={{
// 						display: 'flex',
// 						alignItems: 'center',
// 						border: '2px solid transparent',
// 						borderImage:
// 							'linear-gradient(45deg, #F9F8FF, #3C3795) 1',
// 						animation: 'rotate-border 3s linear infinite',
// 						padding: '4px',
// 						borderRadius: '8px',
// 					}}
// 				>
// 					<span
// 						style={{
// 							background: 'none',
// 							borderRight: 'none',
// 							color: 'blue',
// 							padding: '0 8px',
// 						}}
// 					>
// 						<PiMagicWand />
// 					</span>
// 					<input
// 						style={{
// 							border: 'none',
// 							outline: 'none',
// 							fontFamily: "'Red Hat Display', sans-serif",
// 							padding: '8px',
// 						}}
// 						placeholder="Ask me anything!"
// 						value={query}
// 						onChange={(e) => setQuery(e.target.value)}
// 						onKeyDown={handleKeyDown}
// 					/>
// 					<button
// 						type="submit"
// 						style={{
// 							border: 'none',
// 							background: 'none',
// 							color: 'blue',
// 							cursor: 'pointer',
// 							padding: '8px',
// 						}}
// 					>
// 						<PiArrowRightBold />
// 					</button>
// 				</div>
// 			</form>
// 		</div>
// 	)
// }

// QuickQuestions Component
interface QuickQuestionsProps {
	onQuestionClick: (question: string) => void
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onQuestionClick }) => {
	const questions: string[] = [
		'Is this website trustable?',
		'Is this number trustable?',
		'This fb friend is asking for money',
		'Is this OTP message from SBI?',
		'How can register a complain?',
	]

	return (
		<Wrap spacing={4} marginY={8}>
			{questions.map((question, index) => (
				<WrapItem key={index}>
					<Button
						colorScheme="purple"
						variant="outline"
						onClick={() => onQuestionClick(question)} // Call function with clicked question
					>
						{question}
					</Button>
				</WrapItem>
			))}
		</Wrap>
	)
}
