import React, { useState, useEffect } from 'react';
import { Box, Flex, VStack, Text, Button, Input, Avatar, useBreakpointValue, Alert, AlertIcon } from '@chakra-ui/react';
import { FaPlus, FaUser } from 'react-icons/fa';
import axios from 'axios';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: string;
}

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [initialQuery, setInitialQuery] = useState<string>('');

    const showSidebar = useBreakpointValue({ base: false, lg: true });

    useEffect(() => {
        // Extract query parameter from URL
        const queryParams = new URLSearchParams(window.location.search);
        const query = queryParams.get('query') || '';

        if (query) {
            setInitialQuery(query);
            // Add initial query message
            const initialMessage: Message = {
                id: 0,
                text: query,
                sender: 'user',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages([initialMessage]);
            fetchInitialResponse(query);
        }
    }, []);

    const fetchInitialResponse = async (query: string) => {
        setIsTyping(true);
        try {
            const response = await axios.post('https://cors-anywhere.herokuapp.com/https://ragnarok.nysaclan.com/api/v1/wall/chat', {
                data: [
                    {
                        content: "Hello! How can I assist you today?",
                        role: "assistant",
                        type: "chat"
                    },
                    {
                        content: query,
                        role: "user",
                        type: "chat"
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const aiMessage: Message = { id: 1, text: response.data.response, sender: 'ai', timestamp: new Date().toLocaleTimeString() };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
            setIsTyping(false);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching initial response:", error);
            setError("There was an issue fetching the initial response. Please try again later.");
            setIsTyping(false);
        }
    };

    const sendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const userMessage: Message = { id: messages.length, text: inputMessage, sender: 'user', timestamp: new Date().toLocaleTimeString() };
        setMessages([...messages, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        try {
            const response = await axios.post('https://cors-anywhere.herokuapp.com/https://ragnarok.nysaclan.com/api/v1/wall/chat', {
                data: [
                    {
                        content: "Hello! How can I assist you today?",
                        role: "assistant",
                        type: "chat"
                    },
                    {
                        content: inputMessage,
                        role: "user",
                        type: "chat"
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const aiMessage: Message = { id: messages.length + 1, text: response.data.response, sender: 'ai', timestamp: new Date().toLocaleTimeString() };
            setMessages(prevMessages => [...prevMessages, aiMessage]);
            setIsTyping(false);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error sending message:", error);
            setError("There was an issue sending your message. Please try again later.");
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default behavior of a newline in the input
            sendMessage();
        }
    };

    return (
        <Flex h="calc(100vh - 120px)" flexDirection="row">
            {/* Sidebar - only visible on large screens */}
            {showSidebar && (
                <VStack w="250px" p={4} borderRight="1px solid" borderColor="gray.200" h="full">
                    <Box mb={8}>
                        <Text fontWeight="bold" fontSize="xl">CyberWall</Text>
                    </Box>
                    <Button leftIcon={<FaPlus />} w="full" mb="auto">
                        New Chat
                    </Button>
                    <Flex alignItems="center">
                        <Avatar icon={<FaUser />} size="sm" mr={2} />
                        <Text>Guest User</Text>
                    </Flex>
                </VStack>
            )}

            {/* Chat Area */}
            <Flex flex={1} flexDirection="column" h="full">
                <VStack flex={1} p={4} overflowY="auto" spacing={4} align="stretch">
                    {messages.map((message) => (
                        <Flex
                            key={message.id}
                            direction="column"
                            alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                            align={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                        >
                            <Text fontSize="sm" color="gray.500">
                                {message.timestamp} - {message.sender === 'user' ? 'You' : 'Cyberwall'}
                            </Text>
                            <Box
                                bg={message.sender === 'user' ? 'blue.400' : 'gray.200'}
                                color={message.sender === 'user' ? 'white' : 'black'}
                                borderRadius="lg"
                                p={2}
                                maxW="70%"
                            >
                                <Text>{message.text}</Text>
                            </Box>
                        </Flex>
                    ))}
                    {isTyping && (
                        <Text color="gray.500" fontStyle="italic" alignSelf="center">Cyberwall is typing...</Text>
                    )}
                </VStack>
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <Flex p={4} borderTop="1px solid" borderColor="gray.200">
                    <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        mr={2}
                        onKeyDown={handleKeyDown}
                    />
                    <Button onClick={sendMessage}>Send</Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatInterface;
