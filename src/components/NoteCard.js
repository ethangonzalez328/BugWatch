import React from 'react'
import { Card, CardHeader, CardContent, IconButton, Typography, makeStyles, Avatar } from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import { green, grey, red, yellow } from '@material-ui/core/colors'
import { format, parseJSON } from 'date-fns'

const useStyles = makeStyles({
	// Conditional coloring depending on priority
	// low: green, medium: yellow, high: red
	avatar: {
		backgroundColor: (note) => {
			if (note.priority == '!') {
				return green[500]
			}
			if (note.priority == '!!') {
				return yellow[700]
			}
			if (note.priority == '!!!') {
				return red[500]
			}
			return grey[500]
		}
	}
})

export default function NoteCard({note, handleDelete}) {
	const classes = useStyles(note)

	// Specify note layout
	return (
		<div>
			<Card elevation={1}>
				<CardHeader
					// Priority label
					avatar={
						<Avatar className={classes.avatar}>
							{note.priority}
						</Avatar>
					}
					// Delete button
					action={
						<IconButton onClick={() => handleDelete(note.id)}>
							<DeleteOutlined />
						</IconButton>
					}
					// Note title
					title={note.title}
				/>
				<CardContent>
					{/* Note details */}
					<Typography variant="body2" color="textPrimary">
						{note.details}
					</Typography>
					{/* Note timestamp */}
					<Typography variant="body2" color="textSecondary">
						{format(parseJSON(note.timestamp), 'Y-MM-dd pp')}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}