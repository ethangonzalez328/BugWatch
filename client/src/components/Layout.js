import React from 'react'
import { makeStyles, Drawer, Typography } from '@material-ui/core'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { AppBar, Toolbar } from '@material-ui/core'
import { AddCircleOutlineOutlined, SubjectOutlined, LogoutIcon } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
	return {
		// Overall page style
		page: {
			width: '100%',
			height: '100vh',
			padding: theme.spacing(1),
			background: '#f0f0f0'
		},
		// Sidebar styles
		drawer: {
			width: drawerWidth
		},
		drawerPaper: {
			width: drawerWidth
		},
		root: {
			display: "flex"
		},
		title: {
			padding: theme.spacing(2)
		},
		appbar: {
			width: `calc(100% - ${drawerWidth}px)`,
			backgroundColor: '#e0e0e0'
		},
		toolbar: theme.mixins.toolbar,
		appname: {
			flexGrow: 1,
		},
		// Sidebar button styles
		active: {
			background: '#f0f0f0',
			"&:hover": {
				backgroundColor: '#e0e0e0'
			}
		},
		inactive: {
			"&:hover": {
				backgroundColor: '#e0e0e0'
			}
		}
	}
})

export default function Layout({children}) {
	const classes = useStyles()
	const history = useHistory()
	const location = useLocation()

	// Sidebar button formatting
	const menuItems = [
		{
			text: 'Bugs',
			icon: <SubjectOutlined color="secondary" />,
			path: '/app'
		},
		{
			text: 'Create Bug',
			icon: <AddCircleOutlineOutlined color="secondary" />,
			path: '/create'
		}
	]
	return (
		<div className={classes.root}>
			{/* App bar */}
			<AppBar
				className={classes.appbar}
				elevation={0}
			>
				<Toolbar>
					<Typography className={classes.appname}>
						Application name
					</Typography>
					<Typography>
						username
					</Typography>
				</Toolbar>
			</AppBar>

			{/* Side bar */}
			<Drawer
				className={classes.drawer}
				variant="permanent"
				anchor="left"
				classes={{paper: classes.drawerPaper}}
			>
				<div>
					<Typography variant="h5" className={classes.title}>
						BugWatch
					</Typography>
				</div>

				{/* Sidebar button functionality*/}
				<List>
					{menuItems.map(item => (
						<ListItem
							className={location.pathname == item.path ? classes.active : classes.inactive}
							button
							key={item.text}
							onClick={() => history.push(item.path)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text}/>
						</ListItem>
					))}
				</List>
			</Drawer>

			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	)
}