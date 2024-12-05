import ManagerDashboard from '../_components/manager_dashboard';
import ShortcutsManager from '../_components/shortcuts_manager';

export default function RecepcionistHome() {
    return (
        <div className="grid grid-rows-[auto_1fr_auto] p-8 pb-20 gap-16 w-full">
            <main className="w-full">
                <div className="w-full mb-8">
                    <ShortcutsManager />
                </div>
                <div className="py-2">
                    <ManagerDashboard />
                </div>
            </main>
        </div>
    );
}