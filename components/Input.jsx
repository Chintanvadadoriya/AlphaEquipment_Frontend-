import { InputContainer } from "@style";

const Input = ({
	lable,
	type,
	children,
	showError,
	errorMsg,
	defaultValue,
	readonly,
	...restProps
}) => {
	return (
		<InputContainer>
			<label>{lable}</label>
			<input
				type={type || "text"}
				defaultValue={defaultValue || ""}
				{...restProps}
				readOnly={readonly}
			/>
			<span className="error-msg">{showError && errorMsg}</span>
			{children}
		</InputContainer>
	);
};

export default Input;
