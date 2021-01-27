import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import {List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from "@material-ui/core";

const useStyles = theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	list: {
		width: 250
	}
});

class MenuBar extends Component
{
	state = {
		auth: true,
		anchorEl: null,
		open: false
	}
	
	classes = this.props.classes;
	
	handleChange = event =>
	{
		this.setState({auth : event.target.checked})
	}
	
	handleMenu = event =>
	{
		this.setState({anchorEl: event.currentTarget})
	};
	
	handleClose = () =>
	{
		this.setState({anchorEl: null})
	};
	
	openSideMenu = (event) =>
	{
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
		{
			return;
		}
		
		this.setState({open: true});
	};
	
	closeSideMenu = (event) =>
	{
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift'))
		{
			return;
		}
		
		this.setState({open: false});
	};
	
	render()
	{
		const open = Boolean(this.state.anchorEl);
		return (
			<div className={this.classes.root}>
				<SwipeableDrawer anchor="left" open={this.state.open} onClose={this.closeSideMenu} onOpen={this.openSideMenu}>
					<div
						className={this.classes.list}
						role="presentation"
						onClick={this.closeSideMenu}
						onKeyDown={this.closeSideMenu}>
						<List>
							{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
								<ListItem button key={text}>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
									</ListItemIcon>
									<ListItemText primary={text} />
								</ListItem>
							))}
						</List>
					</div>
				</SwipeableDrawer>
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" className={this.classes.menuButton} color="inherit" aria-label="menu" onClick={this.openSideMenu}>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6" className={this.classes.title}>
							MoneyTabs
						</Typography>
						{this.state.auth && (
							<div>
								<IconButton
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="inherit">
									<AccountCircle/>
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={this.state.anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={this.handleClose}>
									<MenuItem onClick={this.handleClose}>Profile</MenuItem>
									<MenuItem onClick={this.handleClose}>My account</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(useStyles)(MenuBar)
