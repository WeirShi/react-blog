const baseUrl = `${process.env.REACT_APP_API_URL}/blog`;
const urlDictionary = {
  blogArticleList: `${baseUrl}/article/list`, // 前台文章列表
  blogArticleDetail: `${baseUrl}/article/detail`, // 前台文章详情
  blogArticleNext: `${baseUrl}/article/next`, // 前一篇、后一篇文章
  blogArticleLike: `${baseUrl}/article/like`, // 前台文章点赞
  blogArticleWatchTimesAdd: `${baseUrl}/article/watchtimes/add`, // 前台文章增加访问次数
  blogAllCategory: `${baseUrl}/category/all`, // 所有分类
  blogAllTag: `${baseUrl}/tag/all`, // 所有标签
  blogArticleListByCategoryOrTag: `${baseUrl}/article/by/categoryortag` // 根据标签获取文章列表
};

export default urlDictionary;
