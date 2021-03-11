import React, {Component} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
	Avatar,
	Button,
	Chip,
	Container,
	CssBaseline,
	Fade,
	Grid,
	Link,
	TextField,
	Typography,
	withStyles
} from "@material-ui/core";
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
	chip: {
		backgroundColor: theme.palette.type === 'dark' ? theme.palette.error.dark : theme.palette.error.light,
	}
});

/**
 *  Signup class
 *
 *  Signup component used in the loginSignup.js to show signup form.
 */
class Signup extends Component
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
		passMatch: false,
		errorMessage: "Something went wrong try again later",
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
	 * handleScore function
	 *
	 * Update the score in state based on the password strength bar
	 * @param {number} score password score 1-4 depending on how strong it is
	 */
	handleScore = score =>
	{
		if (this.state.formData.password !== "")
		{
			this.setState({passScore: score})
			if (score < 3)
			{
				this.setState({passMessage: "Password not strong enough, use a stronger password"});
			}
			else
			{
				this.setState({passMessage: ""})
				
			}
		}
	}
	
	/**
	 * checkUsername function
	 *
	 * Send a request to server to check if username exists. If username exists update message in state to show
	 * appropriate message
	 * @param {Event} e grab elements details
	 */
	checkUsername = e =>
	{
		let formData = new FormData();
		formData.append("userEmail", e.target.value);
		formData.append("type", "username");
		fetch("/checkUserEmail/", {
			method: "POST",
			body: formData
		}).then(res =>
		{
			res.text().then(text =>
			{
				if (text !== "ok")
				{
					this.setState({userMessage: text});
				}
				else
				{
					this.handleForm(e);
				}
			})
		})
	}
	
	/**
	 * checkEmail function
	 *
	 * Send a request to server to check if email exists. If email exists update message in state to show
	 * appropriate message
	 * @param {Event} e grab elements details
	 */
	checkEmail = e =>
	{
		let formData = new FormData();
		formData.append("userEmail", e.target.value);
		formData.append("type", "email");
		fetch("/checkUserEmail/", {
			method: "POST",
			body: formData
		}).then(res =>
		{
			res.text().then(text =>
			{
				if (text !== "ok")
				{
					this.setState({emailMessage: text});
				}
				else
				{
					this.handleForm(e);
				}
			})
		})
	}
	
	/**
	 * handlePasswd function
	 *
	 * Call handleForm method to update state of password then reset passMessage
	 * state to enable signup button to be clickable again.
	 * @param {Event} e grab elements details
	 */
	handlePasswd = e =>
	{
		this.handleForm(e)
		this.setState({passMessage: ""})
	}
	
	/**
	 * checkPasswd function
	 * <br>
	 * checks to see if passwordScore is less than 3 i.e. if password is strong enough
	 */
	checkPasswd = () =>
	{
		if (this.state.passScore < 3)
		{
			this.setState({passMessage: "Password not strong enough, use a stronger password"});
		}
		else
		{
			this.setState({passMessage: ""})
		}
	}
	
	/**
	 * handleRePasswd function
	 *
	 * Checks to see if passwords match if not set error message
	 * @param {Event} e grab elements details
	 */
	handleRePasswd = e =>
	{
		this.handleForm(e)
		if (this.state.formData.password !== e.target.value)
		{
			this.setState({rePassMessage: "Passwords don't match", passMatch: false});
		}
		else
		{
			this.setState({rePassMessage: "", passMatch: true})
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
	 * signupUser function
	 *
	 * Sends the form data to the server to signup user once all checks have been passed
	 * @param {Event} e grab elements details
	 */
	signupUser = e =>
	{
		e.preventDefault();
		// this.checkPasswd()
		let formData = new FormData();
		for (let key in this.state.formData)
		{
			formData.append(key, this.state.formData[key]);
		}
		fetch("/signup/", {
			method: "POST",
			body: formData
		}).then(res =>
		{
			res.text().then(text =>
			{
				if (text === "ok")
				{
					console.log("User signed up")
				}
				else
				{
					this.setState(prevState => ({	...prevState, errorMessage: text}))
					this.setState(prevState => ({	...prevState, fadein: true}))
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
		const {userMessage, emailMessage, passMessage, rePassMessage, formData, errorMessage, fadein, passMatch, passScore} = this.state;
		const {password} = formData;
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
					<form className={this.classes.form} action="/signup.html" onSubmit={this.signupUser} method="POST">
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField autoComplete="fname" name="firstName" variant="outlined"
								           required fullWidth id="firstName" label="First Name" autoFocus
								           onChange={this.handleForm} inputProps={{maxLength: 100}}/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField variant="outlined" required fullWidth id="lastName"
								           label="Last Name" name="lastName" autoComplete="lname"
								           onChange={this.handleForm} inputProps={{maxLength: 100}}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={userMessage !== ""} helperText={userMessage} variant="outlined"
								           required fullWidth name="username" label="Username"
								           id="username" autoComplete="username" onChange={this.checkUsername} inputProps={{maxLength: 100}}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={emailMessage !== ""} helperText={emailMessage} variant="outlined"
								           required fullWidth id="email" type="email"
								           label="Email Address" name="email" autoComplete="email"
								           onChange={this.checkEmail}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={passMessage !== ""} helperText={passMessage} variant="outlined"
								           required fullWidth name="password" label="Password"
								           type="password" id="password" autoComplete="new-password"
								           inputProps={{minLength: 8}} onChange={this.handlePasswd}/>
								<PasswordStrengthBar password={password}
								                     barColors={['#ddd', '#ef4836', '#f6b44d', '#bdc225', '#4caf50']}
								                     minLength={8} onChangeScore={this.handleScore}/>
							</Grid>
							<Grid item xs={12}>
								<TextField error={rePassMessage !== ""} helperText={rePassMessage} variant="outlined"
								           required fullWidth name="rePass" label="Re-type Password"
								           type="password" id="rePass" autoComplete="new-password"
								           inputProps={{minLength: 8}} onChange={this.handleRePasswd}/>
							</Grid>
						</Grid>
						<Button type="submit" fullWidth variant="contained" color="primary"
						        disabled={userMessage !== "" || emailMessage !== "" || passMessage !== "" || rePassMessage !== "" || passMatch === false || passScore < 3}
						        className={this.classes.submit}>
							Sign Up
						</Button>
						<Grid container justify="center">
							<Fade in={fadein} mountOnEnter={true} unmountOnExit={true} onExited={this.handleFade}>
								<Chip className={this.classes.chip} label={errorMessage} onDelete={this.handleDelete} />
							</Fade>
						</Grid>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="#" variant="body2"
								      onClick={() =>
								      {
									      this.props.goToSignup(!this.props.signup)
								      }}>
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
