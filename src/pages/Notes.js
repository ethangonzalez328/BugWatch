import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'

export default function Notes({uid}) {
	const notesDB = 'http://localhost:3001/notes'
	const [notes, setNotes] = useState([])

	// Get notes from local JSON server
	// IMPORTANT:
	//// make sure to use the same port as specified in the JSON server
	//// make sure the port number is not the same as the one used to run the application
	useEffect(() => {
		fetch(notesDB)
			.then(res => res.json())
			//.then(data => setNotes(data))
			.then(data => setNotes(data.filter(note => note.uid == uid)))
	}, [])

	// Handles deletion of notes
	const handleDelete = async (id) => {
		await fetch(notesDB + '/' + id, {
			method: 'DELETE'
		})

		const newNotes = notes.filter(note => note.id != id)
		setNotes(newNotes)
	}

	// Specifies how many cards should be on a column for a given screen size
	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1
	}

	// Display notes
	return (
		<Container>
			<Masonry
				breakpointCols={breakpoints}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{notes.map(note => (
					<div key={note.id}>
						<NoteCard note={note} handleDelete={handleDelete}/>
					</div>
				))}
			</Masonry>
		</Container>
	)
}
