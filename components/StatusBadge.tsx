import { StatusIcon } from '@/constants';
import clsx from 'clsx';
import { StampIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const StatusBadge = ({ status }: {status: Status | Doctorstatus}) => {
    return (
        <div className={clsx('status-badge', {
            'bg-green-600': status === 'scheduled' || status === 'active' ,
            'bg-blue-600': status === 'pending',
            'bg-red-600': status === 'cancelled' || status === 'inactive',

        })}>
            <Image
                src={StatusIcon[status]}
                alt={status}
                width={20}
                height={20}
                className="h-fit w-3"
            />
            <p className={clsx('text-12-semibold canitalize', {
                'text-green-500': status === 'scheduled',
                'text-blue-500': status === 'pending',
                'text-red-500': status === 'cancelled',
            })}>{status}</p>

        </div>

    );
};

export default StatusBadge;