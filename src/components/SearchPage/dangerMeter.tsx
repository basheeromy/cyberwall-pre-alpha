import { useState, useEffect } from 'react'
import { Box, VStack, HStack, Text, Heading, Flex } from '@chakra-ui/react'
import GaugeChart from 'react-gauge-chart'
import { Shimmer } from 'react-shimmer'
import { FiCheck, FiInfo, FiPhone, FiPhoneCall, FiScissors, FiShare2 } from 'react-icons/fi'

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
                    maxWidth={'75%'}
                    minWidth={'50%'}

                >
                    <GaugeChart
                        id="gauge-chart"
                        nrOfLevels={3}
                        colors={['#4CAF50', '#FFC107', '#FF5722']}
                        arcWidth={0.3}
                        percent={Math.round(data?.score ?? 0) / 100}
                        textColor="#000000"
                        marginInPercent={0.02}
                        hideText={true}
                        arcsLength={[0.2, 0.44, 0.36]}
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
    if (score < 20) return { message: 'Safe', color: 'green.500' }
    else if (score < 64)
        return { message: 'Not recommended', color: 'yellow.500' }

    return { message: 'Dangerous', color: 'red.500' }
}

