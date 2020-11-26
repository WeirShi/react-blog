import React, {
    // useContext,
    useEffect, useState
} from 'react';
// import C from '@/store/provider';
import NoData from '@/components/no-data';
import noDataImg from '@/assets/images/no-data.svg';
import Loading from '@/components/loading';
import ArticleCard from '@/components/article/card';

import { FetchGetArticleList } from '@/api';
import { jElement } from '@/public/utils';
import { Pagination, message } from 'antd';


function Home() {
    // const { screenWidth: width } = useContext(C);
    // console.log('client', width);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);
    const [list, setList] = useState([]);
    
    function onPaginationChange(current, pageSize) {
        console.log(current, pageSize);
        setCurrent(current);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await FetchGetArticleList({
                pageSize: 10,
                current: current
            });
            setLoading(false);
            if (res.statusCode === 0) {
                setList(res.data.list);
                setTotal(res.data.total);
            } else {
                message.error(res.message);
            }
        }
        fetchData();
    }, [current])


    return (
        <div className='home g-layout'>
            <Loading spinning={loading}>
                {
                    jElement(
                        <div className='article-list' style={{textAlign: 'center'}}>
                            {
                                list.map((article, index) =>
                                    <ArticleCard key={index} {...article} />
                                )
                            }

                            <Pagination
                                defaultCurrent={current}
                                total={total}
                                showSizeChanger={false}
                                size='small'
                                onChange={onPaginationChange}
                            />
                        </div>,
                        list.length !== 0
                    )
                }
                {
                    jElement(
                        <NoData text='作者太懒了，还没有写一篇文章~' imgUrl={noDataImg} />,
                        list.length === 0
                    )
                }
               
            </Loading>

        </div>
    )
}

export default Home;
