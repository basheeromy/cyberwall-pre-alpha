import { useState, useEffect } from 'react'
import { Box, VStack, HStack, Text, Heading, Flex } from '@chakra-ui/react'
import GaugeChart from 'react-gauge-chart'
import { Shimmer } from 'react-shimmer'

export const DangerMeter = ({
    isLoading,
    data,
    lang,
}: {
    isLoading: boolean
    data?: any
    lang: string
}) => {
    console.log('data ', data);
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
                        percent={Math.min((data?.final_score ?? 100) / 100)}
                        textColor="#000000"
                        marginInPercent={0.02}
                        hideText={true}
                        arcsLength={[0.35, 0.35, 0.3]}
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
                <Heading size="md" mt={4}>
                    {/* {lang === 'English Version' && <>Trust score is {data?.final_score} and it is considered as</>} */}
                    {lang === 'English Version' && <>NA</>}
                    {/* {lang === 'മലയാളം പതിപ്പ് ' && <Text fontFamily="Noto Sans Malayalam">ട്രസ്റ്റ് സ്കോർ  {data?.final_score}  ആണ്, അത്  കണക്കാക്കുന്നു</Text>} */}
                    {lang === 'മലയാളം പതിപ്പ് ' && <Text fontFamily="Noto Sans Malayalam">NA</Text>}

                </Heading>
            )}
            {isLoading ? (
                <Box height={5} />
            ) : (
                <Heading
                    size="xl"
                    color={getResultString(data?.final_score)?.color}
                    alignItems={'center'}
                >
                    {getResultString(data?.final_score)?.message}
                </Heading>
            )}
            {isLoading ? (
                <Shimmer height={40} width={200} />
            ) : (
                <Text mt={2} textAlign={'center'}>
                    {/* {lang === 'മലയാളം പതിപ്പ് ' &&  <Text fontFamily="Noto Sans Malayalam">{data.score_content.ml}</Text>} */}
                    {lang === 'മലയാളം പതിപ്പ് ' && <Text fontFamily="Noto Sans Malayalam">ബാക്കെൻഡ് ബന്ധിപ്പിച്ചിട്ടില്ല. സാങ്കേതിക ടീമിനെ ബന്ധപ്പെടുക</Text>}
                    {lang === 'English Version' && data.score_content.en}
                </Text>
            )}
        </Flex>
    )
}

function getResultString(score: number): { message: string; color: string } {
    if (score == undefined || score == null)
        return { message: '', color: 'black' }
    if (score >= 70) return { message: 'Safe', color: 'green.500' }

    else if (score < 70 && score >= 35){
        return {
            message: 'Not Safe',
            color: '#FFC107'
        }
    }
    return { message: 'Dangerous', color: 'red.500' }
}
