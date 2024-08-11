import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoadingState from '../components/SearchPage/loadingStateComponent'
import {
    ActionsList,
    BoxWithShareCTA,
    ReasonsList,
} from '../components/SearchPage/dangerMeter'
import {
    Box,
    Flex,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Link,
    VStack,
} from '@chakra-ui/react'
import { PiMagicWand, PiArrowRightBold } from 'react-icons/pi'
import { Logo } from '../components/Logo'
import { DangerMeter } from '../components/SearchPage/dangerMeter'
import ErrorWidget from '../components/ErrorWidget'
import SearchBar from '../components/HomePage/searchBar'

export function Search(): JSX.Element {
    const location = useLocation()
    const { query = '', attachment = null } = location.state || {}
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(false)
    const [responseData, setResponseData] = useState<any>(null)
    const [detailedResponse, setDetailedResponse] = useState<any>(null)
    const [searchQueryType, setType] = useState<string>()
    const [searchQuery, setSearchQuery] = useState<string>(query)

    useEffect(() => {
        if (attachment) {
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

            setResponseData(response.data)
            setIsTyping(false)
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
                    case 'APK':
                        // APK handling is already managed in the attachment case
                        setType('APK')
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
        } catch (error) {
            console.error('Error analyzing APK:', error)
            setError(
                'There was an issue analyzing the APK. Please try again later.',
            )
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault() // Prevent default enter behavior
            handleSubmit(e as unknown as FormEvent<HTMLFormElement>) // Call submit handler
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (query.trim()) {
            window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`
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
            <HStack justify="space-between" mb={5}>
                <Link
                    onClick={() => {
                        window.location.href = `/`
                    }}
                >
                    <Box width={{ base: '150px', md: '200px' }}>
                        <Logo />
                    </Box>
                </Link>
                <Box flex={1} ml={5}>
                    <SearchBar
                        onSubmit={(type, data) => {
                            if (type == 'ATTACHMENT') {
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

            <Flex direction={{ base: 'column', md: 'row' }} gap={5} mt={10}>
                <Box flex={1} mb={{ base: 5, md: 0 }}>
                    <VStack gap={5}>
                        <DangerMeter
                            isLoading={isTyping}
                            data={detailedResponse}
                            type={searchQueryType}
                        />
                        <BoxWithShareCTA />
                    </VStack>
                </Box>
                <Box flex={1}>
                    <VStack gap={5}>
                        <ReasonsList
                            isLoading={isTyping}
                            report={detailedResponse?.report}
                        />
                        <ActionsList
                            isLoading={isTyping}
                            prevent={detailedResponse?.prevent}
                        />
                    </VStack>
                </Box>
            </Flex>
        </Box>
    )
}
