import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Flex, HStack, Link, VStack } from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import { DangerMeter } from '../components/SearchPage/dangerMeter'
import ErrorWidget from '../components/ErrorWidget'
import SearchBar from '../components/HomePage/searchBar'
import { ReasonsList } from '../components/SearchPage/ReasonsList'
import { ActionsList } from '../components/SearchPage/ActionsList'
import { BoxWithShareCTA } from '../components/SearchPage/BoxWithCTA'

export function Search(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const { query = '', attachment = null } = location.state || {}
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(true)
    const [detailedResponse, setDetailedResponse] = useState<any>(null)
    const [searchQueryType, setType] = useState<string>()

    useEffect(() => {
        if (attachment) {
            if (attachment.type === 'application/vnd.android.package-archive') {
                setType('APK')
                analyzeApk(attachment).catch((err) => {
                    console.error('Error analyzing APK:', err)
                    setError('Failed to analyze the attached file. Please try again.')
                })
            } else if (attachment.type.startsWith('image/')) {
                setType('Image')
                analyzeImage(attachment).catch((err) => {
                    console.error('Error analyzing image:', err)
                    setError('Failed to analyze the attached image. Please try again.')
                })
            }
        } else if (query) {
            fetchInitialResponse(query)
        }
    }, [])

    const updateState = (newQuery: string, newAttachment: File | null) => {
        navigate('.', {
            replace: true,
            state: { query: newQuery, attachment: newAttachment },
        })
    }

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
                }
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
                            response.data.response.argument.sms_header
                        )
                        setType('SMS')
                        break
                    case 'FACEBOOK':
                        await analyzeFacebookProfile(
                            response.data.response.argument.url
                        )
                        setType('Facebook profile')
                        break
                    default:
                        setError('Unable to identify your search query!')
                        break
                }
                updateState(query, attachment)
                setIsTyping(false)
            }
        } catch (error) {
            console.error('Error fetching initial response:', error)
            setError(
                'There was an issue fetching the initial response. Please try again later.'
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
                }
            )
            setDetailedResponse(response.data)
        } catch (error) {
            console.error('Error analyzing URL:', error)
            setError('There was an issue analyzing the URL. Please try again later.')
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
                }
            )
            setDetailedResponse(response.data)
        } catch (error) {
            console.error('Error analyzing SMS:', error)
            setError('There was an issue analyzing the SMS. Please try again later.')
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
                }
            )
            setDetailedResponse(apiResponse.data)
            updateState(query, file)
            setIsTyping(false)
        } catch (error) {
            console.error('Error analyzing APK:', error)
            setError('There was an issue analyzing the APK. Please try again later.')
        }
    }

    const analyzeFacebookProfile = async (facebookUrl: string) => {
        try {
            const response = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/analyze/fb',
                {
                    facebook_url: facebookUrl,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (response.data.error) {
                setError(response.data.error)
                setDetailedResponse(null)
            } else {
                setDetailedResponse(response.data)
                setError(null)
            }
            setIsTyping(false)
        } catch (error) {
            console.error('Error analyzing Facebook profile:', error)
            setError('There was an issue analyzing the Facebook profile. Please try again later.')
            setIsTyping(false)
        }
    }

    const analyzeImage = async (file: File) => {
        try {
            const formData = new FormData()
            formData.append('image', file) // Append the image file

            const apiResponse = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/chat',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            )

            if (apiResponse.data.response) {
                switch (apiResponse.data.response.mode) {
                    case 'SMS':
                        await analyzeSms(
                            apiResponse.data.response.argument.sms_content,
                            apiResponse.data.response.argument.sms_header
                        )
                        setType('SMS')
                        break
                    default:
                        setError('Operation not supported for this image type.')
                        setDetailedResponse(null)
                        break
                }
                updateState(query, file)
                setIsTyping(false)
            }
        } catch (error) {
            console.error('Error analyzing image:', error)
            setError('There was an issue analyzing the image. Please try again later.')
        }
    }

    if (query === '' && attachment == null)
        return (
            <Box p={20}>
                <ErrorWidget
                    message={'Invalid page request.'}
                    message2={error}
                />
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
                            setError(null)
                            setDetailedResponse(null)
                            if (type === 'ATTACHMENT') {
                                if (data instanceof File) {
                                    if (data.type === 'application/vnd.android.package-archive') {
                                        setType('APK')
                                        analyzeApk(data).catch((err) => {
                                            console.error('Error analyzing APK:', err)
                                            setError('Failed to analyze the attached file. Please try again.')
                                        })
                                    } else if (data.type.startsWith('image/')) {
                                        setType('Image')
                                        analyzeImage(data).catch((err) => {
                                            console.error('Error analyzing image:', err)
                                            setError('Failed to analyze the attached image. Please try again.')
                                        })
                                    }
                                }
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
                <ErrorWidget
                    message="Failed to process search. "
                    message2={
                        error ??
                        'Check your network. If the issue persists, contact support'
                    }
                />
            )}

            <Flex as="main" gap={'5'} direction={'column'}>
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
        </Box>
    )
}