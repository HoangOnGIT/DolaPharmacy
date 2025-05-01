import React from 'react'
import NewsItem from '../components/news/NewsItem'
import LatestNewsItem from '../components/news/LatestNewsItem'

// Mock data for the news items
const newsData = [
  {
    id: 1,
    date: '18/07/2023',
    title: 'Trẻ em sau tiêm vắc xin bao lâu thì sốt?',
    excerpt: 'Khi tiêm vắc xin cho trẻ em, một trong những phản ứng phụ phổ biến mà phụ huynh thường gặp phải là con sốt, khiến bé khó chịu, quấy khóc. Tuy vậy...',
    imageUrl: 'https://via.placeholder.com/600x400?text=Vaccine+Child',
    slug: 'tre-em-sau-tiem-vac-xin'
  },
  {
    id: 2,
    date: '18/07/2023',
    title: 'Có cần xét nghiệm trước khi đi tiêm HPV hay không?',
    excerpt: 'Ác xin HPV đã được công nhận là biện pháp dụng phòng đối với ngăn ngừa các bệnh liên quan đến virus HPV, nhưng liệu có cần phải tiến hành xét...',
    imageUrl: 'https://via.placeholder.com/600x400?text=HPV+Vaccine',
    slug: 'co-can-xet-nghiem-truoc-khi-di-tiem-hpv'
  },
  {
    id: 3,
    date: '18/07/2023',
    title: 'Trước và sau khi tiêm vắc xin có ăn gì, nên ăn gì?',
    excerpt: 'Nhiều người băn khoăn không biết cách thức và sau khi tiêm vắc xin có được ăn trứng hay trái chuối trong trong trạng văn hỏi trả lời minh ách với thông thường như...',
    imageUrl: 'https://via.placeholder.com/600x400?text=Vaccine+Food',
    slug: 'truoc-va-sau-khi-tiem-vac-xin'
  },
  {
    id: 4,
    date: '18/07/2023',
    title: 'Tham khảo các loại thuốc trị lạc đồng tiền hiệu quả',
    excerpt: 'Trong bài viết này, chúng ta sẽ cùng tìm hiểu bệnh lạc đồng tiền và các loại thuốc trị trị lạc đồng tiền hiệu quả, giúp làm tối ưu quá...',
    imageUrl: 'https://via.placeholder.com/600x400?text=Medicine+Skin',
    slug: 'tham-khao-cac-loai-thuoc-tri-lac-dong-tien'
  },
  {
    id: 5,
    date: '18/07/2023',
    title: 'Người bị ư huyết giáp có uống được collagen không?',
    excerpt: 'Người bị ư huyết giáp có uống được collagen không? Đây đang là vấn đề băn khoăn của rất nhiều chị em phụ nữ, đặc biệt là những người yêu...',
    imageUrl: 'https://via.placeholder.com/600x400?text=Collagen+Drink',
    slug: 'nguoi-bi-u-huyet-giap-co-uong-duoc-collagen'
  },
];

// Latest news data for sidebar
const latestNews = [
  {
    id: 1,
    date: '18/07/2023',
    title: 'Trẻ em sau tiêm vắc xin bao lâu thì sốt?',
    imageUrl: 'https://via.placeholder.com/100x100?text=Vaccine',
    slug: 'tre-em-sau-tiem-vac-xin'
  },
  {
    id: 2,
    date: '18/07/2023',
    title: 'Có cần xét nghiệm trước khi đi tiêm HPV hay không?',
    imageUrl: 'https://via.placeholder.com/100x100?text=HPV',
    slug: 'co-can-xet-nghiem-truoc-khi-di-tiem-hpv'
  },
  {
    id: 3,
    date: '18/07/2023',
    title: 'Trước và sau khi tiêm vắc xin có ăn gì, nên ăn gì?',
    imageUrl: 'https://via.placeholder.com/100x100?text=Food',
    slug: 'truoc-va-sau-khi-tiem-vac-xin'
  },
  {
    id: 4,
    date: '18/07/2023',
    title: 'Tham khảo các loại thuốc trị lạc đồng tiền hiệu quả',
    imageUrl: 'https://via.placeholder.com/100x100?text=Medicine',
    slug: 'tham-khao-cac-loai-thuoc-tri-lac-dong-tien'
  },
  {
    id: 5,
    date: '18/07/2023',
    title: 'Người bị ư huyết giáp có uống được collagen không?',
    imageUrl: 'https://via.placeholder.com/100x100?text=Collagen',
    slug: 'nguoi-bi-u-huyet-giap-co-uong-duoc-collagen'
  },
];

// Categories for sidebar
const categories = [
  { id: 1, name: 'Góc dinh dưỡng' },
  { id: 2, name: 'Góc khỏe đẹp' }
];

export default function News() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Tin tức</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content area */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData.map(news => (
              <NewsItem 
                key={news.id}
                date={news.date}
                title={news.title}
                excerpt={news.excerpt}
                imageUrl={news.imageUrl}
                slug={news.slug}
              />
            ))}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="md:w-1/3">
          {/* Latest news section */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <h2 className="bg-blue-600 text-white py-2 px-4 font-medium">Tin mới nhất</h2>
            <div>
              {latestNews.map(item => (
                <LatestNewsItem 
                  key={item.id}
                  date={item.date}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  slug={item.slug}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
