// src/theme.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// Add your color mode config
const config: ThemeConfig = {
	initialColorMode: 'system',
	useSystemColorMode: true,
}

// Extend the theme to include custom fonts and color mode config
const theme = extendTheme({
	config,
	colors: {
		primary: {
			500: '#1019FF', // Define custom color
		},
		// Optionally define more colors here
	},
	fonts: {
		heading: `'Anek Malayalam', sans-serif`,
		body: `'Anek Malayalam', sans-serif`,
	},
	styles: {
		global: {
			'html, body': {
				fontFamily: `'Anek Malayalam', sans-serif`,
				fontSize: 'lg', // Apply the default body text size globally
			},
			a: {
				fontSize: 'lg', // Set the default font size for links
				fontFamily: `'Anek Malayalam', sans-serif`,
			},
		},
	},
	components: {
		Link: {
			baseStyle: {
				fontSize: 'md', // Set the default font size for links
			},
		},
		Button: {
			baseStyle: {
				fontFamily: `'Anek Malayalam', sans-serif`,
			},
		},
		Input: {
			baseStyle: {
				fontFamily: `'Anek Malayalam', sans-serif`,
			},
		},
	},
	shadows: {
		md: '0 0 20px 20px rgba(0, 0, 0, 0.01)', // Custom shadow
	},
})

export default theme
