import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogPanel,
  // Disclosure,
  // DisclosureButton,
  // DisclosurePanel,
  // Popover,
  // PopoverButton,
  PopoverGroup,
  // PopoverPanel,
} from '@headlessui/react'
import {
  // ArrowPathIcon,
  Bars3Icon,
  // ChartPieIcon,
  // CursorArrowRaysIcon,
  // FingerPrintIcon,
  // SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
// import { 
//   ChevronDownIcon, 
//   PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useRouter } from '@tanstack/react-router'
import LOGO from "@assets/logo.svg"

// const products = [
//   { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
//   { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
//   { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
//   { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
//   { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
// ]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentLocation = useLocation()
  const [hideElement, setHideElement] = useState(false)

  useEffect(() => {
    setHideElement(currentLocation.pathname.includes('transactions') ? true : false)
  }, [currentLocation])

  const logo = LOGO

  return (
    <header className="bg-white bg-clip-border shadow-md">
      <nav aria-label="Global" className="mx-auto flex max-w-[1600px] items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="[&.active]:font-bold -m-1.5 p-1.5">
            <span className="sr-only">Smartwallet</span>
            <img
              alt="logo"
              src={logo}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              Product
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              <div className="p-4">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                    </div>
                    <div className="flex-auto">
                      <Link to={item.href} className="[&.active]:font-bold block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </Link>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                {callsToAction.map((item) => (
                  <Link key={item.name} to={item.href} className="[&.active]:font-bold flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100">
                    <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </PopoverPanel>
          </Popover> */}

          <Link to="/" className="[&.active]:font-bold text-sm/6 font-semibold text-gray-900">
            Inicio
          </Link>
          <Link to="/transactions" className="[&.active]:font-bold text-sm/6 font-semibold text-gray-900">
            Transacciones
          </Link>
          <Link to="/about" className="[&.active]:font-bold text-sm/6 font-semibold text-gray-900">
            Acerca De
          </Link>
        </PopoverGroup>
        <div hidden={hideElement} className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/signin" className="[&.active]:font-bold text-sm/6 font-semibold text-gray-900">
            Acceder <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="[&.active]:font-bold -m-1.5 p-1.5">
              <span className="sr-only">Smartwallet</span>
              <img
                alt="logo"
                src={logo}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure> */}
                <Link to="/" className="[&.active]:font-bold -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Inicio
                </Link>
                <Link to="/transactions" className="[&.active]:font-bold -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Transacciones
                </Link>
                <Link to="/about" className="[&.active]:font-bold -mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Acerca De
                </Link>
              </div>
              <div hidden={hideElement} className="py-6">
                <Link to="/signin" className="[&.active]:font-bold -mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                  Acceder
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
