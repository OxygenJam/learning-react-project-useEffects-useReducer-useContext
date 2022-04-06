import React, { useState, useEffect } from "react";

// It could be anything but recommended is object
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

		if (storedUserLoggedInInformation === "1") {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
        localStorage.removeItem("isLoggedIn");
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

// To use context you need to provide it and listen to it

// Provide wrap the context on all the components using it

// Context is not optimized for high frequency changes

export default AuthContext;
