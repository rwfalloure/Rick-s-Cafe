"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, Utensils, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#timeline", label: "Timeline", icon: Clock },
  { href: "/tacos", label: "Tacos", icon: Utensils },
  { href: "/about", label: "About", icon: User },
];

// Pages that open with a dark hero gradient behind the nav bar
const DARK_HERO_PAGES = ["/", "/tacos"];

export function Navigation() {
  const pathname = usePathname();
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const [overHero, setOverHero] = useState(hasDarkHero);

  useEffect(() => {
    if (!hasDarkHero) {
      setOverHero(false);
      return;
    }
    const onScroll = () => {
      setOverHero(window.scrollY < window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  const lightText = overHero;

  return (
    <>
      {/* Desktop: Fixed top bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden md:block backdrop-blur-sm transition-colors duration-500",
          lightText ? "bg-transparent" : "bg-[#E8C587]/85"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="font-heading text-2xl font-bold tracking-tight transition-colors duration-500"
              style={{ color: lightText ? "#f5e8d0" : "var(--foreground)" }}
            >
              Rick&apos;s Caf&eacute;
            </span>
            <span
              className="font-mono text-xs transition-colors duration-500"
              style={{ color: lightText ? "rgba(245,232,208,0.6)" : "var(--muted)" }}
            >
              HTX
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative text-sm tracking-wide transition-colors duration-500"
                  style={{
                    color: isActive
                      ? lightText ? "#f5e8d0" : "var(--foreground)"
                      : lightText ? "rgba(245,232,208,0.5)" : "rgba(26,46,24,0.45)",
                  }}
                >
                  {item.label}
                  {isActive && (
                    <div
                      className="absolute -bottom-1 left-0 right-0 h-px transition-colors duration-500"
                      style={{
                        background: lightText ? "rgba(245,232,208,0.55)" : "var(--accent)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile: Bottom-docked navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-accent-gold/25 bg-background/90 backdrop-blur-xl rounded-t-lg md:hidden">
        <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                  isActive ? "text-foreground" : "text-foreground/30"
                )}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className="font-mono text-[10px] uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
