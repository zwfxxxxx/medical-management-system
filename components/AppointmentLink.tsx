'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const AppointmentLink = () => {
    const { isPatientAuthenticated, patientId} = useAuth();
    const router = useRouter();

    const handleClick = () => {
        if (!isPatientAuthenticated) {
            const targetPath = `/patients/${patientId}/new-appointment`;
            localStorage.setItem('redirectUrl', targetPath);
            router.push('/login');
        } else {
            router.push(`/patients/${patientId}/new-appointment`);
        }
    };

    return (
        <button 
            onClick={handleClick}
            className="flex items-center gap-2 hover:text-blue-500 transition-colors"
        >
            <Image
                src='/assets/icons/guahao.svg'
                height={20}
                width={20}
                alt='appointment'
            />
            预约挂号
        </button>
    );
}; 