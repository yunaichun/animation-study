module.exports = {
  // 根目录
  root: true, 
  // 使用 standard 标准：https://standardjs.com/
  extends: 'standard',
  // 插件：required to lint *.vue files
  plugins: [
    'html'
  ],
  // 环境
  env: {
    browser: true,
    node: true
  },
  /*规则：https://www.cnblogs.com/my93/p/5681879.html
    "off" or 0 关闭规则
    "warn" or 1 打开规则，出现警告提示
    "error" or 2 打开规则，出现错误提示
  */
  rules: {
    'spaced-comment': 0, // 注释前不需要空格
    'indent': [2, 4], // 缩进为4行
    'eol-last': [2, 'always'], // 文件结尾需要一个空行
    'space-before-function-paren': [2, 'always'], // 函数之后必须要添加一个空行
    'semi': [2, 'always'], // 必须要有分号
    'no-multiple-empty-lines': [2, { 'max': 2 }], // 最多允许2个空行
    'no-tabs': [2, { allowIndentationTabs: true }] // 允许 tabs
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  // 全局变量
  globals: {
    $: true
  }
  // parser: 'babel-eslint',
  // parserOptions: {
  //   sourceType: 'module'
  // }
}
