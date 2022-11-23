import React, { useEffect, useState } from 'react'
import { Container, IconButton } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import TextField from '@mui/material/TextField'



export default function Notes({uid}) {
	//dummy data to fetch for search
	const searchTest = [
		{
			name: "test1",
			details: "details1"
		},
		{
			name: "test2",
			details: "details2"
		}
	]

	//lines 23-41 from https://akashmittal.com/search-json-reactjs/
	const [searchedArray, setSearchedArray] = React.useState(searchTest);
  	const [searchString, setSearchString] = React.useState("");

	React.useEffect(() => {
		if (searchString.length === 0) {
			setSearchedArray(searchTest);
		} else {
		  	const searchedObjects = [];
			searchTest.forEach((testObject, index) => {
				Object.values(testObject).every((onlyValues, valIndex) => {
			  		if (onlyValues.toLowerCase().includes(searchString.toLowerCase())) {
						searchedObjects.push(testObject);
						return;
			  		}
				});
		  	});
		  setSearchedArray(searchedObjects);
		}
	  }, [searchString]);

	// IMPORTANT:
	//// make sure to use the same port as specified in the JSON server
	//// make sure the port number is not the same as the one used to run the application
	const notesDB = 'http://localhost:3000/notes'
	const [notes, setNotes] = useState([])

	// Get notes from local JSON server, filtering by a specific user id
	useEffect(() => {
		fetch(notesDB)
			.then(res => res.json())
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
			{/* Search field: */}
			<TextField 
				id="search" 
				margin ="normal" 
				label="search here..." 
				variant="outlined" 
				value={searchString}
				onChange={(e) => setSearchString(e.target.value)}
			/> 
			{/* Print dummy data based on search input */}
			<pre>{JSON.stringify(searchedArray, null, "    ")}</pre>
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
