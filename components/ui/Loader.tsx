import { LoaderCircle } from "lucide-react";

const Loader = () => {
	return (
		<main className="flex justify-center items-center !w-screen !h-screen">
			<LoaderCircle className="w-6 h-6 animate-spin" />
		</main>
	);
};

export default Loader;
