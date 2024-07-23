
import React from 'react';
import { Box, Heading, SimpleGrid, Image, Text } from '@chakra-ui/react';

interface Incident {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

const RecentIncidents: React.FC = () => {
    const incidents: Incident[] = [
        // Add incident data here
    ];

    return (
        <Box marginY={8}>
            <Heading as="h2" size="xl" marginBottom={4}>Recent incidents</Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={8}>
                {incidents.map((incident) => (
                    <Box key={incident.id} borderWidth={1} borderRadius="lg" overflow="hidden">
                        <Image src={incident.imageUrl} alt={incident.title} />
                        <Box p={4}>
                            <Heading as="h3" size="md" marginBottom={2}>{incident.title}</Heading>
                            <Text>{incident.description}</Text>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default RecentIncidents;