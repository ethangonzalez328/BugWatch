import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { useState } from 'react'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout'

const theme = createTheme({
	height: '100vh',
	palette: {
		primary: grey,
		secondary: grey
	},
	typography: {
		fontFamily: 'Nunito',
		fontWeightLight: '400',
		fontWeightRegular: '500',
		fontWeightMedium: '600',
		fontWeightBold: '700',
	},
})

function App() {
	const [loginState, setLoginState] = useState(false)
	const [userid, setUserid] = useState(null)

	if (!loginState) {
		return (
			<ThemeProvider theme={theme}>
				<Router>
					{/* Login and register menus */}
					<Switch>
						<Route exact path="/">
							<Login setLoginState={setLoginState} setUserid={setUserid}/>
						</Route>
						<Route path="/register">
							<Register setLoginState={setLoginState} setUserid={setUserid}/>
						</Route>
					</Switch>
				</Router>
			</ThemeProvider>
		)
	} else {
		return (
			<ThemeProvider theme={theme}>
				<Router>
					{/* Application menu */}
					<Layout>
						<Switch>
							{/* Bugs menu */}
							<Route path="/app">
								<Notes uid={userid}/>
							</Route>
							{/* Create bug menu */}
							<Route path="/create">
								<Create uid={userid}/>
							</Route>
						</Switch>
					</Layout>
				</Router>
			</ThemeProvider>
		)
	}
}

export default App;
