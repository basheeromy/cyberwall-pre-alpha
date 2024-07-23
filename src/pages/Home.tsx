import React, { useState } from 'react';
import { ChakraProvider, Box, IconButton, Input, InputGroup, InputRightElement, Button, Wrap, WrapItem, Text } from '@chakra-ui/react';
import { Logo } from '../components/Logo';
import { FiSearch } from 'react-icons/fi';

// Main Home Component
const Home: React.FC = () => {
	const [query, setQuery] = useState<string>('');

	const handleQuestionClick = (question: string) => {
		setQuery(question); // Update search query with the clicked question
	};

	return (
		<ChakraProvider>
			<Box maxWidth="1200px" margin="0 auto" alignContent={'center'}>
				<Box as="main" padding={4}>
					<Logo />
					<SearchBar query={query} setQuery={setQuery} />
					<QuickQuestions onQuestionClick={handleQuestionClick} />
				</Box>
			</Box>
		</ChakraProvider>
	);
}

export default Home;

// SearchBar Component
interface SearchBarProps {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (query.trim()) {
			window.location.href = `/chat?query=${encodeURIComponent(query)}`;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // Prevent default enter behavior
			handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Call submit handler
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputGroup size="lg" marginY={8}>
				<Input
					placeholder="Ask me anything!"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
				/>
				<InputRightElement>
					<IconButton
						aria-label="Search"
						icon={<FiSearch />}
						size="sm"
						colorScheme="blue"
						type="submit"
					/>
				</InputRightElement>
			</InputGroup>
		</form>
	);
};

// QuickQuestions Component
interface QuickQuestionsProps {
	onQuestionClick: (question: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onQuestionClick }) => {
	const questions: string[] = [
		"Is this website trustable?",
		"Is this number trustable?",
		"This fb friend is asking for money",
		"Is this OTP message from SBI?",
		"How can register a complain?"
	];

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
	);
}
