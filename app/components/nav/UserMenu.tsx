'use client'

import React, { useCallback, useState } from 'react'
import Avatar from '../avatar/Avatar'
import { AiFillCaretDown } from 'react-icons/ai'
import Link from 'next/link'
import MenuItem from './MenuItem'
import { signOut } from 'next-auth/react'
import Backdrop from './Backdrop'

const UserMenu = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    return (
        <>
            <div>
                <div onClick={toggleOpen} className='p-2 border-[1px] border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer text-white'>
                    <Avatar />
                    <AiFillCaretDown />
                </div>
                {
                    isOpen && (
                        <div className='absolute z-30 shadow-md rounded-md w-[170px] bg-white overflow-hidden top-16 right-2 text-sm text-black flex flex-col cursor-pointer'>
                            <div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}>
                                        Your Orders
                                    </MenuItem>
                                </Link>
                                <Link href="/admin">
                                    <MenuItem onClick={toggleOpen}>
                                        Admin Dashboard
                                    </MenuItem>
                                </Link>

                                <MenuItem onClick={() => {
                                    toggleOpen
                                    signOut()
                                }}>
                                    Log out
                                </MenuItem>
                            </div>

                            <div>
                                <Link href="/login">
                                    <MenuItem onClick={toggleOpen}>
                                        Login
                                    </MenuItem>
                                </Link>
                                <Link href="/register">
                                    <MenuItem onClick={toggleOpen}>
                                        Register
                                    </MenuItem>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            {
                isOpen ? <Backdrop onClick={toggleOpen} /> : null
            }
        </>
    )
}

export default UserMenu