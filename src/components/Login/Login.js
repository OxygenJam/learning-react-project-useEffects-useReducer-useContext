import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const Login = (props) => {
	/** A good rule for useReducer is when you have multiple states
	 * that depend on one another that can be one big state, or
	 * when you have some setState function that depend on values
	 * from other states, wherein you want to have the up-to-date
	 * value from those states;
	 *
	 * tl;dr don't use other states in calling the setState function
	 * e.g. setStateA(stateB condition)
	 */

	// All these states are one big state dependent to one another
	// formIsValid -> emailIsValid & passwordIsValid -> enteredEmail & enteredPassword
	// const [enteredEmail, setEnteredEmail] = useState("");
	// const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	/** Reducer functions should not have any data that interacts with the
	 * state argument will always be the state that is being used and referenced
	 * in this case it is the emailState itself
	 */
	const emailReducer = (state, action) => {
		if (action.type === "USER_INPUT") {
			return { value: action.val, isValid: action.val.includes("@") };
		}
		if (action.type === "INPUT_BLUR") {
			return { value: state.value, isValid: state.value.includes("@") };
		}

		return { value: "", isValid: false };
	};

	// Reducer function are basically what will be called when you call your dispatchAction
	// 2nd argument is the initial value of the state
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});

	const passwordReducer = (state, action) => {
		if (action.type === "USER_INPUT") {
			return { value: action.val, isValid: action.val.length > 6 };
		}
		if (action.type === "INPUT_BLUR") {
			return { value: state.value, isValid: state.value.length > 6 };
		}

		return { value: "", isValid: false };
	};

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});

	// Aliasing destructuring
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	/** Good rule to include in dependencies are those
	 * that you use inside the function call
	 * you can omit the set state functions as they never change
	 * Dependencies are all that defined inside the component
	 * and the parent component through props
	 * Do not include built-in functions as they are not part of React
	 * Do not include anything outside your component or parent component
	 */

	/** Remember useEffect runs after the component is rendered and a change is detected
	 * if you wire some state to onChange event, then useEffect will invoke per keystroke
	 * as well
	 */
	useEffect(() => {
		// Debouncing
		const identifier = setTimeout(() => {
			console.log("Checking form validity!");
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);

		// Cleanup function
		// functions that are run before useeffect function

		/** This basically clears the timers in the DOM and the next
		 * invocation of the useEffect. Just straightup resetting the
		 * timeout function
		 */
		return () => {
			console.log("Cleanup");
			clearTimeout(identifier);
		};
	}, [emailIsValid, passwordIsValid]);
	/**
	 * Previously we made use of the emailState and the passwordState as dependencies
	 * but is not optimal as we are checking the whole state object has changed and not the
	 * validity itself, hence the new solution
	 */

	/** Just sample use Effect to prove that useEffect is invoked upon component
	 * re-render wherein it checks the dependency that was change on the re-render
	 * Cleanup function is invoked before the useEffect function, except the initial
	 * runtime of the component
	 */
	// useEffect(() => {
	// 	console.log("EFFECT RUNNING");

	// 	return () => {
	// 		console.log("EFFECT CLEANUP");
	// 	};
	// }, [enteredPassword]);

	const ctx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef()

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });

		// setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });

		// setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			ctx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					ref={emailInputRef}
				/>
				<Input
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					ref={passwordInputRef}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
