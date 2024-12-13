import { registerUser } from '@/app/utils/auth-service';
import { getPendingRegistrations, deletePendingRegistration } from '@/utils/indexedDB';

export const processOfflineRegistrations = async () => {
    try {
        const pendingRegistrations = await getPendingRegistrations();
        
        for (const registration of pendingRegistrations) {
            try {
                const { id, ...userData } = registration;
                const roleEndpoint = userData.userRole === 'cleaning staff' ? '/Maid' : '/Receptionist';
                
                await registerUser(
                    userData.userName,
                    userData.userEmail,
                    userData.userRole,
                    userData.userPassword,
                    roleEndpoint
                );
                await deletePendingRegistration(id);
            } catch (error) {
                console.error('Error procesando registro offline:', error);
            }
        }
    } catch (error) {
        console.error('Error al procesar registros pendientes:', error);
    }
};