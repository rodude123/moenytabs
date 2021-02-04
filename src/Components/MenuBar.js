import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person"
import SettingsIcon from "@material-ui/icons/Settings"

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
		open: false
	}
	
	classes = this.props.classes;
	
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
		return (
			<div className={this.classes.root}>
				<SwipeableDrawer anchor="left" open={this.state.open} onClose={this.closeSideMenu} onOpen={this.openSideMenu}>
					<div
						className={this.classes.list}
						role="presentation"
						onClick={this.closeSideMenu}
						onKeyDown={this.closeSideMenu}>
						<List>
							<ListItem button key="Tabs" onClick={console.log("Tabs page")}>
								<ListItemIcon>
									<PersonIcon/>
								</ListItemIcon>
								<ListItemText primary="Tabs"/>
							</ListItem>
							<ListItem button key="Group Tabs">
								<ListItemIcon>
									<GroupIcon/>
								</ListItemIcon>
								<ListItemText primary="Group Tabs"/>
							</ListItem>
							<ListItem button key="Settings">
								<ListItemIcon>
									<SettingsIcon/>
								</ListItemIcon>
								<ListItemText primary="Settings"/>
							</ListItem>
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
									onClick={console.log("Go to profile")}
									color="inherit">
									<AccountCircle/>
								</IconButton>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(useStyles)(MenuBar)
