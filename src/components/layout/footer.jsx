import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

function Footer() {
  return (
    <footer className="bg-primary-400 px-4 py-6 text-white">
      <div className="flex flex-col gap-4">
        Connect with us
        <div className="flex gap-4">
          <Icon className="size-6" icon="ic:baseline-facebook" />
          <Icon className="size-6" icon="mdi:instagram" />
          <Icon className="size-6" icon="hugeicons:new-twitter" />
          <Icon className="size-6" icon="mdi:linkedin" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="hover:underline">Privacy policy</div>
        <div className="ml-6 hover:underline">Terms and conditions</div>
        <div className="ml-6 hover:underline">Accessibility</div>
      </div>
    </footer>
  );
}

export default Footer;
