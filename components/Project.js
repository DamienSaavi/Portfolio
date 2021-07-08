import React from 'react'

const Project = ({ index, children }) => {
    return (
        <div className={`mb-12 w-full flex flex-col gap-4 z-10 ${index % 2 ? 'sm:flex-row-reverse' : 'sm:flex-row'}`} >
            {children}
        </div>
    )
}
Project.Logo = ({ src }) => {
    return (
        <div className='mx-auto px-16 z-30 sm:p-0 w-full sm:w-64 max-w-sm'>
            <img src={src.src} alt='' className='project-image shadow-2xl mx-auto w-full' />
        </div>
    )
}
Project.Description = ({ title, children }) => {
    return (
        <div className='w-full bg-main-light rounded-3xl p-4 pt-24 sm:pt-4 sm:px-6 -mt-24 sm:mt-0 z-20 '>
            <p className='text-3xl font-bold text-center py-2 sm:text-left text-shadow text-accent-light'>{title}</p>
            <div className='opacity-90'>
                {children}
            </div>
        </div>
    )
}
Project.ButtonBar = ({ children }) => {
    return (
        <div className='flex flex-row justify-center sm:justify-start flex-wrap gap-3 opacity-100 pt-4'>
            {children}
        </div>
    )
}
Project.Button = ({ href, children }) => {
    return (
        <div className='h-11 flex'>
            <a className='w-32 flex flex-grow-0 text-center justify-center transform bg-main border-b-4 active:border-b-2 active:translate-y-0.5 hover:bg-main-highlight active:mt-0.5 border-main-dark rounded-xl px-3 py-2.5 text-black' href={href}>
                {children}
            </a>
        </div>
    )
}

export default Project