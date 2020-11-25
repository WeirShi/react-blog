import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from '@/routes';
import C from '@/store/provider';
import { jElement, jClass, classNames } from '@/public/utils';

import { useWindowSize } from '@/public/hooks/useWindowSize';
import HeaderTabView from './headerTabView/index';
import licenseImg from '@/assets/images/license.png';
import './index.less';

import { HomeOutlined, TagsOutlined, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, BackTop } from 'antd';
const { Header, Footer, Content } = Layout;

function useHeight(size) {
    const [height, setHeight] = useState('90px');
    const changeHeight = useCallback(() => {
        setHeight( size.width <= 768 ? '60px' : '90px');
    }, [size.width])

    useEffect(() => {
        changeHeight();
    }, [changeHeight, size.width])

    return height;
}

const lineStyle = {
    normalLineData: [
        {
            width: "100%",
            top: "0px",
            transform: "rotateZ(0deg)",
            opacity: "1"
        },
        {
            width: "100%",
            top: "0px",
            transform: "rotateZ(0deg)",
            opacity: "1"
        },
        {
            width: "100%",
            top: "0px",
            transform: "rotateZ(0deg)",
            opacity: "1"
        }
    ],
    closeLineData: [
        {
            width: "100%",
            top: "6px",
            transform: "rotateZ(-45deg)",
            opacity: "1"
        },
        {
            width: "100%",
            top: "0px",
            transform: "rotateZ(0deg)",
            opacity: "0"
        },
        {
            width: "100%",
            top: "-6px",
            transform: "rotateZ(45deg)",
            opacity: "1"
        }
    ]
}

const tabs = [
    {
        name: "首页",
        iconComponent: <HomeOutlined />,
        to: "/blog/home"
      },
      {
        name: "分类/标签",
        iconComponent: <TagsOutlined />,
        to: "/blog/category"
      },
      {
        name: "归档",
        iconComponent: <ProfileOutlined />,
        to: "/blog/archive"
      },
      {
        name: "关于我",
        iconComponent: <UserOutlined />,
        to: "/blog/about"
      }
];

function Main() {
    const size = useWindowSize();
    const height = useHeight(size);

    const [toggleLineData, changeToggle] = useState(lineStyle.normalLineData)
    const [showMobileTabs, changeShowMobileTabs] = useState(false);
    const [showRightNav, changeShowRightNav] = useState(false);


    useEffect(() => {
        changeToggle(showMobileTabs ? lineStyle.closeLineData : lineStyle.normalLineData)
    }, [showMobileTabs])


    const history = useHistory()
    const currentPath = history.location.pathname;
    function selectTab(tab) {
        if (currentPath === tab.to) { return; }
        history.push(tab.to);
        changeShowMobileTabs(!showMobileTabs)
    }


    return (
        <Layout>
            <Header
                className={
                    classNames([jClass('pc', size.width > 768), jClass('mobile', size.width <= 768)])
                }
                style={{
                    position: 'fixed',
                    width: '100%',
                    height
                }}
            >
                <div className='header-wrap'>
                    <div className="header-logo">
                        {
                            jElement(
                                <div
                                    data-text="Weir.Shi's Blog"
                                    className="blog-name btn btn-ghost btn-border-stroke  btn-text-float-up"
                                >
                                    <div className="btn-borders">
                                        <div className="border-top"></div>
                                        <div className="border-right"></div>
                                        <div className="border-bottom"></div>
                                        <div className="border-left"></div>
                                    </div>
                                    <span className="btn-text">Weir.Shi's Blog</span>
                                </div>,
                                size.width > 768
                            )
                        }
                        {
                            jElement(
                                <div className="blog-name">
                                    <span className="btn-text">Weir.Shi's Blog</span>
                                </div>,
                                size.width <= 768
                            )
                        }
                    </div>
                    {
                        jElement(
                            <HeaderTabView tabs={tabs} />,
                            size.width > 768
                        )
                    }

                    {
                        jElement(
                            <div className="toggle" onClick={() => {
                                changeShowMobileTabs(!showMobileTabs)
                            }}>
                                {
                                    toggleLineData.map((line, index) => 
                                        <span
                                            className="toggle-line"
                                            key={index}
                                            style={{
                                                width: line.width,
                                                top: line.top,
                                                transform: line.transform,
                                                opacity: line.opacity,
                                                transition: 'all .3s'
                                            }}
                                        ></span>
                                    )
                                }
                                
                            </div>,
                            size.width <= 768
                        )
                    }
                </div>
                {
                    jElement(
                        <div className='mobile-tab-wrap'>
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
                        </div>,
                        size.width <= 768 && showMobileTabs
                    )
                }
            </Header>
            <Content
                className={classNames(['app-wrapper', jClass('show-tabs', showMobileTabs), jClass('pc', size.width > 768), jClass('mobile', size.width <= 768)])}
            >
                <C.Provider value={{ screenWidth: size.width, showRightNav, changeShowRightNav }}>
                    <Routes />
                </C.Provider>
            </Content>
            <Footer>
                <div className="footer-wrap">
                    <p>本站由 @Weir.Shi 创建 - © 2020.苏ICP备19022770号-1</p>
                    <p>
                        <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                            <img alt="知识共享许可协议" style={{ borderWidth:0 }} src={licenseImg}/>
                        </a><br />
                        本作品采用
                        <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
                            知识共享署名-非商业性使用-禁止演绎 4.0 国际许可协议
                        </a>进行许可。
                    </p>
                </div>
            </Footer>
            <BackTop visibilityHeight={100}>
                <div className='to-top'>
                    <i className="top-icon"></i>
                </div>
            </BackTop>
        </Layout>
    )
}

export default Main;
