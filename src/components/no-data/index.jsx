import { jElement } from '@/public/utils';
import './index.less';

function NoData(props) {
    return (
        <div className="no-data">
            <img className="default-img" alt="暂无数据" src={props.imgUrl} />
            {
                jElement(
                    <p> { props.text } </p>,
                    props.text
                )
            }
            {
                jElement(
                    props.children,
                    !props.text
                )
            }
            
        </div>
    )
}

export default NoData;
