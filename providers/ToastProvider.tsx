"use client";

import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
	return (
		<Toaster
			toastOptions={{
				position: "bottom-center",
				style: {
					backgroundColor: "rgba(0,0,0,0.5)",
					color: "white",
					fontWeight: 500,
					fontSize: 14,
					width: "100%",
					marginLeft: 8,
					marginRight: 8,
					borderRadius: 16,
					textAlign: "start",
					pointerEvents: "none",
				},
			}}
			containerStyle={{
				bottom: 24,
			}}
		/>
	);
};

export default ToastProvider;
