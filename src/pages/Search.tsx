import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    Box,
    Text,
    Flex,
    HStack,
    Link,
    VStack,
    chakra,
    Heading,
} from '@chakra-ui/react'
import { Logo } from '../components/Logo'
import { DangerMeter } from '../components/SearchPage/dangerMeter'
import ErrorWidget from '../components/ErrorWidget'
import SearchBar from '../components/HomePage/searchBar'
import { ReasonsList } from '../components/SearchPage/ReasonsList'
import { ActionsList } from '../components/SearchPage/ActionsList'
import { BoxWithShareCTA } from '../components/SearchPage/BoxWithCTA'
import greenShield from '../assets/logo-green.png'
import { AlertCircle, ArrowRight, LucideAArrowDown } from 'lucide-react'
import { ArrowDown } from 'lucide-react'
import { PiTranslate } from 'react-icons/pi'
import { isString } from 'lodash'

const response = {
    reference: 'user_id/request_id',
    api_request_id: 83,
    final_score: 90,
    score_content: {
        en: 'This SMS header is  Trustable ',
        ml: 'ഈ SMS ഹെഡർ വിശ്വാസയോഗ്യമാണ്',
    },
    action: {
        en: {
            content: 'You can visit kerala police website to check this',
            url: 'https://keralapolice.gov.in',
            action: 'Visit Website',
        },
        ml: {
            content:
                'ഇത് പരിശോധിക്കാൻ കേരള പോലീസ് വെബ്സൈറ്റ് സന്ദർശിക്കാവുന്നതാണ്',
            url: 'https://keralapolice.gov.in',
            action: 'വെബ്സൈറ്റ് സന്ദർശിക്കുക',
        },
    },
    reports: {
        en: {
            report: [
                'keralapolice.gov.in is a trustworthy domain.',
                'keralapolice.gov.in is a trustworthy domain.',
            ],
        },
        ml: {
            report: [
                'keralapolice.gov.in എന്ന ഡൊമെയ്ൻ ഒരു വിശ്വസനീയ ഡൊമെയ്‌നാണ്.',
                'keralapolice.gov.in എന്ന ഡൊമെയ്ൻ ഒരു വിശ്വസനീയ ഡൊമെയ്‌നാണ്.',
            ],
        },
    },
} //@basheer -  This is current dummy structure of response API.

export function Search(): JSX.Element {
    const location = useLocation()
    const navigate = useNavigate()
    const { query = '', attachment = null } = location.state || {}
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(false) //change back to true
    const [detailedResponse, setDetailedResponse] = useState<any>(null)
    const [searchQueryType, setType] = useState<string>()

    useEffect(() => {
        if (query) {
            console.log('query', query)
        } else if (attachment) {
            console.log('attachment', attachment)
        }
    }, [query])

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

            <Flex as="main" gap={'5'} width={'100%'} direction={'column'}>
                <HStack gap={10} align={'center'}>
                    {['English Version', 'മലയാളം പതിപ്പ് '].map((v) => (
                        <VStack align="start" gap={5} width="100%">
                            <HStack alignSelf={'center'}>
                                <PiTranslate size={20} />
                                <VStack align="start" gap={0}>
                                    <Heading size="md">{v}</Heading>
                                </VStack>
                            </HStack>

                            {/* Reusing the existing DangerMeter component */}
                            <DangerMeter
                                isLoading={isTyping}
                                // data={detailedResponse}
                                data={response}
                                lang={v}
                            />

                            {/* Info box similar to the one in the image */}
                            <Box
                                width="100%"
                                borderWidth="1px"
                                borderColor="green.200"
                                borderRadius="lg"
                                p={4}
                                bg="green.50"
                            >
                                <Text color="gray.800">
                                    {v === 'English Version' && response?.action.en.content}
                                    {v === 'മലയാളം പതിപ്പ് ' && response?.action.ml.content}
                                </Text>

                                <Flex
                                    mt={2}
                                    color="blue.500"
                                    alignItems={'center'}
                                    alignContent={'center'}
                                    align="center"
                                    justifyContent={'center'}
                                >
                                    <Link>
                                        {v === 'English Version' && response.action.en.action}
                                        {v === 'മലയാളം പതിപ്പ് ' && response.action.ml.action}
                                    </Link>
                                    <ArrowRight size={18} />
                                </Flex>
                            </Box>

                            <HStack
                                spacing={2}
                                mt={4}
                                color="gray.500"
                                fontSize="sm"
                                align={'center'}
                                width={'100%'}
                                justifyContent={'center'}
                            >
                                <AlertCircle size={16} />
                                <Text>
                                    Cyberwall scores might not be accurate
                                    always, as it's works only with know scam
                                    data.
                                </Text>
                            </HStack>

                            {/* Reusing the existing ReasonsList component */}
                            <ActionsList
                                isLoading={isTyping}
                                lang={v}
                                prevent={response.reports}
                            />
                        </VStack>
                    ))}
                </HStack>
            </Flex>
        </Box>
    )
}
