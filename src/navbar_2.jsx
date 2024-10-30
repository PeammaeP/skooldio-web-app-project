import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Logo from "./assets/Storefront_2.png";
import Search from "./assets/search.png";

const navigation = [
  // { name: "WDB", href: "#", current: true },
  { name: "Men", href: "#Men", current: false },
  { name: "Women", href: "#Women", current: false },
  { name: "Kids", href: "#Kids", current: false },
  { name: "Shoes", href: "#Shoes", current: false },
  { name: "Assessories", href: "#Assessories", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-customGray w-[1920px] h-[60px] flex justify-between gap-0">
      <div>
        <div className="grid gap-x-10 gap-y-0 grid-cols-12">
            <div className="col-span-10 flex items-center justify-start sm:items-stretch sm:justify-start m-[10px_100px]">
              <div className="flex flex-shrink-0 ">
                <img
                  alt="Your Company"
                  src={Logo}
                  className="h-9 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-2 flex items-center justify-end pr-0 sm:static sm:inset-auto sm:ml-6 sm:pr-0 m-[10px_75px]">
            <button
              type="button"
              className=" rounded-full  p-0 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute" />
              <span className="sr-only">View notifications</span>
              <img className="size-12" src={Search}/>
            </button>
            <button
              type="button"
              className=" rounded-full  p-0 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute" />
              <span className="sr-only">View notifications</span>
              <img className="size-12" src={Search}/>
            </button>
            <button
              type="button"
              className=" rounded-full  p-0 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute" />
              <span className="sr-only">View notifications</span>
              <img className="size-12" src={Search}/>
            </button>
            <button
              type="button"
              className=" rounded-full  p-0 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute" />
              <span className="sr-only">View notifications</span>
              <img className="size-12" src={Search}/>
            </button>
            </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
