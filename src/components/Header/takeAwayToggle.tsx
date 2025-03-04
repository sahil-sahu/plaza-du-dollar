import { Switch } from "@/components/ui/switch"

const TakeAwayToggle = () =>{
    return (
        <div className="flex justify-evenly gap-4 w-min">
            <span className="text-[#00BF63]">
                Takeaway
            </span>
            <Switch className="data-[state=checked]:bg-my_green"  />
            <span>
                Delivery
            </span>
        </div>
    );
}

export default TakeAwayToggle;