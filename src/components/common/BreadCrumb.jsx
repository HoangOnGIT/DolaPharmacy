import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export default function BreadCrumb({ title }) {
    return (
        <div className="h-10 mx-auto bg-blue-200">
            <div className="w-[80%] mx-auto py-2 text-center text-blue-800 font-semibold">
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {title}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
    )
}
