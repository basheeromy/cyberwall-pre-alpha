import { ColorModeScript } from '@chakra-ui/react'
import * as React from 'react'
import { Root, createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Router } from '@remix-run/router'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'

import { Layout } from './Layout'
import { RouterError } from './pages/RouterError'
import { ZustandExample } from './pages/ZustandExample'
import { NotFound } from './pages/NotFound'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { Search } from './pages/Search'
import Leaderboard from './components/LeaderBoard/LeaderBoard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router: Router = createBrowserRouter([
	{
		path: '/',
		//element: <Layout />,
		errorElement: <RouterError />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'zustand-example',
				element: <ZustandExample />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
			{
				path: 'chat',
				element: <Chat />,
			},
			{
				path: 'search',
				element: <Search />,
			},
			{
				path: 'leaderboard',
				element: <Leaderboard />,
			},
		],
	},
])

const container = document.getElementById('root') as HTMLElement
if (!container) throw new Error('Failed to find the root element')
const root: Root = createRoot(container)

root.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<ColorModeScript />
			<RouterProvider router={router} />
			<ToastContainer />
		</ChakraProvider>
	</React.StrictMode>,
)
