import { TagOutlined } from '@ant-design/icons';
import style from './index.module.less';

function Tag(props) {
    return (
        <div className={style.tag}>
            <TagOutlined className={style.iconfont} />
            { props.name }
        </div>
    )
}

export default Tag;
