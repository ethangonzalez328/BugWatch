import React, { useState } from 'react'
import { Typography, Button, Container, makeStyles, TextField } from '@material-ui/core'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core'
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
	field: {
		marginTop: 10,
		marginBottom: 10,
		display: "block"
	}
})

export default function Create({loginState}) {
	const history = useHistory()
	if (!loginState) {
		history.push("/")
	}

	const classes = useStyles()
	// Text and error data
	const [title, setTitle] = useState('')
	const [info, setInfo] = useState('')
	const [titleError, setTitleError] = useState(false)
	const [infoError, setInfoError] = useState(false)
	const [priority, setPriority] = useState("!")

	// Handles events after submit button is pressed
	const handleSubmit = (e) => {
		// Prevents default submission behavior
		e.preventDefault()

		// Initialize error states
		setTitleError(false)
		setInfoError(false)

		// If title or detail fields are empty, return the respective error
		if (title == '') {
			setTitleError(true)
		}
		if (info == '') {
			setInfoError(true)
		}
		// If title and detail fields are non-empty, save these values
		if (title && info) {
			fetch('/api/issue/create', {
				method: 'POST',
				headers: {"Content-type": "application/json"},
				body: JSON.stringify({title, info})
			}).then(() => history.goBack())
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
				Create New Bug
			</Typography>

			{/* Text fields */}
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				{/* Title field */}
				<TextField
					onChange={(e) => setTitle(e.target.value)}
					className={classes.field}
					label="Bug Title"
					variant="outlined"
					fullWidth
					required
					error={titleError}
				/>
				{/* Details field */}
				<TextField
					onChange={(e) => setInfo(e.target.value)}
					className={classes.field}
					label="Details"
					variant="outlined"
					multiline
					minRows={4}
					fullWidth
					required
					error={infoError}
				/>

				{/* Priority selection */}
				<FormControl className={classes.field}>
					<FormLabel>Priority</FormLabel>
					<RadioGroup value={priority} onChange={(e) => setPriority(e.target.value)}>
						<FormControlLabel value={3} control={<Radio />} label="Low"/>
						<FormControlLabel value={2} control={<Radio />} label="Medium"/>
						<FormControlLabel value={1} control={<Radio />} label="High"/>
					</RadioGroup>
				</FormControl>

				{/* Submit button */}
				<Button
					type="submit"
					color="primary"
					variant="contained"
					startIcon={<BugReportOutlinedIcon />}
				>
					Submit
				</Button>
			</form>
		</Container>
	)
}
