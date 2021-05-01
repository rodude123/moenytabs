import React, {Component} from 'react';
import {Box} from "@material-ui/core";
import {Transition} from "react-transition-group";
import {Redirect} from "react-router-dom";
import CheckEmail from "../Components/checkEmail";
import ChangePassword from "../Components/changePassword";

/**
 * resetPass class
 *
 * Used for transitioning between the checkEmail and changePassword forms
 */
class ResetPass extends Component
{
	state = {
		checkEmail: true,
		changePassState: "",
		verified: "",
	}
	/**
	 * Default style for reset password transitions
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
	 * componentDidMount function
	 * <br>
	 * Checks user status on backend e.g. if verified, logged in etc. when the component is added to the dom
	 */
	componentDidMount = () =>
	{
		fetch("/checkUser/").then(res =>
		{
			res.text().then(text =>
			{
				this.setState({verified: text})
			})
		});
	};
	
	/**
	 * checkEmail function
	 *
	 * Set's checkEmail to boolean based on prop from login or checkEmail components
	 * @param {boolean} checkEmail whether to go to checkEmail form or not
	 */
	checkEmail = checkEmail => this.setState({checkEmail: checkEmail})
	
	/**
	 * changePassword function
	 * Set's loginSignupState based on prop from login or checkEmail components
	 * @param {string} cPState - whether or not to go the tab page or verify page
	 */
	changePassword = cPState => this.setState({changePassState: cPState})
	
	/**
	 * render function to render the jsx
	 * @returns {JSX.Element}
	 */
	render()
	{
		const {checkEmail, verified, changePassState} = this.state;
		
		if (verified === "ok")
		{
			return <Redirect to="/tab"/>
		}
		else if (verified === "not verified")
		{
			return <Redirect to="/verify"/>
		}
		else if (changePassState)
		{
			return <Redirect to="/logincheckEmail"/>;
		}
		
		return (
			<Box display="flex" justifyContent="center">
				<Transition in={checkEmail} timeout={1500}>
					{state =>
						(
							<div style={{...this.defaultStyle, ...this.slideL[state]}}>
								<CheckEmail checkEmail={this.checkEmail}
								        changePassword={this.changePassword} {...this.state}/>
							</div>
						)
					}
				</Transition>
				<Transition in={!checkEmail} timeout={1500}>
					{state =>
						(
							<div style={{...this.defaultStyle, ...this.slideR[state]}}>
								<ChangePassword checkEmail={this.checkEmail} changePassword={this.changePassword} {...this.state}/>
							</div>
						)
					}
				</Transition>
			</Box>
		);
	}
}

export default ResetPass;
