import { useState } from "react";
import { Search, Upload, FileText, Trash2, Download, Filter, Plus, FileEdit } from "lucide-react";

export default function DashboardDocument() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Pharmaceutical Inventory Report - May 2025",
      category: "Report",
      uploadedBy: "Admin",
      date: "05/05/2025",
      size: "1.2 MB"
    },
    {
      id: 2,
      name: "Medicine Stock Certificate",
      category: "Certificate",
      uploadedBy: "Kim Ly",
      date: "04/28/2025",
      size: "850 KB"
    },
    {
      id: 3,
      name: "Supplier Agreement - MediPharm",
      category: "Contract",
      uploadedBy: "Admin",
      date: "04/15/2025",
      size: "1.8 MB"
    },
    {
      id: 4,
      name: "Staff Training Protocol",
      category: "Protocol",
      uploadedBy: "Trần Hưng",
      date: "04/10/2025",
      size: "2.1 MB"
    },
    {
      id: 5,
      name: "Quality Assurance Guidelines",
      category: "Guidelines",
      uploadedBy: "Admin",
      date: "03/25/2025",
      size: "1.5 MB"
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Report", "Certificate", "Contract", "Protocol", "Guidelines"];

  const filteredDocuments = documents.filter(doc => {
    return (
      (selectedCategory === "All" || doc.category === selectedCategory) &&
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const deleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Tài Liệu</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm tài liệu..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            
            <div className="ml-4 relative">
              <select
                className="py-2 pl-3 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <button className="cursor-pointer flex items-center bg-blue-600 !text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            <Plus className="h-4 w-4 mr-2" />
            Thêm Tài Liệu
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Tên Tài Liệu</th>
                <th className="py-3 px-6 text-left">Phân Loại</th>
                <th className="py-3 px-6 text-left">Người Tải Lên</th>
                <th className="py-3 px-6 text-left">Ngày Tạo</th>
                <th className="py-3 px-6 text-left">Kích Thước</th>
                <th className="py-3 px-6 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {filteredDocuments.map(doc => (
                <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">{doc.category}</td>
                  <td className="py-3 px-6 text-left">{doc.uploadedBy}</td>
                  <td className="py-3 px-6 text-left">{doc.date}</td>
                  <td className="py-3 px-6 text-left">{doc.size}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-yellow-600 hover:text-yellow-800">
                        <FileEdit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-1 text-red-600 hover:text-red-800"
                        onClick={() => deleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Không tìm thấy tài liệu nào</p>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tải Lên Tài Liệu Mới</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Kéo và thả tập tin vào đây hoặc</p>
          <button className="bg-blue-600 !text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">Chọn Tập Tin</button>
          <p className="text-sm text-gray-500 mt-2">Hỗ trợ các định dạng: PDF, DOCX, XLSX, PNG, JPG</p>
        </div>
      </div>
    </div>
  );
}