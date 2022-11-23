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
	const [password2, setPassword2] = useState('')
	const [usernameError, setUsernameError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const [errorTxt, setErrorTxt] = useState('')

	// Gets user data from JSON server
	const [users, setUsers] = useState([])
	useEffect(() => {
		fetch('http://localhost:3000/users')  
			.then(res => res.json())
			.then(data => setUsers(data))
	}, [])

	// Handles events after register button is pressed
	const handleSubmit = (e) => {
		// Prevents default submission behavior, resets form after an error
		e.preventDefault()
		e.target.reset()

		// Initialize error states
		setUsernameError(false)
		setPasswordError(false)
		let duplicateUsers = false

		// If password fields are not the same, return an error
		if (password != password2) {
			setPasswordError(true)
			setErrorTxt('Password fields do not match')
		// Otherwise, attempt to add a user
		} else {
			let user = null
			// Check through all users
			for (let id in users) {
				user = users[id];
				// If a user already exists, return an error
				if (user.username == username) {
					duplicateUsers = true
					setUsernameError(true)
					setErrorTxt('User ' + username + ' already exists')
				}
			}
			// If the user does not exist, create it
			if (!duplicateUsers) {
				setLoginState(true)
				setUserid(user.id)
				// Add to user db
				fetch('http://localhost:3000/users', {
					method: 'POST',
					headers: {"Content-type": "application/json"},
					body: JSON.stringify({username, password})
				}).then(() => history.push('/app'))
			}
		}
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
				Register
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
					error={usernameError}
				/>
				{/* Password field */}
				<TextField
					onChange={(e) => setPassword(e.target.value)}
					className={classes.field}
					label="Password"
					type="password"
					variant="outlined"
					required
					error={passwordError}
				/>
				{/* Password verification field */}
				<TextField
					onChange={(e) => setPassword2(e.target.value)}
					className={classes.field}
					label="Verify Password"
					type="password"
					variant="outlined"
					required
					error={passwordError}
				/>

				{/* Register button */}
				<Button
					type="submit"
					color="primary"
					variant="contained"
					startIcon={<HowToRegOutlinedIcon />}
				>
					Register
				</Button>
			</form>
			<br />
			<Typography>
				<Link to="/">Log into an account</Link>
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
