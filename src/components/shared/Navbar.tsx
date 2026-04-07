"use client";

import { logout } from "@/redux/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Icons } from "../../utils/icons";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Nav links: use `hash` for sections on the homepage, `href` for separate pages
  const navLinks = [
    { href: "#features", hash: "features", label: "Features" },
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHasScrolled(y > 20);
      if (y > 500) {
        const isScrollingUp = y < lastScrollY.current;
        setVisible(isScrollingUp);
      } else {
        setVisible(true);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // After navigating to homepage, scroll to any pending hash target
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      // Small delay to let the page render
      setTimeout(() => {
        const elem = document.getElementById(targetId);
        if (elem) {
          window.scrollTo({
            top: elem.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [pathname]);

  const smoothScrollTo = (targetId: string) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      window.scrollTo({
        top: elem.offsetTop - 80,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; hash?: string; label: string },
  ) => {
    // If link has a hash target (it's a homepage section)
    if (link.hash) {
      e.preventDefault();
      if (pathname === "/") {
        // Already on homepage — just smooth scroll
        smoothScrollTo(link.hash);
      } else {
        // On another page — navigate to homepage with hash
        router.push(`/#${link.hash}`);
      }
      return;
    }

    // For hash-only links like #cta
    if (link.href.startsWith("#")) {
      e.preventDefault();
      if (pathname === "/") {
        smoothScrollTo(link.href.replace("#", ""));
      } else {
        router.push(`/${link.href}`);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
    toast.success("Logout successful!");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white border-b border-slate-100 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${hasScrolled ? "py-3 shadow-[0_1px_15px_rgba(0,0,0,0.04)]" : "py-3"}`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-24 h-11 md:w-28 md:h-12 relative transition-transform hover:scale-105 duration-300">
            <Image
              src="/nav-logo.png"
              alt="Logo Icon"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="text-[15px] font-bold transition-all duration-200 text-slate-600 hover:text-[#3da1ff]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link
                href="/login"
                className="bg-[#3da1ff] text-white text-[15px] font-bold px-6 py-2.5 rounded-[12px] hover:bg-blue-500 transition-all shadow-lg shadow-blue-400/10 active:scale-95"
              >
                Login
              </Link>
              <Link
                href="/#cta"
                onClick={(e) =>
                  handleLinkClick(e, {
                    href: "#cta",
                    hash: "cta",
                    label: "Get Started Free",
                  })
                }
                className="text-slate-800 text-[14px] font-bold px-6 py-2.5 rounded-[12px] border border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
              >
                Get Started Free
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="bg-[#3da1ff] text-white text-[14px] font-bold px-6 py-2.5 rounded-[12px] hover:bg-blue-500 transition-all shadow-lg shadow-blue-400/10 active:scale-95"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all"
              >
                <Icons.LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-600 focus:outline-none"
        >
          {isOpen ? (
            <Icons.X className="w-6 h-6" />
          ) : (
            <Icons.Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-slate-100 absolute top-full left-0 right-0 shadow-xl"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-lg font-bold text-slate-600"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#3da1ff] text-white text-center font-bold py-4 rounded-xl"
                >
                  Login
                </Link>
                <Link
                  href="/#cta"
                  onClick={(e) =>
                    handleLinkClick(e, {
                      href: "#cta",
                      hash: "cta",
                      label: "Get Started Free",
                    })
                  }
                  className="text-slate-800 text-center font-bold py-4 border border-slate-300 rounded-xl"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
