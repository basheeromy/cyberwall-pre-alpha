import { FunctionComponent, ReactElement, useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
	Box,
	Flex,
	Text,
	Link,
	useColorMode,
	Icon,
	IconButton,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	Button,
} from '@chakra-ui/react';
import { FiGlobe, FiMenu } from 'react-icons/fi';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { useCounterStore } from '../stores/counterStore';
import React from 'react';

export const NavBar: FunctionComponent = (): ReactElement => {
	const count = useCounterStore((state) => state.count);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef<HTMLButtonElement>(null);

	return (
		<Flex width={'100%'} direction={'column'}>
			<Flex
				alignItems="center"
				justifyContent="center"
				bg="#f0f0f0"
				paddingY="10px"
			>
				<Text>
					Call{' '}
					<Box as="span" fontWeight="bold">
						1903
					</Box>{' '}
					to report crimes
				</Text>
			</Flex>
			<Flex
				alignItems={'center'}
				justifyContent={'space-between'}
				borderStyle={'solid'}
				shadow={'none'}
				px={10}
				py={5}
				fontSize={'sm'}
			>
				<Box display={{ base: 'block', md: 'none' }}>
					<IconButton
						icon={<FiMenu />}
						aria-label="Open Menu"
						ref={btnRef}
						onClick={onOpen}
					/>
				</Box>
				<Drawer
					isOpen={isOpen}
					placement="left"
					onClose={onClose}
					finalFocusRef={btnRef}
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Menu</DrawerHeader>
						<DrawerBody>
							<Flex direction={'column'}>
								<Link as={ReactRouterLink} to="/" mb={4} onClick={onClose} >
									How to use?
								</Link>
								<Link as={ReactRouterLink} to="/zustand-example" mb={4} onClick={onClose}>
									Impact of CyberWall
								</Link>
							</Flex>


						</DrawerBody>
					</DrawerContent>
				</Drawer>
				<Box display={{ base: 'none', md: 'block' }} color={'#808080'}>
					<Link as={ReactRouterLink} to="/" mr={10}>
						How to use?
					</Link>
					<Link as={ReactRouterLink} to="/zustand-example" mr={10}>
						Impact of CyberWall
					</Link>
				</Box>
				<Flex alignItems={'end'} justifyContent={'space-between'}>
					<Link>
						<Flex alignItems={'center'}>
							<Flex alignItems={'end'} direction={'column'}>
								<Text fontSize={14}>Change language</Text>
								<Text
									fontSize={24}
									color={'#000AFF'}
									fontWeight={'700'}
									decoration={'underline'}
									lineHeight={'.5'}
								>
									മലയാളം
								</Text>
							</Flex>
							<Box width={'5px'} />
							<FiGlobe size={36} />
						</Flex>
					</Link>
				</Flex>
			</Flex>
		</Flex>
	);
};
