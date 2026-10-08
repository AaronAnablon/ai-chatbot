import { siteConfig } from "@/config/site";

type BrandProps = {
  className?: string;
};

const Brand = ({ className = "" }: BrandProps) => (
  <span className={`bg-gradient-to-r from-blue-500 to-white bg-clip-text font-bold text-transparent ${className}`}>
    {siteConfig.name}
  </span>
);

export default Brand;
