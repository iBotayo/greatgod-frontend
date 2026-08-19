'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-stack-md w-full pb-stack-lg">
      
      {/* Page Header */}
      <div className="flex justify-between items-end border-b border-outline-variant pb-4 mt-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Platform Overview</h2>
          <p className="font-body-md text-body-md text-secondary mt-2">Strategic metrics and editorial activity for current period.</p>
        </div>
        <p className="font-label-sm text-label-sm text-secondary hidden sm:block">
          Last updated: Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>

      {/* Bento Grid for KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-variant/20 to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Awaiting Review</h3>
            <span className="material-symbols-outlined text-primary-container">pending_actions</span>
          </div>
          <div className="relative z-10">
            <p className="font-display-lg text-display-lg text-on-surface font-medium leading-none">42</p>
            <p className="font-label-sm text-label-sm text-primary mt-2">▲ 12 from last week</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Scheduled Content</h3>
            <span className="material-symbols-outlined text-primary-container">calendar_month</span>
          </div>
          <div className="relative z-10">
            <p className="font-display-lg text-display-lg text-on-surface font-medium leading-none">12</p>
            <p className="font-label-sm text-label-sm text-secondary mt-2">Next release in 2 days</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Active Contributors</h3>
            <span className="material-symbols-outlined text-primary-container">groups</span>
          </div>
          <div className="relative z-10">
            <p className="font-display-lg text-display-lg text-on-surface font-medium leading-none">156</p>
            <p className="font-label-sm text-label-sm text-primary mt-2">▲ 3 new this month</p>
          </div>
        </div>

      </div>

      {/* Complex Layout: Activity & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column: Activity Table */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
            <h3 className="font-headline-md text-headline-md text-on-surface">Recent Activity</h3>
            <button className="font-label-sm text-label-sm text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="p-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">User</th>
                  <th className="p-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Action</th>
                  <th className="p-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">Entity</th>
                  <th className="p-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-fixed flex items-center justify-center font-label-sm font-bold">AN</div>
                    <span className="text-on-surface font-medium">Amara Nwosu</span>
                  </td>
                  <td className="p-4 text-on-surface-variant">Submitted draft</td>
                  <td className="p-4 text-primary hover:underline cursor-pointer italic">&quot;The Architecture of Grace&quot;</td>
                  <td className="p-4 text-secondary text-right font-label-sm text-label-sm">10 min ago</td>
                </tr>
                <tr className="hover:bg-surface-container transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-sm font-bold">RH</div>
                    <span className="text-on-surface font-medium">Rebecca Hall</span>
                  </td>
                  <td className="p-4 text-on-surface-variant">Approved reflection</td>
                  <td className="p-4 text-primary hover:underline cursor-pointer italic">&quot;Morning Liturgy Vol. 4&quot;</td>
                  <td className="p-4 text-secondary text-right font-label-sm text-label-sm">1 hr ago</td>
                </tr>
                <tr className="hover:bg-surface-container transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-label-sm font-bold">JS</div>
                    <span className="text-on-surface font-medium">John Smith</span>
                  </td>
                  <td className="p-4 text-on-surface-variant">Updated metadata</td>
                  <td className="p-4 text-primary hover:underline cursor-pointer italic">&quot;Sermon Archive 2023&quot;</td>
                  <td className="p-4 text-secondary text-right font-label-sm text-label-sm">3 hrs ago</td>
                </tr>
                <tr className="hover:bg-surface-container transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-sm font-bold">SYS</div>
                    <span className="text-on-surface font-medium">System Automated</span>
                  </td>
                  <td className="p-4 text-on-surface-variant">Published batch</td>
                  <td className="p-4 text-on-surface">Weekly Newsletter</td>
                  <td className="p-4 text-secondary text-right font-label-sm text-label-sm">Yesterday</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Column: Widgets */}
        <div className="space-y-6">
          
          {/* System Health Widget */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary">monitor_heart</span>
              <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">System Health</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-on-surface">Server Load</span>
                  <span className="text-secondary">24%</span>
                </div>
                <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container w-1/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between font-label-sm text-label-sm mb-1">
                  <span className="text-on-surface">Storage Capacity</span>
                  <span className="text-secondary">78%</span>
                </div>
                <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary-container w-3/4"></div>
                </div>
              </div>
              <div className="pt-2 border-t border-outline-variant mt-4">
                <p className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#4a7c59] inline-block"></span> All systems operational
                </p>
              </div>
            </div>
          </div>

          {/* Donation Pulse Chart (Placeholder Aesthetic) */}
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Donation Pulse</h3>
                <p className="font-headline-md text-headline-md text-on-surface mt-1">$12,450</p>
              </div>
              <span className="material-symbols-outlined text-secondary">volunteer_activism</span>
            </div>
            
            {/* Stylized CSS Chart Placeholder */}
            <div className="h-24 w-full flex items-end gap-1 relative z-10 opacity-70">
              <div className="w-full bg-primary-container rounded-t-sm h-[30%]"></div>
              <div className="w-full bg-primary-container rounded-t-sm h-[45%]"></div>
              <div className="w-full bg-primary-container rounded-t-sm h-[20%]"></div>
              <div className="w-full bg-primary-container rounded-t-sm h-[60%]"></div>
              <div className="w-full bg-primary-container rounded-t-sm h-[80%]"></div>
              <div className="w-full bg-primary-container rounded-t-sm h-[55%]"></div>
              <div className="w-full bg-[#cca72f] rounded-t-sm h-[90%]"></div>
            </div>
            
            <div className="flex justify-between mt-2 font-label-sm text-label-sm text-secondary relative z-10">
              <span>Week 1</span>
              <span>Week 4</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
