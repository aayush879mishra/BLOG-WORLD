import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import logo from '@/assets/images/logo-white.jpg'
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { RiBloggerLine } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { LuUsersRound } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUser } from "@/helpers/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helpers/getEnv";
import { useSelector } from "react-redux";

const AppSidebar = () => {
    const user = useSelector(state => state.user)
    const {data: categoryData} = useFetch(`${getEnv('VITE_API_BASE_URL')}/category/all-category`, {
        method: 'get',
        credential: 'include'
    })

  return (
    <Sidebar>
    <SidebarHeader>
        <Link to={RouteIndex} className="flex items-center py-4 px-2 ">
                            <img src={logo} className='md:w-auto size-10 object-cover  '  />
                            <span className="font-bold text-purple-800  text-2xl">Blog World</span>
                        </Link>
        
    </SidebarHeader>
    <SidebarContent className="bg-white list-none">
      <SidebarGroup>
        <SidebarMenuItem>
            <SidebarMenuButton>
                <IoHomeOutline />
                <Link to={RouteIndex}>Home</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>

        {user && user.isLoggedIn ?
        <>
        <SidebarMenuItem>
            <SidebarMenuButton>
            <RiBloggerLine />
                <Link to={RouteBlog}>Blogs</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
            <SidebarMenuButton>
            <FaRegCommentDots />
                <Link to={RouteCommentDetails}>Comments</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        </>
    :
    <></>
    }

    {
        user && user.isLoggedIn && user.user.role === "admin" ?
        <>
        <SidebarMenuItem>
            <SidebarMenuButton>
                <BiCategoryAlt />
                <Link to={RouteCategoryDetails}>Categories</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        
        <SidebarMenuItem>
            <SidebarMenuButton>
            <LuUsersRound />
                <Link to={RouteUser}>Users</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        </>
    :
    <></>
    }


        
        </SidebarGroup>

        <SidebarGroup>
            <SidebarGroupLabel>
                Categories
            </SidebarGroupLabel>
            <SidebarMenu>
        {categoryData && categoryData.category.length > 0 && categoryData.category.map((category) => (
            <SidebarMenuItem key={category._id}>
            <SidebarMenuButton>
            <GoDot />
                <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
        ))}
        
        </SidebarMenu>
        </SidebarGroup>
      
    </SidebarContent>
    
  </Sidebar>
  )
}

export default AppSidebar