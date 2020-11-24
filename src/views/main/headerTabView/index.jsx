import { useHistory } from 'react-router-dom';
import { jClass, classNames } from '@/public/utils';

import './index.less';

function HeaderTabView(props) {
    const { tabs } = props;
    const history = useHistory()
    const currentPath = history.location.pathname;
    function selectTab(tab) {
        if (currentPath === tab.to) { return; }
        history.push(tab.to);
    }

    return (
        <div id="header-tab-view">
            {
                tabs.map((tab, index) => 
                    <div key={index} className={classNames(['tab', jClass('active', currentPath === tab.to)])} onClick={() => {selectTab(tab)}}>
                        <i className='iconfont'>
                            { tab.iconComponent }
                        </i>
                        <span>{ tab.name }</span>
                    </div>
                )
            }
        </div>
    )
}

export default HeaderTabView;
