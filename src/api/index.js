// blog API
import { cryptoInstance, URL_DIC } from "@/public/fetch";

/**
 * @file blog apis
 * @description 获取所有分类
 * @author WeirShi
 * @date 2010-11-02
 */

export const FetchGetAllCategory = (params, config) => cryptoInstance.get(URL_DIC.blogAllCategory, { params, ...config});

/**
 * @file blog apis
 * @description 获取所有标签
 * @author WeirShi
 * @date 2010-11-02
 */
export const FetchGetAllTag = (params, config) => cryptoInstance.get(URL_DIC.blogAllTag, { params, ...config });

/**
 * @file blog apis
 * @description 文章列表 分页
 * @author WeirShi
 * @date 2010-11-02
 */

export const FetchGetArticleList = (params, config) => cryptoInstance.get(URL_DIC.blogArticleList, { params, ...config });

/**
 * @file blog apis
 * @description 文章详情
 * @author WeirShi
 * @date 2010-11-08
 */
export const FetchArticleDetail = (params, config) => cryptoInstance.get(URL_DIC.blogArticleDetail, { params, ...config });

/**
 * @file blog apis
 * @description 文章增加观看次数
 * @author WeirShi
 * @date 2010-11-08
 */
export const FetchAddWatchTimes = (params, config) => cryptoInstance.put(URL_DIC.blogArticleWatchTimesAdd, params, config);

/**
 * @file blog apis
 * @description 前一篇、后一篇文章
 * @author WeirShi
 * @date 2010-11-16
 */
export const FetchArticlePreOrNext = (params, config) => cryptoInstance.get(URL_DIC.blogArticleNext, { params, ...config });

/**
 * @file blog apis
 * @description 文章增加点赞次数
 * @author WeirShi
 * @date 2010-11-16
 */
export const FetchAddLikeTimes = (params, config) => cryptoInstance.put(URL_DIC.blogArticleLike, params, config);

/**
 * @file blog apis
 * @description 根据标签获取文章列表
 * @author WeirShi
 * @date 2010-11-17
 */
export const FetchArticleListByCategoryOrTag = (params, config) => cryptoInstance.get(URL_DIC.blogArticleListByCategoryOrTag, { params, ...config });
