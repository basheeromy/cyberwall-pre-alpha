
import { Box, Flex, Text, Icon, Button } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorWidget = ({ message }: { message: string }) => {
    return (
        <Box
            width="100%"
            bg="red.100"
            p={4}
            borderRadius="md"
            shadow="md"
            border="1px"
            borderColor="red.300"
        >
            <Flex alignItems="center">
                <Icon as={FiAlertTriangle} color="red.500" w={6} h={6} mr={2} />
                <Text color="red.700" fontWeight="bold">
                    {message}
                </Text>
            </Flex>
        </Box>
    );
};

export default ErrorWidget;
