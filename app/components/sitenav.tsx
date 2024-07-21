'use client';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from 'next/link';
import { ThemeSwitcher } from './theme_toggle';
import logo from '@/public/logos/site_logo_dark_mode.svg';
import Search from './search';
import { Button, Divider } from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { FaDatabase, FaDiscord, FaHouse, FaMagnifyingGlass, FaPatreon, FaStar, FaTwitter, FaYoutube } from 'react-icons/fa6';

interface MenuProps {
  name: string,
  icon: ReactNode,
}

const SiteNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { title: "Latest Reactions", icon: <FaStar />, page: '/latest_reactions' },
    { title: "All Reactions", icon: <FaDatabase />, page: '/all_anime' },
    { title: '', icon: <Divider className='' />, page: '' },
    { title: "YouTube", icon: <FaYoutube />, page: 'https://www.youtube.com/@KrowTV' },
    { title: "Twitter", icon: <FaTwitter />, page: 'https://x.com/krowbro' },
    { title: "Patreon", icon: <FaPatreon />, page: 'https://www.patreon.com/krowtv' },
    { title: "Discord", icon: <FaDiscord />, page: 'https://discord.gg/Jtdwta2' }
  ];

  const handleSearchOpen = () => {
    if (isSearchOpen) {
      // Clear search values when closing
      const searchComponent = searchPanelRef.current?.querySelector('input');
      if (searchComponent) {
        searchComponent.value = '';
      }
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchPanelRef.current && !searchPanelRef.current.contains(event.target as Node)) {
      setIsSearchOpen(false);
      // Clear search values when closing
      const searchComponent = searchPanelRef.current?.querySelector('input');
      if (searchComponent) {
        searchComponent.value = '';
      }
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <>
      <Navbar position='sticky' isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className=''>
        <NavbarContent>
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
          <NavbarBrand className=''>
            <Link href='/'>
              <Image src={logo} alt='site-logo' className='' priority={true} />
            </Link>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <Button onClick={handleSearchOpen} variant='light'>
            <MagnifyingGlassIcon />
            Find a Video...
          </Button>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="flex flex-row items-center">
            <Button isIconOnly variant='light' onClick={handleSearchOpen} className='sm:hidden'>
              <FaMagnifyingGlass size={15} />
            </Button>
            <ThemeSwitcher />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className='lg:w-1/6'>
          <div id='menu-header' className='pb-10'>
            <h1 className="text-2xl font-bold uppercase pb-2">Menu</h1>
            <Divider />
          </div>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Link
                className="w-full inline-flex gap-4 items-center"
                color={
                  index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                }
                href={item.page}
              >
                {item.icon}
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>

      <div
        ref={searchPanelRef}
        className={`fixed top-0 left-0 right-0 bg-background shadow-lg z-50 p-4 transform transition-transform duration-300 ${
          isSearchOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Reaction Hub Database</h2>
          <button
            onClick={handleSearchOpen}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &#x2715;
          </button>
        </div>
        <Search closeModal={handleSearchOpen} />
      </div>
    </>
  );
}

export default SiteNav;
