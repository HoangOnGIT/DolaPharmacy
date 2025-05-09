import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function UserProfilePieChart() {
    const [userData, setUserData] = useState(null);
    const base = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${base}/api/users`);
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const genderData = userData?.reduce((acc, user) => {
        const firstName = user.firstName ? user.firstName.toLowerCase() : '';
        if (firstName.endsWith('a') || firstName.endsWith('i') || firstName.endsWith('y')) {
            acc.female++;
        } else if (firstName.endsWith('n') || firstName.endsWith('m') || firstName.endsWith('c') || firstName.endsWith('h') || firstName.endsWith('g')) {
            acc.male++;
        } else {
            acc.other++;
        }
        return acc;
    }, { male: 0, female: 0, other: 0 });

    const data = [
        { name: 'Male', value: genderData?.male || 0 },
        { name: 'Female', value: genderData?.female || 0 },
        { name: 'Other', value: genderData?.other || 0 },
    ];

    const RADIAN = Math.PI / 180;
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="w-[20rem] h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col">
            <strong className="text-gray-700 font-medium">User Profile</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={105}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}