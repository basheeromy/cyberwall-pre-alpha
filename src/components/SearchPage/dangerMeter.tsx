import { useState, useEffect } from 'react'
import {
    Box,
    VStack,
    HStack,
    Text,
    Heading,
    List,
    ListItem,
    ListIcon,
    chakra,
} from '@chakra-ui/react'
import GaugeChart from 'react-gauge-chart'
import { Shimmer } from 'react-shimmer'
import { FiCheck, FiInfo, FiShare2 } from 'react-icons/fi'
import redShield from '../../assets/logo-red.png'
import greenShield from '../../assets/logo-green.png'

export const DangerMeter = ({
    isLoading,
    data,
    type,
}: {
    isLoading: boolean
    data?: any
    type: string
}) => {
    const [fakeValue, setFakeValue] = useState(10)

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setFakeValue((prev) => {
                    // Increment logic that increases value without decimals and never converges to 100
                    const increment = Math.max(
                        Math.round((100 - prev) * 0.1),
                        1,
                    )
                    const nextValue = prev + increment
                    return nextValue >= 100 ? 10 : nextValue
                })
            }, 300)

            return () => clearInterval(interval)
        }
    }, [isLoading])

    return (
        <Box
            width={'100%'}
            bgColor={'white'}
            p={5}
            borderRadius={'10'}
            shadow={'md'}
            alignContent={'center'}
        >
            <GaugeChart
                id="gauge-chart"
                nrOfLevels={3}
                colors={['#4CAF50', '#FFC107', '#FF5722']}
                arcWidth={0.3}
                percent={Math.round(isLoading ? fakeValue : (data?.score ?? 0)) / 100}
                textColor="#000000"
            />
            {isLoading ? (
                <Shimmer height={60} width={300} />
            ) : (
                <Heading size="lg" mt={4}>
                    This {type} header is
                </Heading>
            )}
            {isLoading && <Box height={5} />}
            {isLoading ? (
                <Shimmer height={40} width={200} />
            ) : (
                <Heading size="xl" color={getResultString(data?.score)?.color} alignItems={'center'}>
                    {getResultString(data?.score)?.message}
                </Heading>
            )}
        </Box>
    )
}

function getResultString(score: number): { message: string; color: string } {
    if (score == undefined || score == null)
        return { message: '', color: 'black' }
    if (score < 34) return { message: 'Safe', color: 'green.500' }
    else if (score < 64)
        return { message: 'Not recommended', color: 'yellow.500' }

    return { message: 'Dangerous', color: 'red.500' }
}

export const ReasonsList = ({ isLoading, report }: { isLoading: boolean, report: [] }) => (
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
            {isLoading && [1, 2, 3, 4, 5, 6]?.map((item) => {
                return (
                    <ListItem key={item}>
                        <HStack>
                            <ListIcon as={FiInfo} color="red.500" />
                            <Shimmer height={30} width={250} />

                        </HStack>
                    </ListItem>
                )
            })}
            {!isLoading && report?.map((item) => {
                return (
                    <ListItem key={item}>
                        <HStack>
                            <ListIcon as={FiInfo} color="red.500" />
                            {isLoading ? (
                                <Shimmer height={30} width={250} />
                            ) : (
                                <Text fontSize={18}>
                                    {item}
                                </Text>
                            )}
                        </HStack>
                    </ListItem>
                )
            })}
        </List>
    </Box>
)

export const ActionsList = ({ isLoading, prevent }: { isLoading: boolean, prevent: any }) => (
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
            {isLoading && [1, 2, 3, 4, 5, 6]?.map((item) => {
                return (
                    <ListItem key={item}>
                        <HStack>
                            <ListIcon as={FiInfo} color="red.500" />
                            <Shimmer height={30} width={250} />

                        </HStack>
                    </ListItem>
                )
            })}
            {!isLoading && prevent?.map((item) => {
                return (
                    <ListItem key={item}>
                        <HStack>
                            <ListIcon as={FiCheck} color="green.500" />

                            {isLoading ? (
                                <Shimmer height={30} width={250} />
                            ) : (
                                <Text fontSize={18}>
                                    {item}
                                </Text>
                            )}
                        </HStack>
                    </ListItem>
                )
            })}

        </List>
    </Box>
)

export const BoxWithShareCTA = () => (
    <Box
        width={'100%'}
        bgColor={'white'}
        p={5}
        borderRadius={'10'}
        shadow={'md'}
    >
        <HStack gap={5}>
            <Box bgColor={'orange'} p={5} borderRadius={10}>
                <FiShare2 color="white" size={48} />
            </Box>
            <VStack align={'start'} gap={0}>
                <Heading size="md">Share this information</Heading>
                <Text color="gray.500">
                    Help your friends by sharing this information among your
                    friends & family
                </Text>
            </VStack>
        </HStack>
    </Box>
)
