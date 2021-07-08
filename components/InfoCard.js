import React from 'react'
import logo from '../assets/logo.png'

function InfoCard({className}) {
    return (

        <div className={`${className} bg-main-light p-6 self-start w-min text-gray-200`}>
            <img src={logo.src} className='w-2/5 mx-auto shadow-xl rounded-full mb-2' alt=''/>
            <p className='text-center text-xl font-semibold text-shadow'>Damien Mousavi</p>

            <p className='mt-4 mb-2 text-shadow'>Contact:</p>

            <div className='flex flex-nowrap mb-2 text-shadow'>
                <p className='font-light w-16 text-right'>Email:</p>
                <a rel="noreferrer noopener" target="_blank" className='underline ml-2 text-right' href='mailto:damiensaavi@gmail.com'>damiensaavi@gmail.com</a>
            </div>
            <div className='flex flex-nowrap mb-2 text-shadow'>
                <p className='font-light w-16 text-right'>Github:</p>
                <a rel="noreferrer noopener" target="_blank" className='underline ml-2 text-right' href='https://github.com/DamienSaavi/'>damiensaavi</a>
            </div>
            <div className='flex flex-nowrap mb-2 text-shadow'>
                <p className='font-light w-16 text-right'>LinkedIn:</p>
                <a rel="noreferrer noopener" target="_blank" className='underline ml-2 text-right' href='https://www.linkedin.com/in/damienmousavi/'>damienmousavi</a>
            </div>

            <p className='mt-4 mb-2 text-shadow'>Resume:</p>
            <div className='w-full flex flex-nowrap justify-center gap-4'>
                <a className='w-full flex flex-grow-0 text-center justify-center transform bg-main border-b-4 active:border-b-2 active:translate-y-0.5 hover:bg-main-highlight active:mt-0.5 border-main-dark rounded-xl px-3 py-2 text-black' href='http://54.90.205.165/wp-content/uploads/2021/07/Resume.pdf'>Download</a>
            </div>
        </div>
    )
}

export default InfoCard