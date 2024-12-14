import { registerUser } from '@/app/utils/auth-service';
import { updateUser } from '@/app/utils/user-service';
import { getPendingRegistrations, deletePendingRegistration, getPendingUpdates, deletePendingUpdate} from '@/utils/indexedDB';

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

export const processOfflineUpdates = async () => {
    try {
        const pendingUpdates = await getPendingUpdates();
        
        for (const update of pendingUpdates) {
            try {
                const { id, ...updateData } = update;
                await updateUser(
                    updateData.userId, 
                    updateData.name, 
                    updateData.email, 
                    updateData.roleId
                );
                await deletePendingUpdate(id);
            } catch (error) {
                console.error('Error procesando actualización offline:', error);
            }
        }
    } catch (error) {
        console.error('Error al procesar actualizaciones pendientes:', error);
    }
};