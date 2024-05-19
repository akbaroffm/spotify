import React from 'react'
import userIcon from '../assets/images/user.svg'
import closeIcon from '../assets/images/close.svg'
import userUnion from '../assets/images/userunion.svg'

function Activity() {
  return (
    <div className='flex flex-col ml-[20px]'>
        <div className='flex items-center justify-between mb-[40px]'>
            <div>
                <p className='font-[700] text-[20px] leading-[25px] text-[#CCCCCC]'>Friend Activity</p>
            </div>
            <div className='flex items-center space-x-[20px] cursor-pointer'>
                <img src={userIcon} alt="icon" width={32} height={32}/>
                <img src={closeIcon} alt="icon" width={18} height={18}/>
            </div>
        </div>
        <div className='mb-[20px]'>
            <span className='font-[450px] text-[16px] text-[#CCCCCC]'>
            Let friends and followers on Spotify see what you’re listening to.
            </span>
        </div>
        <div className='flex flex-col gap-y-[20px]'>
            <img src={userUnion} alt="icon" width={169} height={62}/>
            <img src={userUnion} alt="icon" width={169} height={62}/>
            <img src={userUnion} alt="icon" width={169} height={62}/>
        </div>
        <div className='mt-[20px]'>
            <p className='font-[250] text-[16px] leading-[25px] text-[#CCCCCC]'>Go to Settings Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</p>
        </div>
        <div className='flex items-center justify-center mt-[25px]'>
            <button className='px-[50px] py-[15px] bg-white rounded-[40px] text-[#171717] font-bold'>SETTINGS</button>
        </div>
    </div>
  )
}

export default Activity