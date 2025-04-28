import React from 'react';
import Header from '../components/common/Header/Header';
import FloatingButtons from '../components/common/FloatingButton/FloatingButtons';
import Footer from '../components/common/Footer/Footer';
import "../components/common/scrollbar.css"
import HealthBanner from '../components/Home/HealthBanner';
import Category from '../components/Home/Category';
import Products from '../components/Home/Products';
import SubBanner from '../components/Home/SubBanner';
import Description from '../components/Home/Description';
import SelectionProduct from '../components/Home/SelectionProduct';
import News from '../components/Home/News';
import Others from '../components/Home/Others';

const Home = () => {
    

    return (
        <div
            style={{ width: "100%" }}
            className="flex items-center justify-center my-10"
        >
            <div className="w-[80%]">
                <HealthBanner  />
                <Category />
                <Products name="Khuyến mãi hấp dẫn" />
                <Products name="Sản phẩm mới"/>
                <Products name="Sản phẩm nổi bật"/>
                <SubBanner />
                <Description />
                <SelectionProduct name="Sản phẩm theo đối tượng" />
                <SelectionProduct name="Gợi ý hôm nay" />
                <News />
                <Others />
            </div>
        </div>


    );
}

export default Home;