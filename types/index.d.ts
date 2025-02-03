export {};

declare global {
	interface Window {
		Telegram: {
			WebApp: {
				initDataUnsafe: WebAppInitData;
				HapticFeedback: HapticFeedback;
				CloudStorage: CloudStorage;
				expand: () => void;
				platform: string;
				BackButton: BackButton;
				showConfirm: (
					message: string,
					callback: (result: boolean) => void,
				) => void;
				sendData: (data: string) => void;
				openLink: (url: string) => void;
				openTelegramLink: (url: string) => void;
				disableVerticalSwipes: () => void;
			};
		};
	}
}

interface WebAppInitData {
	query_id: string;
	user: WebAppUser;
}

interface WebAppUser {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	is_premium: boolean;
}

interface CloudStorage {
	setItem: (
		key: string,
		value: unknown,
		callback?: (e: Error | null, saved: boolean) => void,
	) => void;
	getItem: (
		key: string,
		callback?: (e: Error | null, item: unknown) => void,
	) => unknown;
	removeItem: (ey: string, callback?: (e: Error | null) => void) => void;
}

interface HapticFeedback {
	impactOccurred: (
		style: "light" | "medium" | "heavy" | "rigid" | "soft",
	) => void;
	notificationOccurred: (type: "error" | "success" | "warning") => void;
	selectionChanged: () => void;
}

interface BackButton {
	isVisible: boolean;
	onClick: (callback: () => void) => BackButton;
	offClick: (callback: () => void) => BackButton;
	show: () => BackButton;
	hide: () => BackButton;
}

export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type LevelsTable = Record<Level, { value: number; price: number }>;

export type UserDataKey = "battery_lvl" | "charger_lvl" | "size_lvl";

export type UserDataType = Record<UserDataKey, Level>;

export interface Mission {
	id: string;
	href?: string;
	title: string;
	reward: number | string;
	imageUrl: string;
	friends?: number;
	channelId?: number;
	type: "external" | "friends" | "display" | "telegram";
}

export interface MissionSheet {
	title?: string;
	missions: Mission[];
}

export type SheetRoute = "missions" | "friends" | "shop" | null;
