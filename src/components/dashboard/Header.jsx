import React from 'react'
import AddJobModal from '../common/modal/AddJobModal'
import AddCompanyModal from '../common/modal/AddCompany'
import { LuBellDot } from "react-icons/lu";
import { FaRegUser } from 'react-icons/fa';
function Header() {
  return (
    <div className='w-full container pt-6'>
        <div className='w-full flex md:flex-row flex-col-reverse items-center justify-end gap-6 text-primary'>
            <div className='md:w-max w-full flex items-center justify-between gap-6'>
                <AddJobModal />
                <AddCompanyModal/>
            </div>
            <div className='md:w-max    w-full flex items-center justify-end gap-6'>
                <button 
                type='button'
                >   
                <LuBellDot size={28}/>
                </button>
                <button 
                type='button'
                >   
                <FaRegUser size={24}/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header