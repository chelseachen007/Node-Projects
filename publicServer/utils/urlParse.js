const url = require("url");
let urlParse = url.parse(
  "https://usr:pwd@juejin.com:8080/a/b/c/d?q=js&cat=3&#hash"
);
console.log(urlParse);

// Url {
//   // 请求协议，比如 http、https、ftp、file 等
//   protocol: 'https:',
//   // 协议的 : 号有没有 /
//   slashes: true,
//   // url 的认证信息，跟上 @ 来区分认证部分和域名部分
//   auth: 'usr:pwd',
//   // url 的主机名
//   host: 'juejin.com:8080',
//   // 主机端口号
//   port: '8080',
//   // 主机名
//   hostname: 'juejin.com',
//   // 锚点部分，用 # 标识
//   hash: '#hash',
//   // 查询参数，包含 ?
//   search: '?q=js&cat=3&',
//   // 查询参数的字符串部分，不包含 ?
//   query: 'q=js&cat=3&',
//   // url 中的路径部分
//   pathname: '/a/b/c/d',
//   // 完整路径，由 pathname 和 search 组成
//   path: '/a/b/c/d?q=js&cat=3&',
//   // 链接地址
//   href: 'https://usr:pwd@juejin.com:8080/a/b/c/d?q=js&cat=3&#hash'
// }
