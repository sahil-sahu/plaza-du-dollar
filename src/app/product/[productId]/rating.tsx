import { Star, StarHalf } from "lucide-react";

const Rating = ({rate, review}: {rate: number; review:number;}) =>{
    const stars = [];
    for (let i = 1; i < rate; i++) {
        stars.push(<Star fill="var(--my-green)" color="var(--my-green)" key={i} />);
    }
    if (rate % 1 >= 0.5) {
        stars.push(<StarHalf fill="var(--my-green)" color="var(--my-green)" key={rate} />);
    }
    return (
        <div className="text-sm flex gap-5 py-2">
            <div className="flex items-center gap-1">
                {stars}
            </div>
            <div className="text-gray-500">
                ({review} User Feedback)
            </div>
        </div>
    )
}

export default Rating;