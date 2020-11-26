import React, { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import NoData from '@/components/no-data';
import ArticleCard from '@/components/article/archive-card';
import { jElement } from '@/public/utils';
import NoDataImg from '@/assets/images/no-data2.svg';
import { FetchArticleListByCategoryOrTag } from '@/api';
import { message } from 'antd';
import './index.less';



function CategoryList(props) {
    const { type, id } = props.match.params;
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await FetchArticleListByCategoryOrTag({ type, id });
            setLoading(false);
            if (res.statusCode === 0) {
                setList(res.data);
            } else {
                message.error(res.message);
            }
        }
        fetchData();
    }, [type, id])

    return (
        <div id='category-list' className='g-layout'>
            <Loading spinning={loading}>
            <div className="content">
                {
                    jElement(
                        <div className="article-list">
                            {
                                list.map(article =>
                                    <ArticleCard key={article.id} {...article} />
                                )
                            }
                        </div>,
                        list.length !== 0
                    )
                }

                {
                    jElement(
                        <NoData text="作者太懒了，还没有写一篇文章~" imgUrl={NoDataImg} />,
                        list.length === 0
                    )
                }
                </div>
            </Loading>
        </div>
    )
}

export default CategoryList;
