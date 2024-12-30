
'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";


const PasskeyModal = () => {
    const router = useRouter();
    const path = usePathname();
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    
    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem('accessKey') : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);
        if(path){
            if (accessKey === '123456') {
                setOpen(false);
                router.push('/admin');
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey]);


    const closeModal = () => {
        setOpen(false);
        router.push('/');
    };
    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (passkey === '123456') {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accessKey', encryptedKey);
            setOpen(false);
        } else {
            setError('Invalid passkey');
        }
    };      

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">
                        Admin Access Verification
                        <Image
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={24}
                            height={24}
                            onClick={() => closeModal()}
                            className="cursor-pointer"
                        />
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        please enter the passkey to access the admin panel.
                    </AlertDialogDescription>
                </AlertDialogHeader>


                <div className="flex justify-center items-center gap-2">
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup>
                            {[...Array(6)].map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    className="shad-otp-slot w-12 h-12 text-center text-lg font-semibold border-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none border-gray-300 transition duration-200"
                                    index={index}
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                {error && <p className="shad-error text-14-regular mt-4 flex justyfy-center">{error}</p>}

                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={validatePasskey}
                        className="shad-primary-btn">
                        enter passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
};

export default PasskeyModal;