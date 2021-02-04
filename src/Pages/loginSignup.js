import React, {Component} from 'react';
import Signup from "../Components/signup";
import Login from "../Components/login";
import {Box, Fade, Slide} from "@material-ui/core";

class LoginSignup extends Component
{
	state = {
		signup: false
	}
	
	goToSignup = signup =>
	{
		this.setState({signup: signup})
	}
	
	render()
	{
		const {signup} = this.state;
		return (
			<Box display="flex" justifyContent="center">
				<Box>
					<Slide direction="right" in={signup} timeout={1000} mountOnEnter unmountOnExit>
						<div>
							<Fade in={signup} timeout={1000}>
								<div><Signup goToSignup={this.goToSignup} {...this.state}/></div>
							</Fade>
						</div>
					</Slide>
				</Box>
				<Box>
					<Slide direction="left" in={!signup} timeout={1000} mountOnEnter unmountOnExit>
						<div>
							<Fade in={!signup} timeout={1000}>
								<div><Login goToSignup={this.goToSignup} {...this.state}/></div>
							</Fade>
						</div>
					</Slide>
				</Box>
			</Box>
		)
	}
}

export default LoginSignup;
