import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Overview", href: "/" },
  { name: "Emissions", href: "/emissions" },
  { name: "Parameters", href: "/parameters" },
  { name: "Simulations", href: "/simulations" },
  { name: "FAQ", href: "/faq" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const location = useLocation(); // Get the current path

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b lightGrey bg-white sticky top-0 z-50">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
                <div className="flex h-16 items-center justify-between relative">
                  {/* Logo Section */}
                  <div className="flex shrink-0 items-center">
                    <a href="https://liberdus.com" target="_blank" rel="noopener noreferrer">
                   <img
                        alt="liberdus_logo"
                        src="/tokenomics/liberdus_logo.png"
                        className="block h-10 w-auto lg:hidden"
                      />
                      <img
                        alt="liberdus_logo"
                        src="/tokenomics/liberdus_logo.png"
                        className="hidden h-10 w-auto lg:block"
                      />
                    </a>
                  </div>

                  {/* Desktop Navigation Items */}
                  <div className="hidden sm:flex sm:flex-1 sm:justify-end h-full">
                    {navigation.map((item) => (
                      <div key={item.name} className="relative flex items-center h-full">
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "text-darkGrey" // Active link styles
                              : "text-lightGrey hover:text-gray-700", // Inactive link styles
                            "relative text-center px-6 text-sm font-medium h-full flex items-center"
                          )}
                        >
                          {item.name}
                        </Link>
                        {/* Full-Width Bottom Border */}
                        <span
                          className={classNames(
                            location.pathname === item.href
                              ? "absolute bottom-0 left-0 right-0 h-[2px] bg-purple" // Active border styles
                              : "absolute bottom-0 left-0 right-0 h-[2px] bg-transparent hover:bg-gray-300" // Inactive border styles
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="sm:hidden">
                    <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </DisclosureButton>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Panel */}
              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      to={item.href}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-purple text-white" // Active mobile link styles
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900", // Inactive mobile link styles
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Content Section */}
        <div className="lg:py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
            
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
