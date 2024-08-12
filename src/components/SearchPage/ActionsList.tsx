import { Box, Text, HStack, chakra, VStack, Heading, List, ListItem, ListIcon } from "@chakra-ui/react"
import { FiInfo, FiCheck } from "react-icons/fi"
import { Shimmer } from "react-shimmer"
import greenShield from '../../assets/logo-green.png'



export const ActionsList = ({
    isLoading,
    prevent,
}: {
    isLoading: boolean
    prevent: any
}) => (
    <Box
        width={'100%'}
        bgColor={'white'}
        p={5}
        borderRadius={'10'}
        shadow={'md'}
    >
        <HStack>
            <chakra.img src={greenShield} />
            <VStack align={'start'} gap={0}>
                <Heading size="md" color="green.500">
                    What to do next?
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    Suggestions on what you can do next to mitigate this
                </Text>
            </VStack>
        </HStack>

        <List spacing={3} mt={5} ml={4}>
            {isLoading &&
                [1, 2, 3, 4, 5, 6]?.map((item) => {
                    return (
                        <ListItem key={item}>
                            <HStack>
                                <ListIcon as={FiInfo} color="red.500" />
                                <Shimmer height={30} width={250} />
                            </HStack>
                        </ListItem>
                    )
                })}
            {!isLoading &&
                prevent?.map((item) => {
                    return (
                        <ListItem key={item}>
                            <HStack>
                                <ListIcon as={FiCheck} color="green.500" />

                                {isLoading ? (
                                    <Shimmer height={30} width={250} />
                                ) : (
                                    <Text fontSize={18}>{item}</Text>
                                )}
                            </HStack>
                        </ListItem>
                    )
                })}
        </List>
    </Box>
)