import {
	chakra,
	keyframes,
	ImageProps,
	forwardRef,
	usePrefersReducedMotion,
} from '@chakra-ui/react'
import chakraLogo from '../assets/logo.svg'


export const Logo = forwardRef<ImageProps, 'img'>((props, ref) => {
	return (
		<chakra.img
			//animation={animation}
			alignItems={'center'}
			alignContent={'center'}
			src={chakraLogo}
			ref={ref}
			{...props}
		/>
	)
})
