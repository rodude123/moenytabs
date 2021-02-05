import React, {Component} from 'react';
import Signup from "../Components/signup";
import Login from "../Components/login";
import {Box} from "@material-ui/core";
import {Transition} from "react-transition-group";

class LoginSignup extends Component
{
	state = {
		signup: false
	}
	
	goToSignup = signup =>
	{
		this.setState({signup: signup})
	}
	
	defaultStyle = {
		display: "block",
		transition: "all 2000ms cubic-bezier(0, 0, 0.2, 1) 0ms",
	}
	
	slideL = {
		entering: {
			transform: `translateX(-${window.innerWidth}px)`,
		},
		entered: {
			transform: "none",
		},
		exiting: {
			transform: `translateX(-${window.innerWidth}px)`,
		},
		exited: {
			transform: `translateX(-${window.innerWidth}px)`,
			display: "none",
		},
	}
	
	slideR = {
		entering: {
			transform: `translateX(${window.innerWidth}px)`,
		},
		entered: {
			transform: "none",
		},
		exiting: {
			transform: `translateX(${window.innerWidth}px)`,
		},
		exited: {
			transform: `translateX(${window.innerWidth}px)`,
			display: "none",
		},
	}
	
	render()
	{
		const {signup} = this.state;
		return (
			<Box display="flex" justifyContent="center">
				<Box>
					<Transition in={signup}>
						{state =>
							(
								<div style={{...this.defaultStyle, ...this.slideL[state]}}>
									<Signup goToSignup={this.goToSignup} {...this.state}/>
								</div>
							)
						}
					
					</Transition>
				</Box>
				<Box>
					<Transition in={!signup}>
						{state =>
							(
								<div style={{...this.defaultStyle, ...this.slideR[state]}}>
									<Login goToSignup={this.goToSignup} {...this.state}/>
								</div>
							)
						}
					
					</Transition>
				</Box>
			</Box>
		)
	}
}

export default LoginSignup;
