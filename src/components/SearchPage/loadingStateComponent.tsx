import { Box, HStack, Skeleton, VStack } from '@chakra-ui/react';


const LoadingState = () => (
    <Box maxWidth="800px" margin="auto" p={5}>
        <Skeleton height="40px" mb={5} />
        <HStack align="start" spacing={10}>
            <Skeleton height="200px" width="200px" />
            <VStack align="start" spacing={8} width="full">
                <Skeleton height="150px" width="full" />
                <Skeleton height="150px" width="full" />
            </VStack>
        </HStack>
        <Skeleton height="100px" mt={5} />
    </Box>
);

export default LoadingState;