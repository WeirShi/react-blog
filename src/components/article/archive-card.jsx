import { CalendarOutlined, FolderOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
import { jElement } from '@/public/utils';
import Tag from '../tag';
import './archive-card.less';


function ArchiveCard(props) {

    function readMore() {}
    function toPage() {}

    return (
        <div className="article-card" onClick={() => { readMore(props.id) }}>
            <div className="article-card-wrap">
                <div className="article-title">
                    <span>{ props.title }</span>
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
            </div>
        </div>
    )
}

export default ArchiveCard;
