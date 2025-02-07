import React, { useState } from "react";
import logo from "@/assets/images/logo-white.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { MdLogin } from "react-icons/md";
import SearchBox from "./SearchBox";
import { RouteBlogAdd, RouteIndex, RouteProfile, RouteSignIn } from "@/helpers/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import usericon from "@/assets/images/user.png";
import { CiUser } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { showToast } from "@/helpers/showToast";
import { removerUser } from "@/redux/user/user.slice";
import { getEnv } from "@/helpers/getEnv";
import { IoMdSearch } from "react-icons/io";
import { useSidebar } from "./ui/sidebar";
import { AiOutlineMenu } from "react-icons/ai";

const Topbar = () => {
  const { toggleSidebar } = useSidebar()
  const [showSearch, setShowSearch] = useState(false)
  const user = useSelector((state) => state.user);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleLogout =async () => {
    try {
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/logout`, {
                method: 'get',
                credentials: 'include',
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            dispath(removerUser(data.user))
            navigate(RouteIndex)
    
            showToast('success', data.message)
        } catch (error) {
            console.log(error)
            showToast('error', error.message)
        } 
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch)
}

  return (
    <div className="flex items-center justify-between h-16 fixed w-full bg-white z-20 px-5 border-b ">
      <div className='flex justify-center items-center gap-2'>
                <button onClick={toggleSidebar} className='md:hidden' type='button'>
                    <AiOutlineMenu />
                </button>
                <Link to={RouteIndex} className="flex items-center py-4 px-2 ">
                    <img src={logo} className='md:w-auto size-10 object-cover  '  />
                    <span className="font-bold text-purple-800  text-2xl">Blog World</span>
                </Link>
            </div>
      <div className="w-[40%]">
                <div className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
      </div>
      <div className='flex items-center gap-5'>

                <button onClick={toggleSearch} type='button' className='md:hidden block'>
                    <IoMdSearch size={25} />
                </button>
        {!user.isLoggedIn ? (
          <Button asChild className="rounded-full">
            <Link to={RouteSignIn}>
              <MdLogin />
              Sign In
            </Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.user.avatar || usericon} className="object-cover"/>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <p>{user.user.name}</p>
                <p className="text-xs text-slate-500">{user.user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to={RouteProfile}>
                  <CiUser />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className='cursor-pointer'>
                <Link to={RouteBlogAdd}>
                  <CiSquarePlus />
                  Create Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className='cursor-pointer'>
                
                  <IoIosLogOut color="red" />
                  Logout
                
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Topbar;
