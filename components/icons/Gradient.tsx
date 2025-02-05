import { HtmlHTMLAttributes } from "react";

interface IconProps extends HtmlHTMLAttributes<SVGElement> {}

const Gradient: React.FC<IconProps> = (props) => {
	return (
		<svg
			width="390"
			height="730"
			viewBox="0 0 390 730"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_98_498)">
				<rect width="390" height="730" fill="url(#paint0_radial_98_498)" />
				<g filter="url(#filter0_f_98_498)">
					<rect
						y="117"
						width="390"
						height="451"
						fill="url(#paint1_radial_98_498)"
					/>
				</g>
			</g>
			<defs>
				<filter
					id="filter0_f_98_498"
					x="-110.8"
					y="6.2"
					width="611.6"
					height="672.6"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="BackgroundImageFix"
						result="shape"
					/>
					<feGaussianBlur
						stdDeviation="55.4"
						result="effect1_foregroundBlur_98_498"
					/>
				</filter>
				<radialGradient
					id="paint0_radial_98_498"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(195 511.5) rotate(90) scale(398 395.969)"
				>
					<stop offset="0.00251256" stopColor="#A9FF3C" />
					<stop offset="1" />
				</radialGradient>
				<radialGradient
					id="paint1_radial_98_498"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(195 342.5) rotate(90) scale(225.5 195)"
				>
					<stop stopColor="white" />
					<stop offset="0.5" stopColor="white" stopOpacity="0" />
				</radialGradient>
				<clipPath id="clip0_98_498">
					<rect width="390" height="730" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default Gradient;
