import axios from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import LoadingState from '../components/SearchPage/loadingStateComponent';
import {
    ActionsList,
    BoxWithShareCTA,
    ReasonsList,
} from '../components/SearchPage/dangerMeter';
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
} from '@chakra-ui/react';
import { PiMagicWand, PiArrowRightBold } from 'react-icons/pi';
import { Logo } from '../components/Logo';
import { DangerMeter } from '../components/SearchPage/dangerMeter';
import ErrorWidget from '../components/ErrorWidget';

export function Search(): JSX.Element {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('query') || '';
    const attachment = queryParams.get('attachment') || '';
    const [error, setError] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [responseData, setResponseData] = useState<any>(null);
    const [detailedResponse, setDetailedResponse] = useState<any>(null);
    const [searchQueryType, setType] = useState<string>();
    const [searchQuery, setSearchQuery] = useState<string>(query);

    useEffect(() => {
        if (attachment) {
            // Directly handle APK analysis if an attachment is present
            analyzeApk(attachment)
                .catch((err) => {
                    console.error('Error analyzing APK:', err);
                    setError('Failed to analyze the attached file. Please try again.');
                });
        } else if (query) {
            fetchInitialResponse(query);
        }
    }, [attachment, query]);

    const fetchInitialResponse = async (query: string) => {
        setIsTyping(true);
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
            );

            setResponseData(response.data);
            setIsTyping(false);
            setError(null); // Clear any previous errors

            // Based on mode, call the appropriate API
            if (response.data.response) {
                switch (response.data.response.mode) {
                    case 'URL':
                        await analyzeUrl(response.data.response.argument.url);
                        setType('Url');
                        break;
                    case 'SMS':
                        await analyzeSms(
                            response.data.response.argument.sms_content,
                            response.data.response.argument.sms_header
                        );
                        setType('SMS');
                        break;
                    case 'APK':
                        // APK handling is already managed in the attachment case
                        setType('APK');
                        break;
                    case 'FACEBOOK':
                        // Placeholder for Facebook profile analysis
                        console.log('Facebook profile analysis is under development.');
                        setType('Facebook profile');
                        break;
                    default:
                        setError('Unknown mode.');
                        break;
                }
            }
        } catch (error) {
            console.error('Error fetching initial response:', error);
            setError(
                'There was an issue fetching the initial response. Please try again later.'
            );
            setIsTyping(false);
        }
    };

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
            );
            setDetailedResponse(response.data);
        } catch (error) {
            console.error('Error analyzing URL:', error);
            setError(
                'There was an issue analyzing the URL. Please try again later.'
            );
        }
    };

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
            );
            setDetailedResponse(response.data);
        } catch (error) {
            console.error('Error analyzing SMS:', error);
            setError(
                'There was an issue analyzing the SMS. Please try again later.'
            );
        }
    };

    const analyzeApk = async (filePath: string) => {
        try {
            // Fetch the file directly from the provided file path
            const response = await fetch(filePath);
            const blob = await response.blob();
            const file = new File([blob], 'attached-file.apk', { type: blob.type });

            const formData = new FormData();
            formData.append('apk_file', file); // Append the APK file

            const apiResponse = await axios.post(
                'https://ragnarok.nysaclan.com/api/v1/wall/analyze/apk',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            setDetailedResponse(apiResponse.data);
        } catch (error) {
            console.error('Error analyzing APK:', error);
            setError(
                'There was an issue analyzing the APK. Please try again later.'
            );
        }
    };

    if (isTyping) {
        return <LoadingState />;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default enter behavior
            handleSubmit(e as unknown as FormEvent<HTMLFormElement>); // Call submit handler
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
        }
    };

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
                        window.location.href = `/`;
                    }}
                >
                    <Box width={{ base: '150px', md: '200px' }}>
                        <Logo />
                    </Box>
                </Link>
                <Box flex={1} ml={5}>
                    <InputGroup bgColor={'white'} shadow={'md'} size={'lg'}>
                        <InputLeftAddon bg={'none'} color={'blue'}>
                            <PiMagicWand size={24} />
                        </InputLeftAddon>
                        <Input
                            value={searchQuery}
                            onChange={(v) => setSearchQuery(v.target.value)}
                            placeholder="Search..."
                            borderLeft={'none'}
                            focusBorderColor="black"
                            borderRadius={'md'}
                            _focus={{
                                borderColor: 'black',
                                borderImage: 'none',
                                animation: 'none',
                            }}
                            onKeyDown={handleKeyDown}
                        />
                        <InputRightElement color={'blue'}>
                            <PiArrowRightBold size={24} />
                        </InputRightElement>
                    </InputGroup>
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
    );
}
