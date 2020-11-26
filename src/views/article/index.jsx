import React, { useState, useEffect } from 'react';
import Loading from '@/components/loading';
import NoData from '@/components/no-data';
import Tag from '@/components/tag';
import LikeBtn from '@/components/like-btn';
import noDataImg from '@/assets/images/no-article.svg';
import { jElement } from '@/public/utils';
import { message } from 'antd';
import {
    DoubleLeftOutlined, DoubleRightOutlined, CalendarOutlined,
    EyeOutlined, FolderOutlined, HeartOutlined
} from '@ant-design/icons';
import { FetchArticleDetail, FetchArticlePreOrNext, FetchAddWatchTimes } from '@/api';
import './index.less';


function ArticleDetail(props) {
    const { id } = props.match.params;
    const { history } = props;
    const [loading, setLoading] = useState(false);
    const [article, setArticle] = useState(null);
    const [preArticle, setPreArticle] = useState(null);
    const [nextArticle, setNextArticle] = useState(null);

    useEffect(() => {
        // article detail
        const fetchData = async () => {
            setLoading(true);
            const res = await FetchArticleDetail({ id });
            setLoading(false);
            if (res.statusCode === 0) {
                setArticle(res.data);
            } else {
                message.error(res.message);
            }
        }
        fetchData();
        // fetchPreOrNext
        const fetchPreOrNext = async () => {
            const res = await FetchArticlePreOrNext({ id });
            if (res.statusCode === 0) {
                const { pre, next } = res.data;
                setPreArticle(pre);
                setNextArticle(next);
            }
        }
        fetchPreOrNext();
        // addWatchTime
        const addWatchTimes = async () => {
            await FetchAddWatchTimes({ id });
        }
        addWatchTimes();
    }, [id]);

    function addLikeTimes() {
        if (article) {
            const newArticle = Object.assign({}, article);
            newArticle.like_times += 1;
            setArticle(newArticle);
        }
    }

    function toPage(id, type) {
        history.push(
            !type ? `/blog/article/${id}` : `/blog/article/${type}/${id}`
        );
    }

    return (
        <div id="article-detail">
            <Loading spinning={loading}>
                {
                    jElement(
                        <div className="content">
                            <div className="article-message">
                                <p className="article-title">{ article && article.title }</p>
                                <div className="article-info">
                                    <p className="time">
                                        <CalendarOutlined className="iconfont" />发表于{ article && article.publish_time }
                                    </p>
                                    •
                                    <p className="category">
                                        <FolderOutlined className="iconfont" />
                                        {
                                            article && article.categories.map((category, index) =>
                                                <span className="classify"
                                                    key={index}
                                                    onClick={() => {toPage(category.id, 'tag')}}
                                                >
                                                    { category.name }
                                                </span>
                                            )
                                        }
                                    </p>
                                    •
                                    <p className="watch">
                                        <EyeOutlined className='iconfont' />{ article && article.watch_times }次围观
                                    </p>
                                    •
                                    <p className="heart">
                                        <HeartOutlined className="iconfont" />{ article && article.like_times }次点赞
                                    </p>
                                </div>
                                <div className="article-description">{ article && article.description }</div>
                            </div>
                            <div className="tags">
                                {
                                    article && article.tags.map((tag, index) =>
                                        <div className="tag-wrapper"
                                            key={index}
                                            onClick={() => {toPage(tag.id, 'tag')}}
                                        >
                                            <Tag {...tag} />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="like-wrap">
                                <p>如果我的文章对您有帮助！留下您的点赞吧~</p>
                                <LikeBtn id={id} addLikeTimes={addLikeTimes} />
                            </div>

                            <div className="pre-next-wrap">
                                {
                                    jElement(
                                        <span className="pre-wrap" onClick={() => {toPage(preArticle.id)}}>
                                            <DoubleLeftOutlined className='iconfont' />
                                            { preArticle && preArticle.title }
                                        </span>,
                                        preArticle
                                    )
                                }
                                {
                                    jElement(
                                        <span className="next-wrap" onClick={() => {toPage(nextArticle.id)}}>
                                            { nextArticle && nextArticle.title }
                                            <DoubleRightOutlined className='iconfont' />
                                        </span>,
                                        nextArticle
                                    )
                                }
                            </div>
                        </div>,
                        article
                    )
                }

                {
                    jElement(
                        <NoData text='Oops, 文章丢了~' imgUrl={noDataImg} />,
                        !article
                    )
                }
            </Loading>
        </div>
    )
}

export default ArticleDetail;
