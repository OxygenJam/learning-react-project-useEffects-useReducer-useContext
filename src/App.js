import React, { useState, useEffect, useContext} from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";
// import AuthContext from "./store/auth-context";

/**
 * React mainly does only rendering the UI
 * reacting to events that change the UI and so forth
 *
 * Side effects are any logic that scopes outside
 * the UI
 *
 * it is often discouraged to use logic outside rendering
 * the UI inside a component like sending an http request
 *
 * make use of useEffect()
 *
 * takes in two arguments
 *  - a function that executes after every component evaulation
 *    if the specified dependecies are changed
 *  - The specified dependencies wherein upon changed, the previous
 *    argument function is invoked
 *
 */

function App() {
	const ctx = useContext(AuthContext);
	// const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Whenever react calls a state Setting function, the component reloads
	// thus this approach leads to an infinite loop
	// if(storedUserLoggedInInformation === '1'){
	//   setIsLoggedIn(true);
	// }

	// Good rule for use effect, is that if another action executes whenever
	// an action exectutes it is a side effect

	// Default value for dependencies is null or empty on initial run,
	// and use effect runs after the component is loaded, hence upon this call
	// the new dependencies is an empty array
	// useEffect(() => {
	// 	const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

	// 	if (storedUserLoggedInInformation === "1") {
	// 		setIsLoggedIn(true);
	// 	}
	// }, []);

	// const loginHandler = (email, password) => {
	// 	// We should of course check email and password
	// 	// But it's just a dummy/ demo anyways
	// 	localStorage.setItem("isLoggedIn", "1");
	// 	setIsLoggedIn(true);
	// };

	// const logoutHandler = () => {
	// 	localStorage.removeItem("isLoggedIn");
	// 	setIsLoggedIn(false);
	// };

	/** Make use of <contextName.Provider> to make use it as a component
	 * It is good practice to provide the value attrib even though you have a
	 * default value defined in your context file
	 */
	return (
		<React.Fragment>
				<MainHeader/>
				<main>
					{!ctx.isLoggedIn && <Login />}
					{ctx.isLoggedIn && <Home />}
				</main>
		</React.Fragment>
	);

	// return (
	// 	<AuthContext.Provider
	// 		value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}
	// 	>
	// 		<MainHeader onLogout={logoutHandler} />
	// 		<main>
	// 			{!isLoggedIn && <Login onLogin={loginHandler} />}
	// 			{isLoggedIn && <Home onLogout={logoutHandler} />}
	// 		</main>
	// 	</AuthContext.Provider>
	// );
}

export default App;
