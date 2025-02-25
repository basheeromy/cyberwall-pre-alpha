import { Box, Text, HStack, chakra, VStack, Heading, List, ListItem, ListIcon } from "@chakra-ui/react"
import { FiInfo, FiCheck } from "react-icons/fi"
import { Shimmer } from "react-shimmer"
import greenShield from '../../assets/logo-green.png'



export const ActionsList = ({
    isLoading,
    lang,
    prevent,
}: {
    isLoading: boolean
    lang:string;
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
                    Why
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    {lang === 'മലയാളം പതിപ്പ് ' &&
                        <>ഇത് വിശ്വസനീയമാണെന്ന് ഞങ്ങൾ കരുതുന്നതിൻ്റെ കുറച്ച് കാരണങ്ങൾ</>

                    } {lang === 'English Version' &&
                        <>Few reasons why we think this is trustable</>
                    }


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
                <>NA</>
            {/* {!isLoading && lang === 'English Version' &&
                prevent?.en?.report?.map((item) => {
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
                {!isLoading && lang === 'മലയാളം പതിപ്പ് ' &&
                prevent?.ml?.report?.map((item) => {
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
                })} */}
        </List>
    </Box>
)