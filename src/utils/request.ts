import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
  baseURL: (window.env?.VITE_API_URL || import.meta.env.VITE_API_URL || '/api'),
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const pathname = window.location.pathname;
    console.log('=================== 请求开始 ===================');
    console.log('请求拦截器 - 当前路径:', pathname, '- Token存在:', !!token);
    console.log('请求URL:', config.url, '请求方法:', config.method);
    
    // 添加调试信息
    if (token) {
      // 不使用WebCrypto API计算MD5(浏览器兼容性问题)
      console.log('前端Token前20字符:', token.substring(0, 20), '...');
      
      // 检查token是否有效格式
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          console.error('Token格式无效,不是标准JWT格式(三段式)');
        } else {
          console.log('Token三部分长度:', tokenParts[0].length, tokenParts[1].length, tokenParts[2].length);
          
          const header = JSON.parse(atob(tokenParts[0]));
          console.log('Token header:', header);
          
          const payload = JSON.parse(atob(tokenParts[1]));
          const expTime = payload.exp * 1000;
          const isExpired = Date.now() > expTime;
          console.log('Token信息:', {
            过期时间: new Date(expTime).toLocaleString(),
            是否过期: isExpired,
            用户ID: payload.sub,
            用户名: payload.username,
            角色: payload.role
          });
          
          console.log('Token签名部分(前10字符):', tokenParts[2].substring(0, 10));
        }
      } catch (err) {
        console.error('Token解析错误:', err);
      }
      
      config.headers.Authorization = `Bearer ${token}`;
      console.log('已添加Authorization请求头');
    } else {
      console.warn('未找到token,请求将不包含Authorization头');
    }
    
    return config;
  },
  (error) => {
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('=================== 响应成功 ===================');
    console.log('响应URL:', response.config.url, '状态码:', response.status);
    return response;
  },
  (error) => {
    console.log('=================== 响应错误 ===================');
    console.error('错误对象:', error);
    
    if (error.response) {
      const { status, data, config } = error.response;
      console.error(`响应错误: ${status}`, `URL: ${config.url}`, `数据:`, data);
      
      // 在登录页面，不处理 401 错误
      const isLoginPage = window.location.pathname === '/' || window.location.pathname === '/login';
      console.log('响应拦截器 - 错误状态:', status, '当前路径:', window.location.pathname, '是登录页:', isLoginPage);
      
      switch (status) {
        case 401:
          // 未登录或 token 过期
          if (!isLoginPage) {
            console.log('401错误 - 重定向到登录页');
            message.error('请重新登录');
            localStorage.removeItem('token');
            window.location.href = '/'; // 修改为重定向到根路径
          } else {
            console.log('401错误 - 在登录页，不重定向');
          }
          break;
        case 403:
          console.error('403错误 - 没有权限', data);
          message.error('没有权限');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error(data?.message || '请求失败');
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      message.error('服务器无响应，请稍后重试');
    } else {
      // 请求配置出错
      message.error('请求错误：' + error.message);
    }
    
    return Promise.reject(error);
  }
);

export default request; 