import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Avatar,
    chakra
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import logo from '../../assets/hall-of-fame-logo.svg';

interface LeaderboardItem {
    rank: number;
    name: string;
    points: number;
    contributions: number;
    avatarUrl: string; // Avatar URL still present in case it's needed elsewhere
}

const Leaderboard: React.FC = () => {
    const leaderboardData: LeaderboardItem[] = [
        { rank: 1, name: 'Arjun Menon', points: 591, contributions: 30, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 2, name: 'Neha Nair', points: 571, contributions: 28, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 3, name: 'Akhil Radhakrishnan', points: 560, contributions: 25, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 4, name: 'Devika Pillai', points: 545, contributions: 23, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 5, name: 'Nikhil Varma', points: 530, contributions: 22, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 6, name: 'Anjali Suresh', points: 515, contributions: 21, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 7, name: 'Vishnu Mohan', points: 500, contributions: 20, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 8, name: 'Lakshmi Prasad', points: 485, contributions: 19, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 9, name: 'Karthik Jayaraj', points: 470, contributions: 18, avatarUrl: 'https://via.placeholder.com/150' },
        { rank: 10, name: 'Meera Unnikrishnan', points: 455, contributions: 17, avatarUrl: 'https://via.placeholder.com/150' },
    ];

    return (
        <Box p={8} bg="gray.50" minH="100vh">
            <Flex justifyContent="space-between" alignItems="center" mb={8}>
                <Heading size="lg" display="flex" alignItems="center">
                    <chakra.img src={logo} />
                </Heading>
                <Flex alignItems="center">
                    <Heading size="sm" mr={4}>
                        John Doe
                    </Heading>
                    <Avatar bg="purple.500" />
                </Flex>
            </Flex>

            <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Rank</Th>
                            <Th>Name</Th>
                            <Th>Points</Th>
                            <Th>Total Contributions</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {leaderboardData.map((user) => (
                            <Tr key={user.rank}>
                                <Td>{user.rank}</Td>
                                <Td>{user.name}</Td>
                                <Td>{user.points}</Td>
                                <Td>{user.contributions}</Td>
                                <Td>
                                    <Button
                                        colorScheme="purple"
                                        rightIcon={<FiArrowRight />}
                                        size="sm"
                                    >
                                        View Contributions
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default Leaderboard;
