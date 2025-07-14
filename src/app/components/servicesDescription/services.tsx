"use client";

import { Card, CardFooter, Image } from "@heroui/react";
import { useRouter } from 'next/navigation';
export default function Services() {
  const router = useRouter()
  return (
    <div className="flex flex-row flex-wrap items-stretch gap-6 mt-8 w-full justify-center">
      <div className="flex justify-center p-2">
        <Card
          className="shadow-lg w-full max-w-sm shadow-black"
          isFooterBlurred
          isPressable
          onPress={() => router.push('/assignmentAndTracking')} // Redirect to the desired page

        >
          <Image src="/images/instrument_assignment_and_tracking.jpeg" alt="Instrument Assignment" width={500} height={400} className="object-cover" />
          <CardFooter className="flex flex-col justify-between before:bg-white/5 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <h3 className="mt-4 text-lg text-white font-semibold">Instrument Assignment & Tracking</h3>
            <p className='text-white'>Easily assign instruments to students and track their status and condition.</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center p-2">
        <Card
          className="shadow-lg w-full max-w-sm shadow-black"
          isFooterBlurred
          isPressable
          onPress={() => router.push('/viewingAndManagingInventory')}
        >
          <Image src="/images/inventory_management.jpeg" alt="Inventory Management" width={500} height={400} className="object-cover" />
          <CardFooter className="flex flex-col justify-between before:bg-white/5 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <h3 className="mt-4 text-lg text-white font-semibold">Inventory Management</h3>
            <p className="text-white">Manage classroom and view district-wide inventories with ease.</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center p-2">
        <Card
          className="shadow-lg w-full max-w-sm shadow-black"
          radius='lg'
          isFooterBlurred
          isPressable
        >
          <Image src="/images/resourcesharing_and_collaboration.jpeg" alt="Resource Sharing" width={500} height={400} className="object-cover" />
          <CardFooter className="flex flex-col justify-between before:bg-white/5 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <h3 className="mt-4 text-lg text-white font-semibold">Resource Sharing & Collaboration</h3>
            <p className="text-white">Facilitate resource sharing across schools and districts.</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center p-2">
        <Card
          className="shadow-lg w-full max-w-sm shadow-black"
          isPressable
          isFooterBlurred
        >

          <Image src="/images/analytics.jpeg" alt="Reporting and Analytics" width={500} height={400} className="object-cover" />
          <CardFooter className="flex flex-col justify-between before:bg-white/5 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <h3 className="mt-4 text-lg font-semibold text-white">Reporting & Analytics</h3>
            <p className="text-white">Generate detailed reports and analytics to make data-driven decisions.</p>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-center p-2">
        <Card
          className="shadow-lg w-full max-w-sm shadow-black"
          isFooterBlurred
          isPressable
        >

          <Image src="/images/Interface.jpeg" alt="User Interface" width={500} height={400} className="rounded-md" />
          <CardFooter className="flex flex-col justify-between before:bg-white/5 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <h3 className="mt-4 text-lg font-semibold text-white">User-Friendly Interface</h3>
            <p className="text-white">Enjoy a centralized dashboard with mobile access for managing inventories on the go.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}