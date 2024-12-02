import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { FaChevronDown } from "react-icons/fa6";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

import { CategoryList } from "../components";
import FooterLogos from "./FooterLogos";

const socialIcons = [
  { icon: FaFacebookF, link: "#" },
  { icon: FaInstagram, link: "#" },
];

const Footer = () => {
  const [open, setOpen] = useState(null);

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  return (
    <footer className="w-full p-6 md:p-10 font-sans border-t mt-10 h-max self-end pb-32 md:pb-10">
      <div className="max-w-[1240px] mx-auto sm:hidden">
        <div className="flex items-center gap-4 mt-5">
          {socialIcons.map((social, idx) => (
            <a
              href={social.link}
              key={idx}
              className="mr-3 text-2xl text-black bg-gray-50 p-2 rounded-full hover:text-gray-500 transition-all duration-300"
            >
              <social.icon />
            </a>
          ))}
        </div>
        <Accordion
          open={open === "categories"}
          icon={
            <FaChevronDown
              className={`${open === "categories" ? "rotate-180" : ""} `}
            />
          }
        >
          <AccordionHeader
            onClick={() => handleOpen("categories")}
            className="text-base"
          >
            კატეგორიები
          </AccordionHeader>
          <AccordionBody>
            <CategoryList />
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === "contact"}
          icon={
            <FaChevronDown
              className={`${open === "contact" ? "rotate-180" : ""} `}
            />
          }
        >
          <AccordionHeader
            onClick={() => handleOpen("contact")}
            className="text-base"
          >
            დაგვიკავშირდით
          </AccordionHeader>
          <AccordionBody>
            <div className="px-5">
              <p className="mb-2">032 2 00 08 08</p>
              <a
                href="mailto:info@vendoo.ge"
                className="font-bold text-black hover:underline"
              >
                info@vendoo.ge
              </a>
            </div>
          </AccordionBody>
        </Accordion>
      </div>

      <div className="hidden sm:flex max-w-[1240px] mx-auto justify-between flex-wrap mb-10">
        <div className="flex-1 min-w-[200px] px-5 text-black">
          <h4 className="font-bold mb-2">კატეგორიები</h4>
          <CategoryList />
        </div>

        <div className="px-5">
          <h4 className="font-bold mb-2">დაგვიკავშირდით</h4>
          <p className="mb-2">032 2 00 08 08</p>
          <a
            href="mailto:info@vendoo.ge"
            className="font-bold text-black hover:underline"
          >
            info@vendoo.ge
          </a>
          <div className="flex items-center gap-4 mt-5">
            {socialIcons.map((social, idx) => (
              <a
                href={social.link}
                key={idx}
                className="mr-3 text-2xl text-black bg-gray-50 p-2 rounded-full hover:text-gray-500 transition-all duration-300"
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-max max-w-[1240px] md:mx-auto sm:border-t border-gray-300 pt-5 flex flex-col justify-between md:items-center gap-6">
        <div className="flex flex-col md:flex-row gap-2 md:gap-6 md:text-base text-sm">
          <a
            href="#"
            className="text-black hover:text-gray-700 md:underline underline-offset-4"
          >
            წესები და პირობები
          </a>
          <a
            href="#"
            className="text-black hover:text-gray-700 md:underline underline-offset-4"
          >
            კონფიდენციალურობის პოლიტიკა
          </a>
        </div>
        <FooterLogos />
        <div className="text-center text-sm text-gray-600">
          ©2024 ყველა უფლება დაცულია
        </div>
      </div>
    </footer>
  );
};

export default Footer;
