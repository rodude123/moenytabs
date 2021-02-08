import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Avatar, Button, Container, CssBaseline, Grid, Link, TextField, Typography, withStyles} from "@material-ui/core";
import PasswordStrengthBar from "react-password-strength-bar";

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

/**
 *  Signup class
 *  Signup component used in the loginSignup.js to show signup form.
 */
class Signup extends React.Component
{
	classes = this.props.classes;
	
	state = {
		formData: {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			rePass: "",
		},
		userMessage: "",
		emailMessage: "",
		passMessage: "",
		rePassMessage: "",
		passScore: 0,
		
	}
	
	/**
	 * handleForm function
	 * update the formData object in the state with respective values from the form
	 * @param {Event} e grab elements details
	 */
	handleForm = (e) =>
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
	 * handleScore function
	 * update the score in state based on the password strength bar
	 * @param {number} score
	 */
	handleScore = (score) =>
	{
		this.setState({passScore: score})
	}
	
	/**
	 * checkUsername function
	 * send a request to server to check if username exists. If username exists update message in state to show
	 * appropriate message
	 * @param {Event} e grab elements details
	 */
	checkUsername = (e) =>
	{
		let formData = new FormData()
		formData.append("username", this.state.formData.username)
		fetch("/checkUser", {
			method: "POST",
			body: formData
		}).then(res =>
		{
			res.text().then(text =>
			{
				if (text !== "ok" )
				{
					this.setState({userMessage: text})
				}
			})
		})
		this.handleForm(e)
	}
	
	/**
	 * signupUser function
	 * sends the form data to the server to signup user once all checks have been passed
	 * @param {Event} e grab elements details
	 */
	signupUser = e =>
	{
		e.preventDefault();
		console.log(this.state)
	}
	
	/**
	 * render method to render the jsx
	 * @returns {JSX.Element}
	 */
	render()
	{
		const {userMessage, emailMessage, passMessage, rePassMessage} = this.state;
		const {password} = this.state.formData;
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<div className={this.classes.paper}>
					<Avatar className={this.classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={this.classes.form} action="/signup.html" onSubmit={this.signupUser}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField autoComplete="fname" name="firstName" variant="outlined"
								           required fullWidth id="firstName" label="First Name" autoFocus onChange={this.handleForm}/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField variant="outlined" required fullWidth id="lastName"
								           label="Last Name" name="lastName" autoComplete="lname" onChange={this.handleForm}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={userMessage !== ""} helperText={userMessage} variant="outlined" required fullWidth name="username" label="Username"
								           id="username" autoComplete="username" onChange={this.handleForm}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={emailMessage !== ""} helperText={emailMessage} variant="outlined" required fullWidth id="email"
								           label="Email Address" name="email" autoComplete="email" onChange={this.handleForm}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={passMessage !== ""} helperText={passMessage} variant="outlined" required fullWidth name="password" label="Password"
								           type="password" id="password" autoComplete="new-password" inputProps={{minlength: 8}} onChange={this.handleForm}/>
								<PasswordStrengthBar password={password} barColors={['#ddd', '#ef4836', '#f6b44d', '#bdc225', '#4caf50']} minLength={8} onChangeScore={this.handleScore}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={rePassMessage !== ""} helperText={rePassMessage} variant="outlined" required fullWidth name="rePass" label="Re-type Password"
								           type="password" id="rePass" autoComplete="new-password" inputProps={{minlength: 8}} onChange={this.handleForm}/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary" disabled={userMessage !== "" || emailMessage !== "" || passMessage !== "" || rePassMessage !== ""}
						        className={this.classes.submit}>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2"
								      onClick={() => {this.props.goToSignup(!this.props.signup)}}>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Signup)
