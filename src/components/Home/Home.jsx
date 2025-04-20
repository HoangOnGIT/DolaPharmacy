import React from 'react';
import Header from '../../common/Header/Header';
import FloatingButtons from '../../common/FloatingButton/FloatingButtons';
import Footer from '../../common/Footer/Footer';
import "../../common/scrollbar.css"
import HealthBanner from './HealthBanner';
import HomeCategory from './HomeCategory';

const Home = () => {
    return (
        <div className="h-screen">
            <Header />
            <div className="h-[300vh] w-4/5 ml-44">
                <HealthBanner />
                <HomeCategory />
            </div>
            <Footer />
            <FloatingButtons />
        </div>
    );
}

export default Home;