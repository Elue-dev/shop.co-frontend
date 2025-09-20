import { Dispatch, SetStateAction } from "react";
import { Minus, Plus } from "lucide-react";
import AnimatedNumbers from "react-animated-numbers";

interface Props {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  stockQuantity: number;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
  stockQuantity,
}: Props) {
  const handleIncrement = () => {
    if (quantity < stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center ">
      <div className="bg-[#F0F0F0] rounded-full w-full py-[13px]">
        <div className="flex items-center justify-between px-4">
          <button
            onClick={handleDecrement}
            className="bg-transparent cursor-pointer"
          >
            <Minus size={20} />
          </button>

          <AnimatedNumbers
            useThousandsSeparator
            transitions={(index) => ({
              type: "spring",
              duration: index + 0.3,
            })}
            animateToNumber={quantity}
          />
          <button
            onClick={handleIncrement}
            className="bg-transparent cursor-pointer"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
