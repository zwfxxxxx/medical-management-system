import { StatusIcon } from '@/constants';
import clsx from 'clsx';
import { StampIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

// 状态映射对象，将英文状态转换为中文状态
const statusMap = {
    scheduled: '已预约',
    active: '活跃',
    pending: '诊断中',
    cancelled: '已取消',
    inactive: '未活跃',
    completed: '已完成'
};

const StatusBadge = ({ status }: {status: Status | Doctorstatus}) => {
    // 获取对应的中文状态
    const chineseStatus = statusMap[status] || status;

    return (
        <div className={clsx('status-badge', {
            'bg-green-600': status === 'scheduled' || status === 'active' ,
            'bg-blue-600': status === 'pending',
            'bg-red-600': status === 'cancelled' || status === 'inactive',
            'bg-gray-200': status === 'completed',

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
                'text-gray-500': status === 'completed',
            })}>{chineseStatus}</p>

        </div>

    );
};

export default StatusBadge;
