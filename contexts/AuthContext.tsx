'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    isDoctorAuthenticated: boolean;
    isPatientAuthenticated: boolean;
    patientId: string | null;
    doctorId: string | null;
    patientToken: string | null;
    doctorToken: string | null;
    login: (token: string, userId: string, type: 'patient' | 'doctor') => void;
    logout: (type: 'patient' | 'doctor') => void;
    checkPatientAuth: () => boolean;
    checkDoctorAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 存储键名常量
const STORAGE_KEYS = {
    PATIENT_TOKEN: 'patientToken',
    PATIENT_ID: 'patientId',
    DOCTOR_TOKEN: 'doctorToken',
    DOCTOR_ID: 'doctorId'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);
    const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState(false);
    const [patientId, setPatientId] = useState<string | null>(null);
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const [patientToken, setPatientToken] = useState<string | null>(null);
    const [doctorToken, setDoctorToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const patientToken = localStorage.getItem(STORAGE_KEYS.PATIENT_TOKEN);
        
        if (patientToken) {
            const storedPatientId = localStorage.getItem(STORAGE_KEYS.PATIENT_ID);
            setIsPatientAuthenticated(true);
            setPatientId(storedPatientId);
            setPatientToken(patientToken);

        }
        const doctorToken = localStorage.getItem(STORAGE_KEYS.DOCTOR_TOKEN);
        if (doctorToken) {
            const storedDoctorId = localStorage.getItem(STORAGE_KEYS.DOCTOR_ID);
            setDoctorId(storedDoctorId);
            setDoctorToken(doctorToken);
            setIsDoctorAuthenticated(true);
        }
    }, []);


    const login = (token: string, userId: string, type: 'patient' | 'doctor') => {
        if (type === 'patient') {
            // 清除旧的存储信息
            localStorage.removeItem(STORAGE_KEYS.PATIENT_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.PATIENT_ID);
        
            // 设置新的登录信息
            localStorage.setItem(STORAGE_KEYS.PATIENT_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.PATIENT_ID, userId);
        
            setPatientId(userId);
            setPatientToken(token);
            setIsPatientAuthenticated(true);
        } else if (type === 'doctor') {
            // 清除旧的存储信息
            localStorage.removeItem(STORAGE_KEYS.DOCTOR_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.DOCTOR_ID);
        
            // 设置新的登录信息
            localStorage.setItem(STORAGE_KEYS.DOCTOR_TOKEN, token);
            localStorage.setItem(STORAGE_KEYS.DOCTOR_ID, userId);
        
            setDoctorId(userId);
            setDoctorToken(token);
            setIsDoctorAuthenticated(true);
        }
    };

    const logout = (type: 'patient' | 'doctor') => {
        if (type === 'patient') {
            // 清除存储信息
            localStorage.removeItem(STORAGE_KEYS.PATIENT_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.PATIENT_ID);
            setPatientId(null);
            setPatientToken(null);
            setIsPatientAuthenticated(false);

        } else if (type === 'doctor') {
            // 清除存储信息
            localStorage.removeItem(STORAGE_KEYS.DOCTOR_TOKEN);
            localStorage.removeItem(STORAGE_KEYS.DOCTOR_ID);
            setDoctorId(null);
            setDoctorToken(null);
            setIsDoctorAuthenticated(false);
        }
        
    };

    const checkPatientAuth = () => {
        return isPatientAuthenticated && !!patientId && !!patientToken;
    };

    const checkDoctorAuth = () => {
        return isDoctorAuthenticated && !!doctorId && !!doctorToken;
    };

    return (
        <AuthContext.Provider value={{ 
            isPatientAuthenticated, 
            isDoctorAuthenticated,
            patientId,
            doctorId,
            patientToken,
            doctorToken, 
            login, 
            logout, 
            checkPatientAuth,
            checkDoctorAuth

        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 