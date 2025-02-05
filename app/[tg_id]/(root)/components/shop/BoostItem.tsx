import Image from "next/image";
import { ChevronRight } from "lucide-react";

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CoinIcon from "@/components/icons/CoinIcon";

interface BoostItemProps {
	onSubmit: () => void;
	imageUrl: string;
	title: string;
	description: string;
	increase: string;
	currentLvl: number;
	price: number;
	max: boolean;
	available: boolean;
}

const BoostItem: React.FC<BoostItemProps> = ({
	onSubmit,
	imageUrl,
	title,
	description,
	increase,
	currentLvl,
	price,
	max,
	available,
}) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					disabled={max || !available}
					className="flex items-center gap-3 w-full"
				>
					<div className="bg-white/5 rounded-lg p-4">
						<Image
							src={imageUrl}
							alt="boost-image"
							width={160}
							height={160}
							className="w-8 h-8"
						/>
					</div>

					<div className="flex flex-col items-start">
						<p>{title}</p>

						{max ? (
							<span className="text-sm text-white/30">Max lvl</span>
						) : (
							<div className="flex items-center gap-2">
								<div className="flex items-center gap-1">
									{available ? (
										<CoinIcon className="w-4 h-4" />
									) : (
										<Image
											src="/locked.png"
											alt="locked"
											width={160}
											height={160}
											className="w-4 h-4"
										/>
									)}
									<span className="text-sm font-semibold">{price}</span>
								</div>

								<div className="w-[3px] h-[3px] rounded-full bg-white/30" />

								<span className="text-sm text-white/30">{`${currentLvl} lvl`}</span>
							</div>
						)}
					</div>

					<ChevronRight className="ml-auto text-white/30" />
				</button>
			</SheetTrigger>
			<SheetContent side="bottom">
				<div className="flex flex-col items-center pt-[34px]">
					<Image
						src={imageUrl}
						alt="boost-image"
						width={160}
						height={160}
						className="w-[72px] h-[72px]"
					/>

					<h1 className="text-[26px] font-bold mt-5">{title}</h1>

					<p className="text-sm text-center mt-2.5 max-w-[220px]">
						{description}
					</p>

					<p className="text-sm mt-6">{`+${increase} for each level`}</p>

					<div className="flex items-center gap-2 mt-4">
    					     <CoinIcon className="w-auto h-12"/>
     					     <p className="text-2xl font-medium">{price}</p>
					</div>

					<SheetClose asChild>
						<Button
							onClick={onSubmit}
							className="mt-8 self-stretch bg-gradient-to-r from-transparent to-appcolor"
						>
							Get
						</Button>
					</SheetClose>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default BoostItem;
