/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Info,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FindCareCategory from "./nav-component/find-care-category";
import FindJobCategory from "./nav-component/find-job-category";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false); // Modal state

  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const role = session?.user?.role;

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const data = await response.json();
          if (data.success) {
            setUserData(data.data);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [token]);

  // Conditional nav items based on role
  const getNavItems = () => {
    // If user is logged in and has a role
    if (session && role) {
      if (role === "find care") {
        // Show only Find Jobs for care seekers
        return [
          {
            title: "Parent",
            content: <FindJobCategory />,
          },
        ];
      } else if (role === "find job") {
        // Show only Find Care for job seekers
        return [
          {
            title: "Find Trusted Care",
            content: <FindCareCategory />,
          },
        ];
      }
    }

    // Default: Show both for non-logged in users or other roles
    return [
      {
        title: "Parent",
        content: <FindCareCategory />,
      },
      {
        title: "Find Trusted care",
        content: <FindJobCategory />,
      },
    ];
  };

  const navItems = getNavItems();

  const navbarClasses = `w-full fixed z-50 top-0 border-b border-slate-200/80 bg-white/95 backdrop-blur transition-all duration-300 ${
    scrolled ? "shadow-sm" : "shadow-none"
  }`;

  const textColorClasses = "text-slate-900";

  const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return session?.user?.email?.[0].toUpperCase() || "U";
  };

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Image
                src="/jetset-logo.webp"
                alt="Logo"
                width={1000}
                height={1000}
                className="object-cover h-[120px] w-[120px]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div
            className={`hidden items-center gap-8 lg:flex ${textColorClasses}`}
          >
            {navItems.map((item) => (
              <DropdownMenu
                key={item.title}
                modal={false}
                onOpenChange={(open) => {
                  setOpenDropdown(open ? item.title : null);
                }}
              >
                <DropdownMenuTrigger className="flex items-center gap-1 font-medium transition-colors hover:opacity-80 focus:outline-none">
                  {item.title}
                  {openDropdown === item.title ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="mt-2">
                  {item.content}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            <div className="flex items-center space-x-5">
              {session ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 focus:outline-none">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarImage
                          src={userData?.profileImage || ""}
                          alt={userData?.firstName || "User"}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className={`h-4 w-4 ${textColorClasses}`} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-black">
                      <p className="text-sm font-medium">
                        {userData?.firstName
                          ? `${userData.firstName} ${userData.lastName || ""}`
                          : session.user?.email}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {userData?.role || "User"}
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      className={`text-sm bg-inherit font-medium ${textColorClasses} hover:bg-slate-100 hover:text-slate-900`}
                    >
                      Log in
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsJoinModalOpen(true)}
                    className="rounded-3xl bg-[#2ed3c7] px-6 text-slate-950 hover:bg-[#22c1b5]"
                  >
                    Join Now
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-10 w-10 p-0 ${textColorClasses} hover:bg-slate-100`}
                >
                  {isOpen ? (
                    <X className="h-7 w-7" />
                  ) : (
                    <Menu className="h-7 w-7" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center">
                      <Image
                        src="/jetset-logo.webp"
                        alt="Logo"
                        width={1000}
                        height={1000}
                        className="mr-3 h-[100px] w-[100px] object-cover"
                      />
                      {/* <span>Menu</span> */}
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col space-y-6">
                  {session && (
                    <div className="flex items-center gap-3 pb-4 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={userData?.profileImage} />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {userData?.firstName || "User"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {userData?.role}
                        </p>
                      </div>
                    </div>
                  )}
                  <Accordion type="single" collapsible className="w-full">
                    {navItems.map((item) => (
                      <AccordionItem key={item.title} value={item.title}>
                        <AccordionTrigger className="text-lg font-medium">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4">{item.content}</div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <div className="flex flex-col space-y-4 pt-4 border-t">
                    {!session ? (
                      <>
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="outline"
                            className="w-full text-slate-900 hover:text-slate-900"
                          >
                            Log in
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            setIsOpen(false);
                            setIsJoinModalOpen(true);
                          }}
                          className="w-full rounded-3xl bg-[#2ed3c7] text-slate-950 hover:bg-[#22c1b5]"
                        >
                          Join Now
                        </Button>
                      </>
                    ) : (
                      <Button variant="destructive" onClick={() => signOut()}>
                        Log out
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Role Selection Modal for Registration */}
      <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader className="flex flex-col items-center justify-center text-center space-y-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Info className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              Get Started
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600">
              Choose how you want to use JetSet Cares
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-4 py-4">
            <button
              onClick={() => {
                setIsJoinModalOpen(false);
                router.push("/find-care/1?role=find care");
              }}
              className="flex-1 bg-white border-2 border-gray-200 hover:border-primary p-5 rounded-xl transition-all duration-200 hover:shadow-lg text-left group"
            >
              <h3 className="text-lg font-semibold text-[#0A0A23] mb-2">
                I&apos;m looking for a caregiver
              </h3>
              <p className="text-sm text-[#3B3B4F] mb-3">
                Find trusted care providers in your area.
              </p>
              <div className="w-full py-2 px-4 text-white text-sm rounded-full font-bold bg-primary group-hover:bg-primary/90 text-center">
                Parent &rarr;
              </div>
            </button>
            <button
              onClick={() => {
                setIsJoinModalOpen(false);
                router.push("/find-job/1?role=find job");
              }}
              className="flex-1 bg-white border-2 border-gray-200 hover:border-primary p-5 rounded-xl transition-all duration-200 hover:shadow-lg text-left group"
            >
              <h3 className="text-lg font-semibold text-[#0A0A23] mb-2">
                I&apos;m looking for a caregiving job
              </h3>
              <p className="text-sm text-[#3B3B4F] mb-3">
                Create a profile and find caregiving jobs.
              </p>
              <div className="w-full py-2 px-4 text-white text-sm rounded-full font-bold bg-primary group-hover:bg-primary/90 text-center">
                Find Trusted Care &rarr;
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
