import { Link } from "react-router-dom";
import MaxWidthWrapper from "../utils/MaxWidthWrapper";

function Footer() {
  return (
    <footer className="w-full h-[300px] bg-white flex justify-center items-center ">
      <MaxWidthWrapper className="h-[200px]  flex justify-between p-5">
        <Link to={"/"}>
          <img
            src="/logo.svg"
            width={300}
            height={300}
            alt="singitronic logo"
            className=""
          />
        </Link>
        <div>
          <h3 className="text-base font-bold leading-6 text-blue-600 mb-3">Sale</h3>
          <ul className="flex flex-col gap-y-1">
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Discounts
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              News
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Register Discounts
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold leading-6 text-blue-600 mb-3">
            About Us
          </h3>
          <ul className="flex flex-col gap-y-1">
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              About Singitronic
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Work With Us
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Company Profile
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold leading-6 text-blue-600 mb-3">
            Buying
          </h3>
          <ul className="flex flex-col gap-y-1">
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Singitronic Loyalty Card
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Terms Of Use
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Privacy Policy
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Complaints
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Partners
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-bold leading-6 text-blue-600 mb-3">
            Support
          </h3>
          <ul className="flex flex-col gap-y-1">
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              Contact
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              How to Buy a Singitronic
            </li>
            <li className="text-sm leading-6 text-black hover:text-gray-700">
              FAQ's
            </li>
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}

export default Footer;
