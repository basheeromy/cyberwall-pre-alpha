import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { FiClipboard } from 'react-icons/fi';

export function PasteFromClipBoard(props: { onSuccessFullClipBoard: (data: string) => void }): JSX.Element {
    const toast = useToast(); // To show feedback messages

    const handlePaste = async () => {
        try {
            // Read text from the clipboard
            const text = await navigator.clipboard.readText();

            props.onSuccessFullClipBoard(text);
            // You can also handle the text here, e.g., updating a state or form field

        } catch (err) {
            // Handle errors (e.g., permission issues or clipboard not accessible)
            toast({
                title: 'Error',
                description: 'Failed to read from clipboard.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Button
            size="lg"
            colorScheme="none"
            color="black"
            variant="solid"
            rightIcon={<FiClipboard />}
            textDecoration="underline"
            fontWeight="normal"
            onClick={handlePaste} // Attach click handler
        >
            Or Paste from clipboard
        </Button>
    );
}


