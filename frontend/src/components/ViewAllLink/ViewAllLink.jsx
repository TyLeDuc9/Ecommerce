import React from 'react'
import { Link } from 'react-router-dom';
export const ViewAllLink = ({ to, className }) => {
    return (
        <div  className={className}>
            <Link to={to}>Xem tất cả <i class="fa-solid fa-chevron-right"></i></Link>
        </div>
    )
}
