import { Text, Box, Heading, HStack, VStack } from "@chakra-ui/react"
import { FaFacebook, FaWhatsapp } from "react-icons/fa"
import { FiShare2, FiInfo, FiPhoneCall } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export const BoxWithShareCTA = () => {
    const navigate = useNavigate()

    const handleShare = (platform) => {
        if (navigator.share) {
            navigator.share({
                title: 'Check this out!',
                text: 'This information might be useful for you.',
                url: window.location.href,
            }).catch(console.error)
        } else {
            window.open(
                platform === 'whatsapp'
                    ? `https://wa.me/?text=${encodeURIComponent(window.location.href)}`
                    : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
            )
        }
    }

    return (
        <VStack flex={'2'} gap={'5'}>
            <Item
                title={'Correct this info'}
                description={
                    'This calculation seems wrong? Let us know & be listed in the Hall of fame.'
                }
                icon={<FiInfo color="white" size={24} />}
                bgColor={'red'}
                onClick={() => navigate('/leaderboard')}
            />
            <Item
                title={'File a case'}
                description={
                    'Are you a victim of a scam? Register a case with Kerala Police immediately.'
                }
                icon={<FiPhoneCall color="white" size={24} />}
                bgColor={'black'}
                onClick={() => window.location.href = 'tel:1903'}
            />
            <Item
                title={'Share this in Whatsapp.'}
                description={
                    'Help your friends by sharing this information among your friends & family groups.'
                }
                icon={<FaWhatsapp color="white" size={24} />}
                bgColor={'green'}
                onClick={() => handleShare('whatsapp')}
            />
            <Item
                title={'Share this in Facebook.'}
                description={
                    'Help public by adding sharing it in your Facebook wall.'
                }
                icon={<FaFacebook color="white" size={24} />}
                bgColor={'blue'}
                onClick={() => handleShare('facebook')}
            />
        </VStack>
    )
}

function Item({ title, description, icon, bgColor, onClick }): JSX.Element {
    return (
        <Box
            width={'100%'}
            bgColor={'white'}
            p={5}
            borderRadius={'10'}
            shadow={'md'}
            onClick={onClick}
            cursor={'pointer'}
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
