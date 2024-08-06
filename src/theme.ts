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
		heading: `'Red Hat Display', sans-serif`,
		body: `'Red Hat Display', sans-serif`,
	},
	styles: {
		global: {
			'html, body': {
				fontFamily: `'Red Hat Display', sans-serif`,
				fontSize: 'lg', // Apply the default body text size globally
			},
			a: {
				fontSize: 'lg', // Set the default font size for links
				fontFamily: `'Red Hat Display', sans-serif`,
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
				fontFamily: `'Red Hat Display', sans-serif`,
			},
		},
		Input: {
			baseStyle: {
				fontFamily: `'Red Hat Display', sans-serif`,
			},
		},
	},
})

export default theme
