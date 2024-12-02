import { Link } from "react-router-dom";

const logos = [
  {
    src: "/images/logos/tnet.svg",
    alt: "TNET",
    href: "#",
  },
  {
    src: "/images/logos/myauto.svg",
    alt: "MyAuto",
    href: "#",
  },
  {
    src: "/images/logos/myparts.svg",
    alt: "MyParts",
    href: "#",
  },
  {
    src: "/images/logos/myhome.svg",
    alt: "MyHome",
    href: "#",
  },
  {
    src: "/images/logos/mymarket.svg",
    alt: "MyMarket",
    href: "#",
  },
  {
    src: "/images/logos/SuperApp.svg",
    alt: "SuperApp",
    href: "#",
  },
  {
    src: "/images/logos/myshop.svg",
    alt: "MyShop",
    href: "#",
  },
  {
    src: "/images/logos/myshop.svg",
    alt: "Vendoo",
    href: "#",
  },
  {
    src: "/images/logos/tkt.svg",
    alt: "TKT.ge",
    href: "#",
  },
  {
    src: "/images/logos/swoop.svg",
    alt: "Swoop",
    href: "#",
  },
  {
    src: "/images/logos/livo.svg",
    alt: "Livo",
    href: "#",
  },
];

const FooterLogos = () => {
  return (
    <div className="w-full rounded-full flex border border-gray-200 h-[50px]">
      {logos.map((logo, index) => (
        <Link
          key={index}
          href={logo.href}
          className={`h-full lg:flex-1 first:bg-[#3c74ff] ${
            index !== 0 ? "hidden lg:inline-flex" : "inline-flex px-4 lg:px-0"
          } justify-center rounded-full`}
        >
          <img src={logo.src} alt={logo.alt} className="w-16" />
        </Link>
      ))}
    </div>
  );
};

export default FooterLogos;
