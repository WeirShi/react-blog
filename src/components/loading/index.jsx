import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function Loading(props) {
    return (
        <Spin indicator={antIcon} tip='数据加载中...' {...props} />
    )
}

export default Loading;
