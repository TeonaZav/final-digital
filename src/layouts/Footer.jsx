import React from "react";

const navigationData = [
  {
    title: "ნავიგაცია",
    links: [
      "პარამეტრები",
      "მისამართები",
      "შეკვეთები",
      "ბარათები",
      "ჩვენ შესახებ",
      "აქციები",
      "ბლოგი",
      "გაყიდე ჩვენთან",
    ],
  },
  {
    title: "დახმარება",
    links: [
      "ხშირად დასმული კითხვები",
      "ანონიმური უკუკავშირი",
      "მესიჯის მიწერა",
      "შეფასება",
      "032 2 00 08 08",
      "Info@vendoo.ge",
    ],
  },
  {
    title: "კატეგორიები",
    links: [
      "ტექნიკა",
      "წვრილი ტექნიკა",
      "სამკაულები & აქსესუარები",
      "ეზო და დასვენება",
      "ფიტნესი & იოგა",
      "ავეჯი",
      "საყოფაცხოვრებო ქიმია",
      "მუსიკალური ინსტრუმენტები",
      "დედა და ბავშვი",
      "ბარი და სხვა",
      "სპორტი და დასვენება",
    ],
  },
];

const socialIcons = [
  { icon: "fab fa-facebook", link: "#" },
  { icon: "fab fa-instagram", link: "#" },
];

const logos = [
  { src: "path_to_logo1", alt: "Logo 1" },
  { src: "path_to_logo2", alt: "Logo 2" },
  { src: "path_to_logo3", alt: "Logo 3" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-10 font-sans">
      <div className="flex flex-wrap justify-between mb-10 gap-6">
        {navigationData.map((column, index) => (
          <div key={index} className="flex-1 min-w-[200px] px-5 text-black">
            <h4 className="font-bold mb-2">{column.title}</h4>
            <ul className="space-y-3">
              {column.links.map((link, idx) => (
                <li key={idx} className="text-sm leading-6">
                  <a
                    href="#"
                    className="transition hover:underline underline-offset-4"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="px-5">
          <h4 className="font-bold mb-2">დაგვიკავშირდით</h4>
          <p className="mb-2">032 2 00 08 08</p>
          <a
            href="mailto:info@vendoo.ge"
            className="text-black font-bold hover:underline"
          >
            info@vendoo.ge
          </a>
          <div className="flex mt-5">
            {socialIcons.map((social, idx) => (
              <a
                href={social.link}
                key={idx}
                className="text-2xl text-black mr-3"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-5 flex flex-wrap justify-between items-center gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <a href="#" className="text-black hover:underline">
            წესები და პირობები
          </a>
          <a href="#" className="text-black hover:underline">
            კონფიდენციალურობის პოლიტიკა
          </a>
        </div>

        <div className="flex justify-center items-center flex-wrap gap-4">
          {logos.map((logo, idx) => (
            <img
              src={logo.src}
              alt={logo.alt}
              key={idx}
              className="h-10 mx-2"
            />
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-5">
        ©2024 ყველა უფლება დაცულია
      </div>
    </footer>
  );
}
