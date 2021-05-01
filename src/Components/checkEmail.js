import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {Avatar, Button, Container, CssBaseline, Link, TextField, Typography, withStyles} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

/**
 * Styling for page
 */
const useStyles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	snackButton: {
		color: theme.palette.secondary.main,
	}
})

class CheckEmail extends Component
{
	classes = this.props.classes;
	
	state = {
		userCodeMessage: "",
		userStatus: "",
	}
	
	render()
	{
		const {userCodeMessage, userStatus} = this.state;
		
		if (userStatus === "ok")
		{
			return <Redirect to="/tab"/>
		}
		else if (userStatus === "not ok")
		{
			return <Redirect to="/"/>
		}
		
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<div className={this.classes.paper}>
					<Avatar className={this.classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Reset Password
					</Typography>
					<form action="checkeEmail.html" className={this.classes.form} onSubmit={this.checkEmail} method="POST">
						<TextField variant="outlined" margin="normal" required fullWidth id="userCode"
						           label="Check Email" name="userCode" onChange={this.handleForm} autoFocus/>
						<Link href="/loginSignup" variant="body2">
							Back to login
						</Link>
						<Button type="submit" fullWidth variant="contained"
						        color="primary"
						        disabled={userCodeMessage !== ""}
						        className={this.classes.submit}>
								Check Email
						</Button>
					</form>
				</div>
			</Container>
		)
	}
}

export default withStyles(useStyles)(CheckEmail);
