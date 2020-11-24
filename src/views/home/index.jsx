import React, { useContext } from 'react';
import NoData from '@/components/no-data';
import noDataImg from '@/assets/images/no-data.svg';

import C from '@/store/provider';

function Home() {
    const client = useContext(C);
    console.log('client', client);
    return (
        <div className='home'>
            <NoData text='作者太懒了，还没有写一篇文章~' imgUrl={noDataImg} />
        </div>
    )
}

export default Home;
