# Hash jump design

## hashchange & popstate
* `hash change`触发条件：url的hash值被改变(没有到有，有到更多，更多到更少，有到没有)
  * `location.href += '#hash'`
  * `history.back()` or `history.forward()`对bred的改变，涉及到了hash改变
  * `location.hash` 的字符串改变操作
* `popstate`触发：只在浏览器行为，跳转两个history entries时触发
  * `history.pushState（state, title, href）`如果触发hash跳转，为history添加新的值，不触发`popstate`，浏览器不刷新（不是浏览器行为）
  * `history.replaceState`如果更改当前hash，不为history添加新的值，不触发`popstate`，浏览器不刷新（不是浏览器行为）
  * `location.href += '#hash'`会触发hash跳转，为history添加新的值
  * `history.forward()` & `history.back()`同样触发`popstate`
* 不理解的地方
  * `history.pushState（state, title, href）`不会触发上诉任何响应，即使涉及到hash改变。
  
## event handler
* `popstate`可以通过e.state获取push进去的state的值
* `history.pushState/replaceState（state, title, href）`可做如下改变
  * href改变当前的最末尾文件名，eg：为href传值`abc.txt`,tmall.com/test.html变成了`tmall.com/abc.txt`；
  * href改变hash和parameter，eg：为href传值`?123`,或者`#123`,tmall.com/test.html变成了`tmall.com/test.html?123`或者`tmall.com/test.html#123`；
* 改变state可以起到剪短url的功能。用户刷新页面，浏览器会直接load这个被改变后的地址
