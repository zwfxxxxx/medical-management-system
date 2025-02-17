'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export const UserButton = () => {
    const { isPatientAuthenticated, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    if (!isPatientAuthenticated) {
        return (
            <Link href="/login" className="hover:scale-110 transition-transform">
                <Image
                    src='/assets/icons/user.svg'
                    height={34}
                    width={34}
                    alt='Login'
                />
            </Link>
        )
    }

    return (
        <div className="relative">
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:scale-110 transition-transform"
            >
                <Image
                    src='/assets/icons/user.svg'
                    height={34}
                    width={34}
                    alt='User'
                />
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        <Link
                            href="/personal"
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            个人信息
                        </Link>
                        <button
                            onClick={() => logout("patient")}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                            退出登录
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}; 