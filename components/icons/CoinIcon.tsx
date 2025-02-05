import { HtmlHTMLAttributes } from "react";

import Image from "next/image";

interface IconProps {
className?: string
}

const CoinIcon: React.FC<IconProps> = ({className}) => {
 return (
  <Image
   src="/whattapcoinmin.png"
   alt="alt"
   width={1000}
   height={1000}
   className={className}
  />
 );
};

export default CoinIcon;
