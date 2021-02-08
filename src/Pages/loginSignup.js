import React, {Component} from 'react';
import Signup from "../Components/signup";
import Login from "../Components/login";
import {Box} from "@material-ui/core";
import {Transition} from "react-transition-group";

/**
 * LoginSignup class
 * Used for transitioning between the login and signup forms
 */
class LoginSignup extends Component
{
	state = {
		signup: false
	}
	
	/**
	 * goToSignup function
	 *
	 * Set's signup to boolean based on prop from login or signup components
	 * @param {boolean} signup whether to go to signup form or not
	 */
	goToSignup = signup => this.setState({signup: signup})
	
	/**
	 * Default style for login and signup transitions
	 * @type {object}
	 */
	defaultStyle = {
		display: "block",
		transition: "all 1500ms cubic-bezier(0, 0, 0.2, 1) 0ms",
	}
	
	/**
	 * Slide left styles
	 * @type {object}
	 */
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
	/**
	 * Slide right styles
	 * @type {object}
	 */
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
	
	/**
	 * render function to render the jsx
	 * @returns {JSX.Element}
	 */
	render()
	{
		const {signup} = this.state;
		return (
			<Box display="flex" justifyContent="center">
				<Transition in={signup}>
					{state =>
						(
							<div style={{...this.defaultStyle, ...this.slideL[state]}}>
								<Signup goToSignup={this.goToSignup} {...this.state}/>
							</div>
						)
					}
				</Transition>
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
		)
	}
}

export default LoginSignup;
