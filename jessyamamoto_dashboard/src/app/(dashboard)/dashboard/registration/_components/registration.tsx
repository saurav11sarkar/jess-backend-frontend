"use client"
import React from 'react'
import DynamicPageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, EyeIcon, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import RegisterDetails from './registerDetailsModal'

const servicesData = [
    { id: 1, name: "Caregiving", count: 10, date: "10/6/13", servicesName: "Caregiving", email: "caregiving@example.com", phoneNumber: "123-456-7890" },
    { id: 2, name: "Cleaning", count: 10, date: "10/6/13", servicesName: "Cleaning", email: "cleaning@example.com", phoneNumber: "123-456-7890" },
    { id: 3, name: "Tutoring", count: 10, date: "10/6/13", servicesName: "Tutoring", email: "tutoring@example.com", phoneNumber: "123-456-7890" },
    { id: 4, name: "Medical", count: 10, date: "10/6/13", servicesName: "Medical", email: "medical@example.com", phoneNumber: "123-456-7890" },
    { id: 5, name: "Drivers", count: 10, date: "10/6/13", servicesName: "Drivers", email: "drivers@example.com", phoneNumber: "123-456-7890" },
    { id: 6, name: "Tour Guide", count: 10, date: "10/6/13", servicesName: "Tour Guide", email: "tourguide@example.com", phoneNumber: "123-456-7890" },
  
]


const Registration = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className=" min-h-screen">
            {/* Header Section */}
            <div className="flex px-8 py-4 justify-between items-start mb-8">
                <DynamicPageHeader pageTitle="Registration Requests" />

                <div className="flex w-full max-w-sm items-center overflow-hidden rounded-lg border border-[#3ee0cf] focus-within:ring-1 focus-within:ring-ring">
                    {/* Search Input */}
                    <Input
                        type="text"
                        placeholder="Search by Category Name"
                        className="border-0 bg-transparent py-6 text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />

                    {/* Search Button */}
                    <Button
                        type="submit"
                        size="icon"
                        className="h-12 w-16 rounded-none bg-[#3ee0cf] hover:bg-[#3ee0cf] transition-colors"
                    >
                        <Search className="h-5 w-5 text-white" />
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="border-t border-[#B6B6B6] rounded-sm">
                <Table >
                    <TableHeader className="">
                        <TableRow className="hover:bg-transparent border-[#B6B6B6] ">
                            <TableHead className="py-4 font-bold px-8 text-slate-800"> Name </TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Services Name </TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Email </TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Phone Number </TableHead>
                            <TableHead className="py-4 font-bold px-8 text-slate-800 text-center"> Action </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {servicesData.map((service) => (
                            <TableRow key={service.id} className="border-b border-[#B6B6B6]">
                                <TableCell className="py-6 font-medium px-8 text-slate-700">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>SC</AvatarFallback>
                                        </Avatar>
                                        {service.name}
                                    </div>
                                </TableCell>
                                <TableCell className="py-6 text-center px-8 text-slate-600">{service.email}</TableCell>
                                <TableCell className="py-6 text-center px-8 text-slate-600">{service.phoneNumber}</TableCell>
                                <TableCell className="py-6 text-center px-8 text-slate-600">10.06.2023</TableCell>

                                <TableCell className="py-6 px-8">
                                    <div className="flex items-center justify-center gap-4">
                                        <button className="text-white py-1 px-2 rounded-full bg-[#008000] hover:bg-[#008000]/80 transition-colors">
                                            Approved
                                        </button>
                                        <button className="text-white py-1 px-2 rounded-full bg-[#F2415A] hover:bg-[#F2415A]/80 transition-colors">
                                            Reject
                                        </button>
                                        <button onClick={() => setIsOpen(true)} className="text-white py-1 px-2 rounded-md bg-[#3ee0cf] hover:bg-[#3ee0cf]/80 transition-colors">
                                            <EyeIcon className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination Section */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-[#FFFFFF]">
                    <p className="text-sm text-slate-500">
                        Showing 1 to 5 of 12 results
                    </p>
                    <div className="flex items-center gap-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-slate-400 bg-slate-50 border-slate-200">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="default" size="sm" className="h-8 w-8 bg-[#3ee0cf] text-white">
                            1
                        </Button>
                        {[2, 3].map((page) => (
                            <Button key={page} variant="outline" size="sm" className="h-8 w-8 border-slate-200 text-slate-600">
                                {page}
                            </Button>
                        ))}
                        <span className="px-2 text-slate-400 text-sm">...</span>
                        <Button variant="outline" size="sm" className="h-8 w-8 border-slate-200 text-slate-600">
                            8
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-slate-600 border-slate-200">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            <RegisterDetails isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Registration
