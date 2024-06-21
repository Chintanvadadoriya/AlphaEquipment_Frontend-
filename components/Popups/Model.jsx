import { ModelContainer } from "@style";

const Model = ({ children, ...restProps }) => {
	return (
		<ModelContainer {...restProps}>
			<div className="model">
				<button className="close-btn">
					<img src="/assets/icons/cross.png" />
				</button>
				{children}
			</div>
		</ModelContainer>
	);
};

export default Model;
