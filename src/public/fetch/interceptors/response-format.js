
export function responseInterceptor(response) {
  // 这里可以对response进行自定义并返回
  return response?.data;
}
