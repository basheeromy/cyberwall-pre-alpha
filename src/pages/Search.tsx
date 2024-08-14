import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
    BoxWithShareCTA,
} from '../components/SearchPage/dangerMeter'
import {
    Box,
    Flex,
    HStack,
    Link,
    VStack,
} from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import { DangerMeter } from '../components/SearchPage/dangerMeter'
import ErrorWidget from '../components/ErrorWidget'
import SearchBar from '../components/HomePage/searchBar'
import { ReasonsList } from '../components/SearchPage/ReasonsList'
import { ActionsList } from '../components/SearchPage/ActionsList'

export function Search(): JSX.Element {
    const location = useLocation()
    const { query = '', attachment = null } = location.state || {}
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(true)
    const [detailedResponse, setDetailedResponse] = useState<any>(null)
    const [searchQueryType, setType] = useState<string>()

    useEffect(() => {
        if (attachment) {
            setType('APK')
            analyzeApk(attachment).catch((err) => {
                console.error('Error analyzing APK:', err)
                setError(
                    'Failed to analyze the attached file. Please try again.',
                )
            })
        } else if (query) {
            fetchInitialResponse(query)
        }
    }, [])

    const fetchInitialResponse = async (query: string) => {
        setIsTyping(true)
        try {
            const response = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/chat',
                {
                    data: [
                        {
                            content: query,
                        },
                    ],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )

            setError(null) // Clear any previous errors

            if (response.data.response) {
                switch (response.data.response.mode) {
                    case 'URL':
                        await analyzeUrl(response.data.response.argument.url)
                        setType('Url')
                        break
                    case 'SMS':
                        await analyzeSms(
                            response.data.response.argument.sms_content,
                            response.data.response.argument.sms_header,
                        )
                        setType('SMS')
                        break

                    case 'FACEBOOK':
                        console.log(
                            'Facebook profile analysis is under development.',
                        )
                        setType('Facebook profile')
                        break
                    default:
                        setError('Unknown mode.')
                        break
                }
                setIsTyping(false)

            }
        } catch (error) {
            console.error('Error fetching initial response:', error)
            setError(
                'There was an issue fetching the initial response. Please try again later.',
            )
            setIsTyping(false)
        }
    }

    const analyzeUrl = async (url: string) => {
        try {
            const response = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/analyze/url',
                new URLSearchParams({ url }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            )
            setDetailedResponse(response.data)
        } catch (error) {
            console.error('Error analyzing URL:', error)
            setError(
                'There was an issue analyzing the URL. Please try again later.',
            )
        }
    }

    const analyzeSms = async (smsContent: string, smsHeader: string) => {
        try {
            const response = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/analyze/sms',
                {
                    sms_content: smsContent,
                    sms_header: smsHeader,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                },
            )
            setDetailedResponse(response.data)
        } catch (error) {
            console.error('Error analyzing SMS:', error)
            setError(
                'There was an issue analyzing the SMS. Please try again later.',
            )
        }
    }

    const analyzeApk = async (file: File) => {
        try {
            const formData = new FormData()
            formData.append('apk_file', file) // Append the APK file

            const apiResponse = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/analyze/apk',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            )
            setDetailedResponse(apiResponse.data)
            setIsTyping(false)
        } catch (error) {
            console.error('Error analyzing APK:', error)
            setError(
                'There was an issue analyzing the APK. Please try again later.',
            )
        }
    }

    if (query == '' && attachment == null)
        return (
            <Box p={20}>
                <ErrorWidget message={'Invalid page request.'} />
            </Box>
        )

    return (
        <Box
            margin="auto"
            p={4}
            as="main"
            bgColor={'#FAFAFA'}
            minHeight={'100vh'}
        >
            <HStack justify="space-between" mb={5} display={'flex'}>
                <Link
                    flex={'3'}
                    onClick={() => {
                        window.location.href = `/`
                    }}
                >
                    <Box width={{ base: '150px', md: '200px' }}>
                        <Logo />
                    </Box>
                </Link>
                <Box flex={2} ml={5}>
                    <SearchBar
                        onSubmit={(type, data) => {
                            if (type == 'ATTACHMENT') {
                                setType('APK');
                                analyzeApk(data as File).catch((err) => {
                                    console.error('Error analyzing APK:', err)
                                    setError(
                                        'Failed to analyze the attached file. Please try again.',
                                    )
                                })

                            } else if (data) {
                                fetchInitialResponse(data as string)
                            }
                        }}
                        initAttachment={attachment}
                        initQuery={query}
                    />
                </Box>
            </HStack>
            {error && (
                <ErrorWidget message="Failed to process search. Check your network. If issue persists, contact support" />
            )}
            <Flex as='main' gap={'5'} direction={'column'}>
                <HStack align={'start'} gap={'5'}>
                    <Box flex={'6'}>
                        <DangerMeter
                            isLoading={isTyping}
                            data={detailedResponse}
                            type={searchQueryType}
                        />
                    </Box>

                    <BoxWithShareCTA />

                </HStack>
                <HStack align={'start'} gap={'5'}>
                    <ReasonsList
                        isLoading={isTyping}
                        report={detailedResponse?.report}
                    />
                    <ActionsList
                        isLoading={isTyping}
                        prevent={detailedResponse?.prevent}
                    />
                </HStack>
            </Flex>



            {/* <Flex direction={{ base: 'column', md: 'row' }} gap={5} mt={10}>
                <Box flex={1}>
                    <VStack gap={5}>

                    </VStack>
                </Box>
            </Flex> */}
        </Box>
    )
}
