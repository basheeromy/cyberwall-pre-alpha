
import { Box, Flex, Text, Icon, VStack } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorWidget = ({ message, message2 }: { message: string, message2?: string }) => {
    return (
        <Box
            width="100%"
            bg="red.100"
            p={4}
            borderRadius="md"
            shadow="md"
            border="1px"
            borderColor="red.300"
            mb={'5'}
        >
            <Flex alignItems="center">
                <Icon as={FiAlertTriangle} color="red.500" w={6} h={6} mr={2} />
                <VStack verticalAlign={'start'} alignItems={'start'} justifyItems={'start'}>
                    <Text color="red.700" fontWeight="bold" width={'100%'}>
                        {message}
                    </Text>
                    <Text color={'black'}>
                        {message2 ?? ''}
                    </Text>
                </VStack>


            </Flex>
        </Box>
    );
};

export default ErrorWidget;
