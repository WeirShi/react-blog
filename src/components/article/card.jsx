import { useHistory } from 'react-router-dom';
import { CalendarOutlined, FolderOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { jElement } from '@/public/utils';
import Tag from '../tag';
import './card.less';


function ArticleCard(props) {
    const history = useHistory()
    function readMore(id) {
        history.push(`/blog/article/${id}`);
    }

    function toPage() {}

    return (
        <div id="article-card">
            <div className="article-card-wrap">
                <div
                    className="article-cover"
                    style={{ backgroundImage: 'url(' + props.cover + ')' }}
                >
                    <div className="article-title" onClick={() => readMore(props.id)}>
                        <span>{ props.title }</span>
                    </div>
                </div>
                <div className="article-info">
                    <p className="time">
                        <CalendarOutlined className='iconfont' />发表于{ props.publish_time }
                    </p>
                    {
                        jElement(
                            <div style={{ display: 'flex' }}>
                                •
                                <p className="category">
                                    <FolderOutlined className='iconfont' />
                                    {
                                        props.categories.map((category, index) =>
                                            <span
                                                className="classify"
                                                key={index}
                                                onClick={()=> toPage(category.id, 'category')}
                                            >
                                                { category.name }
                                            </span>
                                        )
                                    }
                                </p>
                            </div>,
                            props.categories.length > 0
                        )
                    }
                    •
                    <p className="watch">
                        <EyeOutlined className='iconfont' />{ props.watch_times }次围观
                    </p>
                    •
                    <p className="heart">
                        <HeartOutlined className='iconfont' />{ props.like_times }次点赞
                    </p>
                </div>
                <div className="article-description">{ props.description }</div>
                {
                    jElement(
                        <div className="tags">
                            {
                                props.tags.map((tag, index) =>
                                    <div
                                        className="tag-wrapper"
                                        key={index}
                                        onClick={() => {toPage(tag.id, 'tag')}}
                                    >
                                        <Tag {...tag} />
                                    </div>
                                )
                            }
                        </div>,
                        props.tags.length > 0
                    )
                }
                <div className="read-more" onClick={() => {readMore(props.id)}}>阅读全文 {'>>'}</div>
            </div>
        </div>
    )
}

export default ArticleCard;

