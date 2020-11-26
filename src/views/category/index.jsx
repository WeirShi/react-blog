import React, { useState, useEffect } from 'react';
import NoData from '@/components/no-data';
import noDataImg from '@/assets/images/no-data.svg';
import Loading from '@/components/loading';
import { FetchGetAllCategory, FetchGetAllTag } from '@/api';
import { message, Tag } from 'antd';
import { jElement } from '@/public/utils';
import './index.less';

function Category() {

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        let isOk = true;
        const fetchData = async () => {
            const promises = [
              FetchGetAllCategory(),
              FetchGetAllTag()
            ];
            setLoading(true);
            const reses = await Promise.all(promises);
            setLoading(false);
            if (reses.length !== 2) {
               message.error("请求失败");
            } else {
                const [categoryRes, tagRes] = reses;
                setCategories(categoryRes.data);
                setTags(tagRes.data);
            }
        }
        fetchData();
        return (() => {
            // eslint-disable-next-line no-unused-vars
            isOk = false;
        })
    }, [])


    function toPage() {}

    return (
        <div className='categories g-layout'>
            <Loading spinning={loading}>
                {
                    jElement(
                        <NoData text='暂无分类/标签~' imgUrl={noDataImg} />,
                        categories.length === 0 && tags.length === 0
                    )
                }
                {
                   jElement(
                        <div className="content">
                            {
                                jElement(
                                    <div className="categories-wrap">
                                        <p className="title">分类</p>
                                        <div className="category">
                                            {
                                                categories.map((category, index) =>
                                                    <div className="category-item" key={index} onClick={() => {toPage(category.id, 'category')}}>
                                                        { category.name }
                                                        <span>{ category.article_count }篇</span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>,
                                    categories.length !== 0
                                )
                            }
                            {
                                jElement(
                                    <div className="tags-wrap">
                                        <p className="title">标签</p>
                                        <div className="tag">
                                            {
                                                tags.map((tag, index) =>
                                                    <div key={index} className="tag-item" onClick={() => {toPage(tag.id, 'tag')}}>
                                                        <Tag color={tag.color}>{ tag.name }</Tag>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>,
                                    tags.length !== 0
                                )
                            }
                        </div>,
                        categories.length !== 0 || tags.length !== 0
                   ) 
                }
            </Loading>
        </div>
    )
}

export default Category;
