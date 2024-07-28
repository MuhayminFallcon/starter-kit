import React from 'react';
import { IoCallOutline, IoLocationOutline, IoMailOutline } from "react-icons/io5";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import  useDeviceInfo  from '@/hooks/useDeviceInfo';

type Props = {
  footerData: {
    logo: string;
    sections: {
      title: string;
      links: { text: string; href: string }[];
    }[];
    socialMediaLinks: string[];
    contactNumber: string;
    copyright: string;
    location: string;
    emailContact: string;
    phoneContact: string;
    socialLinks: { href: string; icon: string }[];
  };
};

const getSocialIcon = (url: string) => {
  if (url.includes('facebook.com')) {
    return <FaFacebook />;
  } else if (url.includes('twitter.com')) {
    return <FaTwitter />;
  } else if (url.includes('instagram.com')) {
    return <FaInstagram />;
  }
  return null;
};

function Footer({ footerData }: Props) {
  const { isMobile } = useDeviceInfo();

  return (
    <div className="text-white bg-FooterBg w-full mt-14 px-4 sm:px-16">
      <div className="py-11 flex flex-col gap-5">
        {/* Contact Information Section */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2">
            <IoCallOutline />
            <span>{"footerData.contactNumber"}</span>
          </div>
          <div className="flex items-center gap-2">
            <IoMailOutline />
            <span>{"footerData.emailContact"}</span>
          </div>
          <div className="flex items-center gap-2">
            <IoLocationOutline />
            <span>{"footerData.location"}</span>
          </div>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex flex-col items-center justify-center text-white mt-10">
          {!isMobile && (
            <h2 className="uppercase text-[16px] font-light mb-4">
              Our Social Communities
            </h2>
          )}
          {/*<ul className="flex items-center gap-3">*/}
          {/*  {footerData.socialMediaLinks && footerData.socialMediaLinks.map((link, index) => (*/}
          {/*    <li key={index} className="cursor-pointer">*/}
          {/*      <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`Follow us on ${new URL(link).hostname}`}>*/}
          {/*        {getSocialIcon(link)}*/}
          {/*      </a>*/}
          {/*    </li>*/}
          {/*  ))}*/}
          {/*</ul>*/}
        </div>
      </div>
    </div>
  );
}

export default Footer;
