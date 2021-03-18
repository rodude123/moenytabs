import React, {Component} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	Button, Checkbox,
	Chip,
	Container,
	CssBaseline,
	Fade, FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
	withStyles
} from "@material-ui/core";


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
});

/**
 * Login class
 * Login component used in the loginSignup.js to show signup form.
 */
class Login extends Component
{
	classes = this.props.classes;
	
	state = {
		formData: {
			userEmail: "",
			password: "",
		},
		errorMessage: "Something went wrong try again later",
		userEmailMessage: "",
		fadein: false,
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
	 * checkUserEmail function
	 *
	 * Send a request to server to check if email doesn't exists. If doesn't email exists update message in state to show
	 * appropriate message
	 * @param {Event} e grab elements details
	 */
	checkUserEmail = e =>
	{
		if (e.target.value !== "")
		{
			let formData = new FormData();
			formData.append("userEmail", e.target.value);
			formData.append("type", "both");
			fetch("/checkUserEmail/", {
				method: "POST",
				body: formData
			}).then(res =>
			{
				res.text().then(text =>
				{
					if (text === "ok")
					{
						this.setState({userEmailMessage: "Are you sure the account exists"});
					}
					else
					{
						this.setState({userEmailMessage: ""})
						this.handleForm(e);
					}
				})
			})
		}
		
	}
	/**
	 * handleDelete function
	 * <br>
	 * Sets fade in to the opposite meaning it fades out
	 */
	handleDelete = () =>
	{
		this.setState(prevState => ({	...prevState, fadein: false}))
	}
	
	/**
	 * handleFade function
	 * <br>
	 * removes the errorMessage i.e. sets it to an empty string
	 */
	handleFade = () =>
	{
		this.setState(prevState => ({	...prevState, errorMessage: ""}))
	}
	
	/**
	 * loginUser function
	 *
	 * Sends the form data to the server to login user
	 * @param {Event} e grab elements details
	 */
	loginUser = e =>
	{
		e.preventDefault();
		let formData = new FormData();
		for (let key in this.state.formData)
		{
			formData.append(key, this.state.formData[key]);
		}
		
		fetch("/login/", {
			method: "POST",
			body: formData
		}).then(res =>
		{
			res.text().then(text =>
			{
				if (text === "ok")
				{
					console.log("Logged in");
				}
				else
				{
					this.setState(prevState => ({ ...prevState, errorMessage: text, fadein: true}))
				}
			})
		})
	}
	
	/**
	 * render function to render the jsx
	 * @returns {JSX.Element}
	 */
	render()
	{
		const {fadein, errorMessage, userEmailMessage} = this.state;
		
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline/>
				<div className={this.classes.paper}>
					<Avatar className={this.classes.avatar}>
						<LockOutlinedIcon/>
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={this.classes.form} action="/login.html" onSubmit={this.loginUser} method="POST">
						<TextField error={userEmailMessage !== ""} helperText={userEmailMessage} variant="outlined"
						           margin="normal" required fullWidth id="userEmail" label="Email Address or Username"
						           name="userEmail" autoComplete="username" onChange={this.checkUserEmail} autoFocus/>
						<TextField variant="outlined" margin="normal" required fullWidth name="password"
						           label="Password" type="password" id="password" autoComplete="current-password"
						           onChange={this.handleForm}/>
						<FormControlLabel control={<Checkbox value="remember" color="primary"/>} label="Remember me"/>
						<Button type="submit" fullWidth variant="contained" color="primary"
								disabled={userEmailMessage !== ""} className={this.classes.submit}>
							Sign In
						</Button>
						<Grid container justify="center">
							<Fade in={fadein} mountOnEnter={true} unmountOnExit={true} onExited={this.handleFade}>
								<Chip className={this.classes.chip} label={errorMessage} onDelete={this.handleDelete} />
							</Fade>
						</Grid>
						
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2" onClick={() => {this.props.goToSignup(!this.props.signup)}}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
}

export default withStyles(useStyles)(Login)
