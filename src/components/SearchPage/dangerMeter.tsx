import { useState, useEffect } from 'react'
import { Box, VStack, HStack, Text, Heading, Flex } from '@chakra-ui/react'
import GaugeChart from 'react-gauge-chart'
import { Shimmer } from 'react-shimmer'
import { FiCheck, FiInfo, FiScissors, FiShare2 } from 'react-icons/fi'

export const DangerMeter = ({
    isLoading,
    data,
    type,
}: {
    isLoading: boolean
    data?: any
    type: string
}) => {
    return (
        <Flex
            width={'100%'}
            height={'70vh'}
            bgColor={'white'}
            p={5}
            borderRadius={'10'}
            shadow={'md'}
            alignItems={'center'}
            direction={'column'}
            justifyContent={'center'}
        >
            {isLoading ? (
                <Shimmer height={250} width={500} />
            ) : (
                <Flex
                    textAlign="center"
                    alignItems={'center'}
                    direction={'column'}
                    p={10}
                    paddingBottom={0}
                    height={'100%'}
                    width={'75%'}
                >
                    <GaugeChart
                        id="gauge-chart"
                        nrOfLevels={3}
                        colors={['#4CAF50', '#FFC107', '#FF5722']}
                        arcWidth={0.3}
                        percent={Math.round(data?.score ?? 0) / 100}
                        textColor="#000000"
                        marginInPercent={0}
                        hideText={true}
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width={'100%'}
                    >
                        <Text color="#4CAF50" fontWeight="bold">
                            Safe
                        </Text>
                        <Text color="#FF5722" fontWeight="bold">
                            Dangerous
                        </Text>
                    </Box>
                </Flex>
            )}
            {isLoading && <Box height={5} />}

            {isLoading ? (
                <Shimmer height={60} width={300} />
            ) : (
                <Heading size="lg" mt={4}>
                    This {type} is
                </Heading>
            )}
            {isLoading ? (
                <Box height={5} />
            ) : (
                <Heading
                    size="xl"
                    color={getResultString(data?.score)?.color}
                    alignItems={'center'}
                >
                    {getResultString(data?.score)?.message}
                </Heading>
            )}
            {isLoading ? (
                <Shimmer height={40} width={200} />
            ) : (
                <Text mt={2} textAlign={'center'}>
                    There's {Math.round(data?.score ?? 0)}% chance this is a
                    dangerous {type}
                </Text>
            )}
        </Flex>
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

export const BoxWithShareCTA = () => (
    <VStack flex={'1'} gap={'5'}>
        <Item
            title={'Share this information'}
            description={
                'Help your friends by sharing this information among your friends & family'
            }
            icon={<FiShare2 color="white" size={24} />}
            bgColor={'teal'}
        ></Item>
        <Item
            title={'Share this information'}
            description={
                'Help your friends by sharing this information among your friends & family'
            }
            icon={<FiCheck color="white" size={24} />}
            bgColor={'indigo'}
        ></Item>
        <Item
            title={'Share this information'}
            description={
                'Help your friends by sharing this information among your friends & family'
            }
            icon={<FiScissors color="white" size={24} />}
            bgColor={'orange'}
        ></Item>
    </VStack>
)

function Item({ title, description, icon, bgColor }): JSX.Element {
    return (
        <Box
            width={'100%'}
            bgColor={'white'}
            p={5}
            borderRadius={'10'}
            shadow={'md'}
        >
            <HStack gap={5}>
                <Box bgColor={bgColor} p={5} borderRadius={10}>
                    {icon}
                </Box>
                <VStack align={'start'} gap={0}>
                    <Heading size="sm">{title}</Heading>
                    <Text color="gray.500" fontSize={'14'}>
                        {description}
                    </Text>
                </VStack>
            </HStack>
        </Box>
    )
}
