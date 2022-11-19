import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import Notes from './pages/Notes'
import Create from './pages/Create'
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
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/">
							<Notes />
						</Route>
						<Route path="/create">
							<Create />
						</Route>
					</Switch>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
