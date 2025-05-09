import React from 'react';

const DashboardSetting = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Dashboard Settings</h1>
            <p className="mb-4">Manage your dashboard settings here.</p>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="setting1" className="block text-sm font-medium text-gray-700">Setting 1</label>
                        <input type="text" id="setting1" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="setting2" className="block text-sm font-medium text-gray-700">Setting 2</label>
                        <input type="text" id="setting2" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Settings</button>
                </form>
            </div>
        </div>
    );
}

export default DashboardSetting;
