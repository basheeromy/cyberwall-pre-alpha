import { useState, useEffect } from 'react'
import { Box, VStack, HStack, Text, Heading, Flex } from '@chakra-ui/react'
import GaugeChart from 'react-gauge-chart'
import { Shimmer } from 'react-shimmer'

export const DangerMeter = ({
    isLoading,
    data,
    type,
}: {
    isLoading: boolean
    data?: any
    type: string
}) => {
    console.log('data ', data?.response?.score);
    return (
        <Flex
            width={'100%'}
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
                        colors={['#FF5722', '#FFC107', '#4CAF50']}
                        arcWidth={0.3}
                        percent={Math.round((data?.score ?? 100) / 100)}
                        textColor="#000000"
                        marginInPercent={0.02}
                        hideText={true}
                        arcsLength={[0.36, 0.44, 0.2]}
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width={'100%'}
                    >
                        <Text color="#FF5722" fontWeight="bold">
                            Dangerous
                        </Text>
                        <Text color="#4CAF50" fontWeight="bold">
                            Safe
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
                    There's {Math.round((type == 'Url' || type == 'SMS') ? data.response.score : data?.score ?? 0)}% chance this is a
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
