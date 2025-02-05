import { HtmlHTMLAttributes } from "react";

interface IconProps extends HtmlHTMLAttributes<SVGElement> {}

const UserIcon: React.FC<IconProps> = (props) => {
	return (
		<svg
			width="8"
			height="8"
			viewBox="0 0 8 8"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M3.91347 4.366C4.84297 4.366 5.59647 3.6125 5.59647 2.683C5.59647 1.75351 4.84297 1 3.91347 1C2.98397 1 2.23047 1.75351 2.23047 2.683C2.23047 3.6125 2.98397 4.366 3.91347 4.366Z"
				fill="currentColor"
			/>
			<path
				d="M1.36902 7.74115C1.27115 7.74115 1.17729 7.70227 1.10808 7.63306C1.03888 7.56386 1 7.47 1 7.37213V7.35368C1 6.68256 1.27326 6.03894 1.75968 5.56439C2.24609 5.08984 2.9058 4.82324 3.59369 4.82324H4.2263C4.91419 4.82324 5.57391 5.08984 6.06032 5.56439C6.54673 6.03894 6.82 6.68256 6.82 7.35368V7.37213C6.82 7.47 6.78112 7.56386 6.71191 7.63306C6.64271 7.70227 6.54884 7.74115 6.45097 7.74115H1.36902Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default UserIcon;
