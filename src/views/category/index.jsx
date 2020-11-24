import React, { useContext } from 'react';
import NoData from '@/components/no-data';
import noDataImg from '@/assets/images/no-data.svg';

import C from '@/store/provider';

function Category() {
    const client = useContext(C);
    console.log('client', client);
    return (
        <div className='category'>
            <NoData text='暂无分类/标签~' imgUrl={noDataImg} />
        </div>
    )
}

export default Category;
