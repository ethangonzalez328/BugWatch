import React, { useEffect, useState } from 'react'
import { Typography, Button, Container, makeStyles, TextField } from '@material-ui/core'
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	field: {
		marginTop: 10,
		marginBottom: 10,
		display: "block"
	}
})

export default function Register({setLoginState, setUserid}) {
	const classes = useStyles()
	const history = useHistory()
	// Text and error data
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loginError, setLoginError] = useState(false)
	const [errorTxt, setErrorTxt] = useState('')

	// Gets user data from JSON server
	const [users, setUsers] = useState([])
	useEffect(() => {
		fetch('http://localhost:3000/login')  
			.then(res => res.json())
			.then(data => setUsers(data))
	}, [])

	// Handles events after register button is pressed
	const handleSubmit = (e) => {
		// Prevents default submission behavior, resets form after an error
		e.preventDefault()
		e.target.reset()

		// Initialize error state
		setLoginError(false)

		// Check through all users
		for (let id in users) {
			let user = users[id];
			// If username and password matches an entry, go to corresponding app
			if (user.username == username && user.password == password) {
				setLoginState(true)
				setUserid(user.id)
				history.push('app/')
			}
		}
		setLoginError(true)
		setErrorTxt('Incorrect username or password.')
	}

	return (
		<Container>
			{/* Page title */}
			<Typography
				variant="h6"
				component="h2"
				color="textPrimary"
				gutterBottom
			>
				Login
			</Typography>

			{/* Text fields */}
			<form autoComplete="off" onSubmit={handleSubmit}>
				{/* Username field */}
				<TextField
					onChange={(e) => setUsername(e.target.value)}
					className={classes.field}
					label="Username"
					variant="outlined"
					required
					error={loginError}
				/>
				{/* Password field */}
				<TextField
					onChange={(e) => setPassword(e.target.value)}
					className={classes.field}
					label="Password"
					type="password"
					variant="outlined"
					required
					error={loginError}
				/>
				{/* Register button */}
				<Button
					type="submit"
					color="primary"
					variant="contained"
					startIcon={<HowToRegOutlinedIcon />}
				>
					Log in
				</Button>
			</form>
			<br />
			<Typography>
				<Link to="/register">Create an account</Link>
			</Typography>
			<br />
			<Typography
				variant="body1"
				color="textSecondary"
				gutterBottom
			>
				{errorTxt}
			</Typography>
		</Container>
	)
}
