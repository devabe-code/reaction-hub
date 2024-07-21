"use client"
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/navbar";
import Link from 'next/link';
import { ThemeSwitcher } from './theme_toggle';
import logo from '@/public/logos/site_logo_dark_mode.svg'
import Search from './search';
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { FaDatabase, FaDiscord, FaHouse, FaMagnifyingGlass, FaPatreon, FaStar, FaTwitter, FaYoutube } from 'react-icons/fa6';

interface MenuProps {
  name: string,
  icon: ReactNode,
}

const SiteNav = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {title: "Latest Reactions", icon: <FaStar />, page: '/latest_reactions'},
    {title: "All Reactions", icon: <FaDatabase />, page: '/all_anime'},
    {title:'', icon:<Divider className='' />, page:''},
    {title: "YouTube", icon: <FaYoutube />, page: 'https://www.youtube.com/@KrowTV'},
    {title: "Twitter", icon: <FaTwitter />, page: 'https://x.com/krowbro'},
    {title: "Patreon", icon: <FaPatreon />, page: 'https://www.patreon.com/krowtv'},
    {title: "Discord", icon: <FaDiscord />, page: 'https://discord.gg/Jtdwta2'}
  ];

  return (
    <Navbar position='sticky' 
            isBordered
            isMenuOpen={isMenuOpen} 
            onMenuOpenChange={setIsMenuOpen} 
            className=''>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        <NavbarBrand className=''>
          <Link href='/'>
            <Image src={logo} alt='site-logo' className='' priority={true} />
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Button onClick={onOpen} variant='light'>
          <MagnifyingGlassIcon />
          Find a Video...
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}>
          <ModalContent>
            {
              (onClose) => (
                <>
                  <ModalHeader className='flex flex-col gap-1'>Reaction Hub Database</ModalHeader>
                  <ModalBody>
                    <Search closeModal={onClose}/>
                  </ModalBody>
                </>
              )
            }
          </ModalContent>
        </Modal>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex flex-row items-center">
          <Button isIconOnly variant='light' onClick={onOpen} className='sm:hidden'>
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
          <NavbarMenuItem 
            key={`${item}-${index}`}>
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
  )
}

export default SiteNav