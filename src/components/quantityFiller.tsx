"use client"

import { useCallback } from "react";

type QuantityFillerProps = {
	value: number;
	onChange: (next: number) => void;
	min?: number;
	max?: number;
};

const clamp = (value: number, min: number, max?: number) => {
	if (max != null) return Math.max(min, Math.min(max, value));
	return Math.max(min, value);
};

const QuantityFiller = ({ value, onChange, min = 1, max }: QuantityFillerProps) => {
	const decrease = useCallback(() => {
		onChange(clamp(value - 1, min, max));
	}, [value, onChange, min, max]);

	const increase = useCallback(() => {
		onChange(clamp(value + 1, min, max));
	}, [value, onChange, min, max]);

	return (
		<div className="w-full flex-1 flex justify-evenly border-2 p-5 border-gray-400 text-gray-800 select-none">
			<button type="button" onClick={decrease} aria-label="Decrease quantity">-</button>
			<div>{value.toString().padStart(2, "0")}</div>
			<button type="button" onClick={increase} aria-label="Increase quantity">+</button>
		</div>
	)
}

type SmallQuantityProps = {
	value: number;
	onChange?: (next: number) => void;
	min?: number;
	max?: number;
}

export const QuantityFiller_small = ({ value, onChange, min = 0, max }: SmallQuantityProps) => {
	const decrease = useCallback(() => {
		onChange?.(clamp(value - 1, min, max));
	}, [value, onChange, min, max]);

	const increase = useCallback(() => {
		onChange?.(clamp(value + 1, min, max));
	}, [value, onChange, min, max]);

	return (
		<div className="w-full flex-1 flex justify-evenly border-2 p-2 border-my_green text-lg select-none">
			<button type="button" onClick={decrease} aria-label="Decrease quantity">-</button>
			<div>{value.toString().padStart(2, "0")}</div>
			<button type="button" onClick={increase} aria-label="Increase quantity">+</button>
		</div>
	)
}

export default QuantityFiller;