## 缘由
* 如何让一个前端程序员的群热闹起来？某天一位同学问tmall首页某个请求是不是应该改成`get`，立马引来了一场热烈的讨论，然后我就接下了一个任务（躺着中枪）。虽然记得一些结论，但苦于没实际数据和原理支撑，so有了如下这篇类似挖坟的报告加上自己的一点点狂想。。。

## 定义上的区别
* w3.org对Http/1.1中的get和post方法做了如下定义上的区别[[1]](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html).
    * `Get`:检索由uri所指定资源标识的资源。
        * 画蛇添足的解释下：get是发送查询条件，获取该条件下的资源。查询的条件写在uri内，准确的说是uri定义中**[scheme:][//authority][path][?query][#fragment]**的`[?query]`内。
        * 所以对一个http request 消息而言，get方法不会在body内填写数据内容，数据全部在header里面。
        * ![img](http://wiki.ued.taobao.net/lib/exe/fetch.php?w=300&media=user:chengfeng:workdoc:businessref:http_message.png)
    * `Post`:请求服务器将request中的实例作为当前uri的的从属接收。
        * 详细而言，uri标识数据需要传送的地址，而在http request 消息的body内传递数据的实际内容
* 为了方便浏览器设计和服务器处理，因而w3.org定义了这两个不同的处理方法。具体内容不在本文的讨论范围。推荐阅读[[1]](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)


## 浏览器的处理
* 某些浏览器在发送http请求时，会根据type=`post` 或者 `get` 而分别发送`>=2` 或者 `1`g个包请求[[2]](http://developer.yahoo.com/performance/rules.html#ajax_get)
  * 根据研究报告:《就性能上研究两个浏览器的特性》[[3]](http://www.cnxct.com/wp-content/uploads/2011/08/Analysis_of_browser_specific_characteristics.pdf)中4.3节：浏览器是否使用超过1个包来发送XHR post请求，在windows xp下，Chrome5.* 以下、IE8以下，都使用2个或更多的包来发送post请求，FF使用一个。（其余操作系统的详细研究请阅读报告）
  * 使用java的MIDP简单描述这个过程如下
```
		conn = (HttpConnection) Connector.open( url ); //建立连接
		conn.setRequestProperty( "User-Agent", agent ); //设置请求头

		int rc = conn.getResponseCode(); //取得响应
		// ....
		// MIDP实现POST的过程(encodedData为post数据)：
		conn = (HttpConnection) Connector.open( url ); //建立连接
		conn.setRequestMethod( HttpConnection.POST ); //设置请求头
		conn.setRequestProperty( "User-Agent", agent );
		conn.setRequestProperty( "Content-Type", type );
		conn.setRequestProperty( "Content-Length", 
        encodedData.length() );
 
		OutputStream os = conn.openOutputStream(); //发送数据
		os.write( encodedData.getBytes() );
 
		int rc = conn.getResponseCode(); //取得响应
```
  * 在上述代码的`OutputStreamos= conn.openOutputStream();`行操作中，如果是get方法，将不会进行。因为少了这一个包的发送。
  * 总之，只要有一个`主流浏览器`存在该问题，我们就应该去面对其影响

## 影响和实验
* 浏览器使用超过1个包来发送post请求的影响：
    * 积极：
        * 在头信息中将数据信息的详情已经交代清楚了，方便服务器准备和接受数据
        * 减小了单次传送数据的大小
    * 消极：
        * 每次请求的发送，浏览器都会有许多`准备活动`,这会造出时间消耗
        * 每次完整的http request消息，必须等多次请求全部到达完毕后才会开始处理数据，因而总是在`最慢`的那条消息达到后才能开始处理，这就是同步成本，针对不同的网络情况会有所不同。
        * 在请求从浏览器发送到服务器的过程中，会经过多个步骤的处理（路由、代理、转发。。。）更可能造出延迟。当丢包率固定的情况下，请求次数越多，丢包越多，重发的时间成本更高。
* 本着不重复造轮子(实际就是懒)的原则，多种丢包率下的研究细节见：[[3]](http://www.cnxct.com/wp-content/uploads/2011/08/Analysis_of_browser_specific_characteristics.pdf)中给出了研究数据。在本地进行了简单的实测,测试用例来至[[4]](http://www.oncoding.cn/)
    * 条件：
        * 发送数据：Here we don't need benchmarks, as the results are quite pronounced and Yahoo!'s team has studied the situation carefully. However, I will show you some AJAX and ASP.NET code snippets, just as a reminder or refresher. This is what I changed in my programs to improve the performance. First, here is the fast GET version.
        * JS：使用原生XMLHttpRequest 或 ActiveXObject
        * 操作系统：mac os 10.8.2
            * ![chrome](http://wiki.ued.taobao.net/lib/exe/fetch.php?w=300&media=user:chengfeng:workdoc:businessref:chrome-30.0.1599.69.jpg)
            * ![safari](http://wiki.ued.taobao.net/lib/exe/fetch.php?w=300&media=user:chengfeng:workdoc:businessref:safari-6.0.5.jpg)
            * ![firefox](http://wiki.ued.taobao.net/lib/exe/fetch.php?w=300&media=user:chengfeng:workdoc:businessref:ff-23.0.1.jpg)
        * 操作系统：windows7
            * ![IE8](http://wiki.ued.taobao.net/lib/exe/fetch.php?w=300&media=user:chengfeng:workdoc:businessref:ie8.jpg)
    * 结果：**除了FF以外，其余浏览器的get方法比post方法在本实验的条件下更快**。

## 深入一下

### 服务器的特性（本小结来缘由 @道璘 同学的提醒）
* 代理服务器缓存（proxy server caching）简言之就是在代理服务器上保存客户端所请求的文件的备份，而达到重复请求的快速响应。详细内容可参看apache服务器[[5]](http://trafficserver.apache.org/docs/trunk/admin/http-proxy-caching/index.en.html#UnderstandingHTTPWebProxyCaching)和IBM Sphere[[6]](http://pic.dhe.ibm.com/infocenter/wasinfo/v8r0/index.jsp?topic=%2Fcom.ibm.websphere.edge.doc%2Fcp%2Fadmingd25.html)的介绍。对本文而言，代理服务器缓存的特性存在如下影响：
    * **不会缓存除`get`之外的所有其他HTTP请求**
    * 通常而言，如果在请求头中加入了`Cache-Control: no-cache`、`Cache-Control: private`、`Authorization`、`Cache-Control: no-store`中的任意一个，代理服务器也不会缓存。当然不同服务器有不同的处理逻辑，不在本文的讨论范围内

### 伟大的IE
* `get`方法，数据是通过uri传递的，w3.org的http协议没有限制其长度，但IE限制了，而且搞得很离谱。IE对URL长度的限制是2083字节(2K+35)，该限制受服务器、操作系统和浏览器版本所影响而不同。
    * 实际操作中，不建议使用get方法传递超过`1K`的数据，具体缘由哪位同学去研究下？
* `post`方法，微软的IIS因安全性考虑限制了数据大小[[7]](http://baike.baidu.com/link?url=nPVQoRM81DqBgovqbkGKX44wKSQSel9Br1sGqSv2XUdLqC2eBceEs2PbA0qczEVp)(ridiculous)。
    * IIS 6.0默认ASP POST数据量最大为200KB，`每个表单域限制是100KB`。
    * IIS 6.0默认上传文件的最大大小是4MB。
    * IIS 6.0默认最大请求头是16KB。
    * IIS 6.0之前没有这些限制

### 安全性
* 如果是通过js发送xhr request，get和post方法的安全性是相同的
* 对于form提交，二者存在如下区别
    * 使用get方式提交的form，其url会在浏览器的历史记录中存储。如果form内含有隐私信息，会很容易被获取
    * 其余详细的讨论见[[8]](http://www.cs.tut.fi/~jkorpela/forms/methods.html)
    * 此外，如果form不添加`method`，默认采用`get`。
* 对于`&lt;a&gt;`而言它只能使用get，所以一定要注意安全性。
* 关于安全性，可以扩展阅读[[9]](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.1.1)

### 关于压缩的狂想
* http协议，可以对内容进行编码，即对消息中的body部分进行编码[[10]](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3),可以进行gzip这种压缩格式等，以达到压缩和加密的作用。**当前在response中支持**。浏览器头中加入`Accept-Encoding: gzip, deflate`那么response中的head加入`Content-Type`、`Content-Length`(压缩后的大小)， 并且增加了`Content-Encoding:gzip`，并返回。浏览器根据压缩格式解析。
* 如blog[[11]](http://www.cnblogs.com/TankXiao/archive/2012/11/13/2749055.html)所示，www.cnblogs.com的首页使用压缩方式，减少了60%的数据大小，减小了网络负担，明显的提高了速度。
* 回归本文所讨论的话题，虽然当前只是在response中完美的支持的压缩，但未来这将扩散到request端，浏览器也会发送压缩数据。
* get方法是不能被压缩的，唯有post方法才能使用压缩。
    * 而压缩的基本方法是使用统一的简单字符替换内容中的重复字符，那么也只有当重复的数据达到一定数量时，压缩才能体现它的优势。
    * 压缩和解压也需要时间的，对js处理和用户体验而言，我们处理的都是未压缩的格式，如果那么在传输时间的节约和压缩时间的浪费上，到底是不是提升了性能，还得看不同情况而言

## 喜闻乐见的总结
### 坑
* form、a标签、script标签等默认使用`get`
* IIS 6.0限制单个表单域`post`的值的大小为`100k`,post最大为`200k`

### 最佳实践
* 能用`get`，就坚决不用`post`。
* 不涉及私密数据：`get`方法，反之，`post`方法。
* 数据小于1k：`get`方法，反之，`post`方法。