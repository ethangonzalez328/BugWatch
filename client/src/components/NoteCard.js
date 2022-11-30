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
			if (note.priority == 3) {
				return green[500]
			}
			if (note.priority == 2) {
				return yellow[700]
			}
			if (note.priority == 1) {
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
							{" "}
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
						{note.info}
					</Typography>
					{/* Note timestamp */}
					<Typography variant="body2" color="textSecondary">
						{format(new Date(note.timestamp * 1000), 'Y-MM-dd pp')}
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}