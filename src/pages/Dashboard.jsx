import React from 'react';
import Stats from '../components/dashboard/Stats';
import TransactionChart from '../components/dashboard/TransactionChart';
import BuyerProfilePieChart from '../components/dashboard/BuyerProfilePieChart';
import TableDashboard from '../components/dashboard/TableDashboard';
import PopularProduct from "../components/dashboard/PopularProduct"

const Dashboard = () => {
    return (
        <>
		<div className="flex flex-col gap-4">
			<Stats />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<TableDashboard choose={0}/>
				<PopularProduct />
			</div>
		</div>
        </>
    );
}

export default Dashboard;
