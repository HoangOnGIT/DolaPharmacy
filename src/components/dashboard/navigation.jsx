import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog,
} from 'react-icons/hi';

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Tổng Quan',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'products',
        label: 'Sản Phẩm',
        path: 'product',
        icon: <HiOutlineCube />,
    },
    {
        key: 'orders',
        label: 'Đơn Hàng',
        path: 'order',
        icon: <HiOutlineShoppingCart />,
    },
    {
        key: 'customers',
        label: 'Khách Hàng',
        path: 'customer',
        icon: <HiOutlineUsers />,
    },
    {
        key: 'documents',
        label: 'Tài Liệu',
        path: 'document',
        icon: <HiOutlineDocumentText />,
    },
    {
        key: 'announcement',
        label: 'Tin Nhắn',
        path: 'announcement',
        icon: <HiOutlineAnnotation />,
    },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Cài Đặt',
        path: 'setting',
        icon: <HiOutlineCog />,
    },
    {
        key: 'support',
        label: 'Hỗ Trợ',
        path: 'support',
        icon: <HiOutlineQuestionMarkCircle />,
    },
];