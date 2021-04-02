import React, {Component} from 'react';
import {Avatar, Button, Container, CssBaseline, TextField, Typography, withStyles} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
	chip: {
		backgroundColor: theme.palette.type === 'dark' ? theme.palette.error.dark : theme.palette.error.light,
	}
})

/**
 * Verify class
 *
 * Used to verify user and make sure the email exists
 */
class Verify extends Component
{
	classes = this.props.classes;
	
	state = {
		userCodeMessage: "",
	}
	
	/**
	 * handleForm function
	 *
	 * Update the formData object in the state with respective values from the form
	 * @param {Event} e grab elements details
	 */
	handleForm = e =>
	{
		this.setState(prevState =>
		({
			formData: {
				...prevState.formData,
				[e.target.name]: e.target.value,
			}
		}))
	}
	
	/**
	 * verifyUser function
	 *
	 * Sends a request to the server to check if the user code
	 * is correct, then update the state with an appropriate
	 * message
	 * @param {Event} e - grab element details
	 */
	verifyUser = e =>
	{
	
	}
	
	render()
	{
		const {userCodeMessage} = this.state;
		
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<div className={this.classes.paper}>
					<Avatar className={this.classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Verify
					</Typography>
					<form action="verify.html" className={this.classes.form} onSubmit={this.verifyUser} method="POST">
						<TextField error={userCodeMessage !== ""} helperText={userCodeMessage} variant="outlined"
						           margin="normal" required fullWidth id="userCode" label="Verification Code"
						           name="userCode" onChange={this.handleForm} autoFocus/>
						<Button type="submit" fullWidth variant="contained"
						        color="primary"
						        disabled={userCodeMessage !== ""}
						        className={this.classes.submit}>
							Verify
						</Button>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Verify);
