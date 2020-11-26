import React, { useState, useEffect } from 'react';
// import C from '@/store/provider';
import { jElement } from '@/public/utils';
import NoData from '@/components/no-data';
import noDataImg from '@/assets/images/no-data.svg';
import Loading from '@/components/loading';
import ArticleCard from '@/components/article/archive-card';
import { FetchGetArticleList } from '@/api';
import { message, Pagination } from 'antd';
import './index.less';

function Archive() {
    // const client = useContext(C);
    // console.log('client', client);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(null);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);

    function onPaginationChange(current, pageSize) {
        console.log(current, pageSize);
        setCurrent(current);
    }

    useEffect(() => {
        let isOk = true;
        const fetchData = async () => {
            setLoading(true);
            const res = await FetchGetArticleList({
                pageSize: 10,
                current: current
            });
            setLoading(false);
            if (res.statusCode === 0) {
                setTotal(res.data.total);
                const articles = {};
                res.data.list.forEach((article) => {
                    const [year, month] = (article.publish_time &&
                      article.publish_time.split("/"));
                    if (articles[year] === undefined) {
                      articles[year] = {};
                    }
                    if (articles[year][month] === undefined) {
                      articles[year][month] = [];
                    }
                    articles[year][month].push(article);
                  });
                  setList(articles);
            } else {
                message.error(res.message);
            }
        }
        fetchData();
        return () => {
            isOk = false;
            console.log(isOk);
        }
    }, [current])
    

    return (
        <div className='archives g-layout'>
            <Loading spinning={loading}>
                {
                    jElement(
                        <div className='content'>
                            <div className="archives-wrap">
                                <div className="time-line"></div>
                                <div className="list-content">
                                    <p className="normal-node">目前共计 { total } 篇文章~</p>
                                    {
                                        list && Object.keys(list).map((year, yIndex) =>
                                            <div className="bold-node" key={yIndex}>
                                                <p>{year}年</p>
                                                {
                                                    Object.keys(list[year]).map((month, mIndex) =>
                                                        <div className='bold-node month' key={mIndex}>
                                                            <p>{ month }月</p>
                                                            {
                                                                list[year][month].map((article, aIndex) =>
                                                                    <ArticleCard key={aIndex} {...article} />
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="pagination">
                                <Pagination
                                    defaultCurrent={current}
                                    total={total}
                                    showSizeChanger={false}
                                    size='small'
                                    onChange={onPaginationChange}
                                />
                            </div>
                        </div>,
                        total !== 0
                    )
                }

                {
                    jElement(
                        <NoData text='作者太懒了，还没有写一篇文章~' imgUrl={noDataImg} />,
                        total === 0
                    )
                }
            </Loading>
        </div>
    )
}

export default Archive;
