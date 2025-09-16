import Image from "next/image";
import { Button } from "./ui/custom/button";
import HeroImage from "@/app/assets/hero-image.png";
import Star from "@/app/assets/star.svg";
import StartSM from "@/app/assets/startsm.svg";
import { Separator } from "./ui/separator";
import Versace from "@/app/assets/versace.svg";
import Zara from "@/app/assets/zara.svg";
import Gucci from "@/app/assets/gucci.svg";
import Prada from "@/app/assets/prada.svg";
import CK from "@/app/assets/ck.svg";

export default function Hero() {
  return (
    <section>
      <section className="bg-[#F2F0F1] h-[600px]">
        <div className="app-container flex  items-center justify-center mt-6">
          <div className="mt-12 w-[40%]">
            <h1 className="text-[60px] leading-[64px]">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>
            <p className="my-8 text-grayish">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <Button label="Shop Now" small classNames="" />

            <div className="flex items-center gap-3 mt-6">
              <div>
                <p className="text-[40px] font-semibold">200+</p>
                <p className="text-grayish">International Brands</p>
              </div>
              <Separator orientation="vertical" className="bg-red-500" />
              <div>
                <p className="text-[40px] font-semibold">2,000+</p>
                <p className="text-grayish">High quality product</p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <p className="text-[40px] font-semibold">30,000+</p>
                <p className="text-grayish">Happy customers</p>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="w-[60%]">
            <Image
              src={HeroImage}
              alt="hero image"
              className="object-fill h-[500px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-black py-6">
        <div className=" app-container flex items-center justify-between">
          <Image src={Versace} alt="hero image" className="" />
          <Image src={Zara} alt="hero image" className="" />
          <Image src={Gucci} alt="hero image" className="" />
          <Image src={Prada} alt="hero image" className="" />
          <Image src={CK} alt="hero image" className="" />
        </div>
      </section>
    </section>
  );
}
