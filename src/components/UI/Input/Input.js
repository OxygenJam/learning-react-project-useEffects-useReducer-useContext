import React, { useEffect, useRef, useImperativeHandle } from "react";
import styles from "./Input.module.css";


// To make this work make use of this following export statement
const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref, () =>{

        // returns an object all the things you can access outside
        // Basically a translation function
        return {
            focus: activate
        }
    })
	return (
		<div
			className={`${styles.control} ${
				props.isValid === false ? styles.invalid : ""
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
			<input
                ref={inputRef}
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
		</div>
	);
});

export default Input;
