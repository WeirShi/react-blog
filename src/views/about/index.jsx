import React, { useContext } from 'react';
import NoData from '@/components/no-data';
import noDataImg from '@/assets/images/no-data.svg';
import C from '@/store/provider';

function About() {
    const client = useContext(C);
    console.log('client', client);
    return (
        <div className='about'>
            <NoData text='作者太懒了，还没写简历呢~' imgUrl={noDataImg} />
        </div>
    )
}

export default About;
