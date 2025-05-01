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
        label: 'Dashboard',
        path: '/dashboard',
        icon: <HiOutlineViewGrid />,
    },
    {
        key: 'products',
        label: 'Products',
        path: 'product',
        icon: <HiOutlineCube />,
    },
    {
        key: 'orders',
        label: 'Orders',
        path: 'order',
        icon: <HiOutlineShoppingCart />,
    },
    {
        key: 'customers',
        label: 'Customers',
        path: 'customer',
        icon: <HiOutlineUsers />,
    },
    {
        key: 'documents',
        label: 'Documents',
        path: 'document',
        icon: <HiOutlineDocumentText />,
    },
    {
        key: 'announcement',
        label: 'Announcement',
        path: 'announcement',
        icon: <HiOutlineAnnotation />,
    },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: 'setting',
        icon: <HiOutlineCog />,
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: 'support',
        icon: <HiOutlineQuestionMarkCircle />,
    },
];