import { Flex, Box, Heading, Button, Text, Image } from '@chakra-ui/react';

export default function Header(): JSX.Element {
    return (
        <Flex as="header" justify="space-between" align="center" padding={4} bg="blue.500" color="white">
            <Flex align="center">
                <Image src="/path-to-logo.png" alt="CyberWall Logo" boxSize="40px" marginRight={2} />
                <Heading as="h1" size="lg">CyberWall</Heading>
            </Flex>
            <Flex>
                <Button variant="ghost" marginRight={2}>How to use?</Button>
                <Button variant="ghost">Impact of Cyberwall</Button>
            </Flex>
            <Box textAlign="right">
                <Text>To report issues</Text>
                <Text fontWeight="bold">Call 1930</Text>
            </Box>
        </Flex>
    );
}
