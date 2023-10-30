import { CheckFieldProps } from '@/types/global'
import React from 'react'

export default function CheckField({ title, label, options, border, handleChange, value }: CheckFieldProps) {
  return (
    <>
      <div className={`border-b-[${border}px] border-slate-gray border-opacity-50 pt-5 pb-2`}>
        <div className='flex justify-between'>
          <div>
            <span className='text-dark font-semibold text-lg me-2'>{title} </span><span className=' text-red text-sm font-medium'>{label}
            </span>
          </div>


        </div>
        <div className=''>
          {
            options.map((item) => (

              <div className=' mx-1 my-1 '>
                <div className='flex space-x-2 '>

                  <label className="custom-checkbox ">
                    <input type="checkbox" name="check" defaultChecked={value} className="hidden" onChange={(e) => handleChange(e.target.checked)} />
                    <span className="checkbox-control"></span>

                    <p className=' text-gray font-medium text-base'>{item}</p>

                  </label>
                </div>


              </div>
            ))
          }</div>

      </div>
    </>
  )
}
