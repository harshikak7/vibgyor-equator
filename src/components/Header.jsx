import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import logo from '../assets/logo.png';

const WHATSAPP_NUMBER = (
  import.meta.env.VITE_WHATSAPP_NUMBER || ''
).replace(/\D/g, '');

const waLink = (message) => {
  const text = encodeURIComponent(message);

  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
};

// Only these three items belong inside Rare Finds.
const rareFinds = [
  { label: 'Coins', path: '/rare-finds/coins' },
  // { label: 'Banknotes', path: '/rare-finds/banknotes' },
  { label: 'Stamps', path: '/rare-finds/stamps' },
];

const navLinkClass = ({ isActive }) =>
  `nav-link relative py-2 text-[12px] tracking-wide transition-colors duration-300 ${
    isActive
      ? 'text-[#6C151E] active'
      : 'text-[#0F3D3A] hover:text-[#6C151E]'
  }`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [rareFindsOpen, setRareFindsOpen] = useState(false);

  const closeMenus = () => {
    setMenuOpen(false);
    setRareFindsOpen(false);
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="flex min-h-[32px] items-center justify-between bg-[#0F3D3A] px-[7%] py-2 text-[9px] tracking-[0.13em] text-[#F5DABF] max-[720px]:px-[5%]">
        <span>VIBGYOR EQUATOR</span>

        <span className="opacity-80 max-[520px]:hidden">
          A cabinet of curiosities, in Mumbai
        </span>

        <a
          href="#contact"
          className="inline-flex items-center gap-1 transition-colors hover:text-white"
        >
          Enquire with us <ArrowUpRight size={12} />
        </a>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-[#0F3D3A]/15 bg-[#F5DABF]">
        <div className="relative mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-[7%] max-[1000px]:px-[5%] max-[720px]:h-[72px]">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenus}
            aria-label="Vibgyor Equator homepage"
            className="flex shrink-0 items-center z-10"
          >
            <img
              src={logo}
              alt="Vibgyor Equator"
              className="h-auto max-h-[40px] w-auto max-w-[180px] object-contain max-[720px]:max-h-[40px] max-[720px]:max-w-[145px]"
            />
          </Link>

          {/* Desktop navigation - Centered via absolute positioning */}
          <nav className="hidden min-[721px]:absolute min-[721px]:left-1/2 min-[721px]:top-1/2 min-[721px]:-translate-x-1/2 min-[721px]:-translate-y-1/2 min-[721px]:flex items-center gap-8 max-[1100px]:gap-5">

            {/* Rare Finds dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setRareFindsOpen(true)}
              onMouseLeave={() => setRareFindsOpen(false)}
            >
              <button
                type="button"
                onClick={() =>
                  setRareFindsOpen((previous) => !previous)
                }
                onFocus={() => setRareFindsOpen(true)}
                aria-expanded={rareFindsOpen}
                aria-haspopup="true"
                className="flex items-center gap-2 py-4 text-[12px] tracking-wide text-[#0F3D3A] transition-colors hover:text-[#6C151E]"
              >
                Rare Finds

                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    rareFindsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {rareFindsOpen && (
                <div className="absolute left-0 top-full z-50 w-[220px] border border-[#0F3D3A]/15 bg-[#F5DABF] py-3 shadow-xl">
                  <p className="px-5 pb-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-[#6C151E]">
                    Explore rare finds
                  </p>

                  {rareFinds.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className="block px-5 py-3 text-[12px] text-[#0F3D3A] transition-colors hover:bg-[#0F3D3A]/10 hover:text-[#6C151E]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/gems-jewellery"
              className={navLinkClass}
              onClick={closeMenus}
            >
              Gems & Jewellery
            </NavLink>

            <NavLink
              to="/antiques"
              className={navLinkClass}
              onClick={closeMenus}
            >
              Antiques
            </NavLink>

            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={closeMenus}
            >
              Contact
            </NavLink>
          </nav>

          {/* Right-side actions */}
          <div className="ml-auto flex shrink-0 items-center gap-3 z-10">
            {/* Enquiry button */}
            <a
              href={waLink(
                'Hello Vibgyor Equator, I would like to enquire about your collection.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#6C151E] px-4 py-3 text-[10px] tracking-wide text-[#6C151E] transition-colors hover:bg-[#6C151E] hover:text-[#F5DABF] max-[720px]:px-3 max-[720px]:py-2 max-[720px]:text-[9px]"
            >
              <span>Start an enquiry</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              className="hidden rounded p-2 text-[#0F3D3A] max-[720px]:block"
              onClick={() => {
                setMenuOpen((previous) => !previous);
                setRareFindsOpen(false);
              }}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>

        </div>

        {/* Mobile navigation dropdown */}
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="absolute left-0 top-full w-full border-b border-[#0F3D3A]/15 bg-[#F5DABF] px-[5%] pb-5 shadow-lg min-[721px]:hidden"
          >
            <div className="border-b border-[#0F3D3A]/15">
              <button
                type="button"
                onClick={() =>
                  setRareFindsOpen((previous) => !previous)
                }
                aria-expanded={rareFindsOpen}
                className="flex w-full items-center justify-between py-4 text-left text-[13px] text-[#0F3D3A]"
              >
                Rare Finds

                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    rareFindsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {rareFindsOpen && (
                <div className="mb-3 border-l border-[#6C151E] pl-4">
                  {rareFinds.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMenus}
                      className="block py-3 text-[12px] text-[#0F3D3A] hover:text-[#6C151E]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gems-jewellery"
              onClick={closeMenus}
              className="block border-b border-[#0F3D3A]/15 py-4 text-[13px] text-[#0F3D3A]"
            >
              Gems & Jewellery
            </Link>

            <Link
              to="/antiques"
              onClick={closeMenus}
              className="block border-b border-[#0F3D3A]/15 py-4 text-[13px] text-[#0F3D3A]"
            >
              Antiques
            </Link>

            <Link
              to="/contact"
              onClick={closeMenus}
              className="block py-4 text-[13px] text-[#0F3D3A]"
            >
              Contact
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}