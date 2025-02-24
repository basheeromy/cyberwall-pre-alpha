import { Text, HStack, chakra, VStack, Heading, List, ListItem, ListIcon, Box } from "@chakra-ui/react"
import { FiInfo } from "react-icons/fi"
import { Shimmer } from "react-shimmer"
import redShield from '../../assets/logo-red.png'

export const ReasonsList = ({
    isLoading,
    report,
}: {
    isLoading: boolean
    report: string[]
}) => (
    <Box
        width={'100%'}
        bgColor={'white'}
        p={5}
        borderRadius={'10'}
        shadow={'md'}
    >
        <HStack>
            <chakra.img src={redShield} />
            <VStack align={'start'} gap={0}>
                <Heading size="md" color="red.500">
                    Why?
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    Few reasons why we think this is dangerous
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
                report?.map((item) => {
                    return (
                        <ListItem key={item}>
                            <HStack>
                                <ListIcon as={FiInfo} color="red.500" />
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
