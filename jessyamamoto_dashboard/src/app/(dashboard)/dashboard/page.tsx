import React from 'react'

import { PageHeader } from './_components/PageHeader'
import DashboardStats from './_components/dashboard-stats'
import DashboardCharts from './_components/DashboardCharts'
import RecentBookings from './_components/recent-bookings'
import PendingApprovals from './_components/pending-approvals'

const page = () => {
  return (
    <div className=''>
      <PageHeader />
      <div className='p-6 space-y-6'>
        <DashboardStats />
        <DashboardCharts />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <RecentBookings />
          <PendingApprovals />
        </div>
      </div>
    </div>
  )
}

export default page