'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

interface NotificationOptions {
    title: string;
    message: string;
}

const useConnectionStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [hasNotificationPermission, setHasNotificationPermission] = useState(
        Notification.permission === 'granted'
    );

    const showNotification = async ({ title, message }: NotificationOptions) => {
        if (hasNotificationPermission) {
            try {
                await navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification(title, {
                        body: message,
                        icon: '/images/icon.png',
                        badge: '/images/badge.png',
                    });
                });
            } catch (err) {
                console.error('Error showing notification: ', err)
                Swal.fire({
                    icon: 'warning',
                    title: title,
                    text: message,
                });
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: title,
                text: message,
            });
        }
    };

    useEffect(() => {
        const requestNotificationPermission = async () => {
            if (Notification.permission !== 'granted') {
                const permission = await Notification.requestPermission();
                setHasNotificationPermission(permission === 'granted');
            }
        };
        requestNotificationPermission();


        const handleOnline = async () => {
            setIsOnline(true);
            await showNotification({
                title: 'Conexión restaurada',
                message: 'La conexión se ha restaurado, sincronizando los datos...',
            });
        };

        const handleOffline = async () => {
            setIsOnline(false);
            await showNotification({
                title: 'Error',
                message: 'Sin conexión a Internet. Los datos se guardarán localmente.',
            });
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [hasNotificationPermission]);

    return isOnline;
};

export default useConnectionStatus;