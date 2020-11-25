import { TagOutlined } from '@ant-design/icons';
import './index.less';

function Tag(props) {
    return (
        <div className="tag">
            <TagOutlined className='iconfont' />
            { props.name }
        </div>
    )
}

export default Tag;
