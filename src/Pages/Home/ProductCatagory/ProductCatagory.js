import React from 'react';
import { Link } from 'react-router-dom';

const ProductCatagory = () => {
    const product=[
        {
            "catagoryid":"IOS"
        },
        {
            "catagoryid":"Android"
        },
        {
            "catagoryid":"Other"
        }
    ]
    return (
        <ul className="menu menu-vertical max-w-6xl mt-4 mt-5 lg:menu-horizontal bg-base-100 rounded-box">
            {
                product.map(data=><li><Link to={`/catagory/${data.catagoryid}`}>{data.catagoryid}</Link></li>)
            }
        </ul>
    );
};

export default ProductCatagory;
/*

`/catagory/${data.id}`
[
    {
        "catagoryid":"apple"
    },
    {
        "catagoryid":"android"
    },
    {
        "catagoryid":"other"
    }
]
*/