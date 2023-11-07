import { Customers } from '@/types/customer';
import React from 'react'

const SideCard = ({ customerDetail }: { customerDetail: Customers }) => {
  
  return (
    <div className="ml-8 bg-white rounded-md px-5 py-6 w-full max-w-[254px] max-h-[634px]">
      <h2 className="text-[#393939] text-lg font-medium pb-6 border-b border-black border-opacity-20">
        Details
      </h2>
      <div className='flex justify-between my-5'>
        <div className='flex flex-col space-y-4'>
          <span className="text-[#4B4B4B] font-medium">
            Lead Id:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            Name:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            Lead Source:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            Lead Status:
          </span>
          <span className="text-[#4B4B4B] font-medium">
            Lead Expires:
          </span>
        </div>
        <div className='flex flex-col space-y-4'>
          <span>
            {customerDetail?.lead.id}
          </span>
          <span>
            {customerDetail?.lead.name}

          </span>
          <span>
            {customerDetail?.lead.source}

          </span>
          <span>
            {customerDetail?.lead.status}

          </span>
          <span>
            {customerDetail?.lead.expires}

          </span>
        </div>

      </div>
    </div>
  );
}

export default SideCard