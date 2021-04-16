import React, {Component} from 'react';
import {
	Avatar,
	Button,
	Container,
	CssBaseline,
	IconButton,
	Snackbar,
	TextField,
	Typography,
	withStyles
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from '@material-ui/lab/Alert';
import {Redirect} from "react-router-dom";

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
		userCode: "",
		userStatus: "",
		openSnackbar: false
	}
	
	/**
	 * componentDidMount function
	 * <br>
	 * Checks if user status on backend e.g. if verified, logged in etc. when the component is added to the dom
	 */
	componentDidMount = () =>
	{
		fetch("/checkUser/").then(res =>
		{
			res.text().then(text =>
			{
				this.setState({userStatus: text})
			})
		});
	};
	
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
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}
	
	/**
	 * handleClose function
	 * <br>
	 * Closes the snackbar
	 */
	handleClose = () =>
	{
		this.setState({openSnackbar: false})
	}
	
	/**
	 * resendCode function
	 *
	 * Sends a request to the server to resend the verification code to the user
	 * @param e {Event} - grab elements details
	 */
	resendCode = e =>
	{
		e.preventDefault();
		
		fetch("/resendVerifyCode/")
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
		e.preventDefault();
		let formData = new FormData();
		formData.append("verifyCode", this.state.userCode)
		fetch("/verifyUser/", {
			method: "POST",
			body: formData
		}).then(res =>
		{
			res.text().then(text =>
			{
				if (text === "ok")
				{
					this.setState(prevState => ({...prevState, userStatus: "ok"}));
				}
				else
				{
					this.setState(prevState =>
					({
						...prevState,
						userCodeMessage: text,
						userStatus: "not verified",
						openSnackbar: true
					}));
				}
			})
		})
	}
	
	render()
	{
		const {userCodeMessage, userStatus, openSnackbar} = this.state;
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
						Verify
					</Typography>
					<form action="verify.html" className={this.classes.form} onSubmit={this.verifyUser} method="POST">
						<TextField variant="outlined" margin="normal" required fullWidth id="userCode"
						           label="Verification Code" name="userCode" onChange={this.handleForm} autoFocus/>
						<Button type="submit" fullWidth variant="contained"
						        color="primary"
						        disabled={userCodeMessage !== ""}
						        className={this.classes.submit}>
							Verify
						</Button>
					</form>
				</div>
				
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					open={openSnackbar}
					autoHideDuration={6000}
					onClose={this.handleClose}>
					<MuiAlert severity="error">
						Wrong Code
						<Button color="secondary" size="small" onClick={this.resendCode}>
							Resend Code
						</Button>
						<IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
							<CloseIcon fontSize="small"/>
						</IconButton>
					</MuiAlert>
				</Snackbar>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Verify);
