## 翻译：viewport双城记
* about：
    * 原文：[http://www.quirksmode.org/mobile/viewports.html](http://www.quirksmode.org/mobile/viewports.html)
    * 作者简介：
        * Peter-Paul Koch — mobile platform strategist, consultant, and trainer
        * [详细描述](http://www.quirksmode.org/about/)
    * 名词说明：
        * 本文所以的缩小、放大、缩放都指zoom操作。而非改变浏览器窗口的大小。
* 翻译内容：
    * viewport 双城记（part1）
        * 在这个迷你系列的文章里，我将解释`viewports`和多种重要的`HTML`标签元素的宽度是如何工作的，例如`<html>`标签。同样也会解释`window`和`screen`的宽度问题。

        * 第一部分主要关于桌面（pc）浏览器，基本目的在于为移动端（mobile）浏览器上，本话题的讨论创建舞台。绝大多数web开发人员已经对pc的概念有了直观的认识。mobile拥有相同的概念，但是更加复杂。如你所知，一个友好的预热将极大的帮助你理解mobile浏览器。

        * **概念：`设备的pixels`和`CSS的pixels`**
            * 首先你应当理解`CSS的pixels`，以及它和`设备的pixels`的区别
            
            * 我们姑且认定`设备的pixels`为正确（标准）的pixels宽度。这些pixels决定了你工作所用的那些设备上正式的分辨率。在大多数情况下，能够从`screen.width/height`上取出具体值。
            
            * 如果你为某个HTML元素赋值`width:128px`,你的显示器是1024px宽且你最大化了浏览器窗口。忽略后续所言的麻烦的部分，粗略的计算下，该显示器上能横排容纳（1024/128 = 8）个这种元素。
            
            * 如果用户缩放（`zoom`）了浏览器，当然必须改变计算方式。例如用户缩放了200%，上诉显示器只能横排容纳4个上诉元素了。
            
            * 现代浏览器上的缩放，是基于“伸展”pixels。结果是，html元素上的宽度并没有因为缩放200%而由128pix变成256px，而是真实的pixels的被计算成了双倍。html元素在形式上依然是128`CSS的pixels`，即便它占用了256`设备的pixels`
            
            * 换言之，缩放200%将一个单位的`CSS的pixels`变成了4倍的`设备的pixels`那么大，即宽度 * 2、高度 * 2，面积扩大了2 * 2.
            
            * 下列图片将清楚的解释这个概念。如图1-1.有4个1像素，缩放为100%的html元素，`CSS的pixels`完整的和`设备的pixels`重叠
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/csspixels_100.gif) 图1-1
            
            * 当我们缩小浏览器时，`CSS的pixels`开始收缩，导致1单位的`设备的pixels`上重叠了多个`CSS的pixels`，如图1-2
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/csspixels_out.gif) 图1-2
            
            * 同理，放大浏览器时，相反的事情发生了，`CSS的pixels`开始扩大，导致1单位的`CSS的pixels`上重叠了多个`设备的pixels`，如图1-3
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/csspixels_in.gif) 图1-3
            
            * 总体而言，你只需要关注`CSS的pixels`，这些pixels指定你的样式被如何渲染
            
            * `设备的pixels`几乎对你毫无用处。但对用户而言却不是这样。用户会缩放页面，直到他能舒服的阅读内容。但是你不需关心这些缩放级别。浏览器会自动的保证你的`CSS的pixels`会被伸展还是收缩。
            
            * `100% 缩放`
            
            * 本例设定缩放级别为100%。现在我们更严谨的定义，如下：
            
            > 在缩放级别为100%时，1单位的CSS的pixel是严格相等于1单位的设备pixel
            
            
            * 100%缩放的概念非常有利于表述接下来的内容，但你不必在日常工作中过度担忧这个问题。在桌面系统上，你通常会在100%缩放级别下测试你的网站，但即便用户缩放，`CSS的pixels`的魔法依然能保证你网站外观保存相同的比例
            
            * **`屏幕尺寸 Screen size`**
            
              --------            
              `screen.width/height`
              * 含义：用户的屏幕的完整大小
              * 度量：`设备的pixels`
              * 兼容性问题：`IE8`里，不管使用IE7模式还是IE8模式，都以`CSS 的pixels`来度量
            
              --------
            
            * 我们先了解一些特殊的尺寸：`screen.width` 和 `screen.height`。这两个属性包含了用户屏幕的完整宽度高度。这些尺寸使用`设备的pixels`来定义，他们的值不会因为缩放而改变：他们是显示器的特征，而不是浏览器。如图1-4所示。
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_screen.jpg) 图1-4
            
            * 很有趣吧？但是我们拿来何用呢？
            
            * 简单的说，木有用！用户的显示器宽度对我们而言不重要 - 除非你想要用他们做网络统计数据
            
            * **`浏览器尺寸 Window size`**

              --------            
              `window.innerWidth/Height`
              * 含义：包含滚动条尺寸的浏览器完整尺寸
              * 度量：`CSS的pixels`
              * 兼容性问题：`IE`不支持，`Opera`用设备pixels来度量
            
              --------
            
            * 相反的，你想要知道的浏览器的内部尺寸。它定义了当前用户有多大区域，可供你的`CSS`布局占用。你可以通过`window.innerWidth` 和 `window.innerHeight`来获取。如图1-5
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_inner.jpg) 图1-5
            
            * 显然，窗口的内部宽度使用`CSS的pixels`.你需要知道多少你自己定义的元素能塞入浏览器窗口，而这些数量会随着用户放大浏览器而减少（如图1-6）。所以当用户放大显示时，你能获取的浏览器窗口可用空间会减少，`window.innerWidth/Height`就是缩小的比例
            

            > Opera浏览器在这个问题上是一朵奇葩，当用户放大浏览器显示时不少。
            > 所以当用户放大显示时，你能获取的浏览器窗口可用空间会减少。
            > window.innerWidth/Height 却并不会减小。
            > 在桌面浏览器上，这个特性很烦人，但在移动设备浏览器上简直是致命的，后面我们会讨论
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_inner_zoomed.jpg) 图1-6
            
            * 注意，窗口内部宽度和高度的尺寸，包含了滚动条的尺寸。（这主要是来至于历史原因）
            
            * **`滚动移位 Scrolling offset`**

              --------            
              `window.pageX/YOffset`
              * 含义：页面的移位
              * 度量：`CSS的pixels`
              * 兼容性问题：无   
                     
              --------
            
            * `window.pageXOffset` 和 `window.pageYOffset`，定义了页面(`document`)的相对于窗口原点的水平、垂直位移。因此你能够定位用户滚动了多少的滚动条距离。如图1-7
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_page.jpg) 图1-7
            
            * 该属性也以`CSS的pixels`来度量.同上面的问题，你想要知道在用户放大窗口的情况下，用户向上滚动了多少的滚动条。
            
            * 原理上来说，在用户放大浏览器时，向上滚动了页面，`window.pageX/YOffset`会改变。但当用户放大页面时，浏览器会尝试着保存用户当前可见的页面的元素依然在可见位置。虽然该特性表现得不如预期，但它意味着：`在理论上` 该情况下 `window.pageX/YOffset`并没有改变，被用户滚出屏幕的`CSS的pixels`几乎保存不变。如图1-8。
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_page_zoomed.jpg) 图1-8

        * **概念：`视窗 viewport`**
        
            * 在我们继续讨论更多的`JavaScript`的`特性properties`之前，先介绍另外一个概念：viewport
            
            * viewport的功能在于控制你网站的最高块状（`block`）容器：`<html>`元素.
            
            * 听起来有点玄乎，举个例子~假设你定义了一个可变尺寸的布局（liquid layout），且你定义一个侧边栏的宽度为`width: 10%`。当你改变浏览器窗口大小时，该侧边栏会自动扩张和收缩。这是什么原理呢？
            
            * 技术上讲，原理是侧边栏的宽度为它父元素宽度的10%，我们设它的父元素是`<body>`且你未指定宽度。那么问题就变为了`<body>`的宽度到底是多少？
            
            * 通常，一个块级元素占有起父元素的100%的宽度（这里有异常情况，暂时忽略）。所以`<body>`的宽度就是其父元素`<html>`的宽度。
            
            * 那么`<html>`元素到底有多宽？因为它的宽度恰好为浏览器的宽度。所以你的侧边栏宽度`width: 10%`会占用10%的浏览器宽度。所以的web开发人员都直观的知道和使用该特性了。
            
            * 但是你也许不知道原理。在原理上，`<html>`的宽度受viewport所限制，`<html>`元素为viewport宽度的100%。
            
            * 反过来，viewport是严格的等于浏览器的窗口：定义就是如此。viewport不是一个HTML的概念，所以你不能通过CSS修改它。它就是为浏览器窗口的宽度高度 - 在桌面浏览器上如此，移动设备浏览器上有点复杂。
            
            * **`影响 Consequences`**
            
            * 缩放事件有一些奇怪的影响，你可以在本站上实验（[http://www.quirksmode.org/mobile/viewports.html](http://www.quirksmode.org/mobile/viewports.html)）。页面滚动到最上面，放大浏览器2-3倍，网站的宽度会超过浏览器窗口。再将页面滚动到最右边，你会发现网站最上面的蓝色栏目不再对齐了。如图2-1
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_htmlbehaviour.jpg) 图2-1（作者还在玩IE6!）
            
            * 这个效果反应了viewport是如何被定义的。我定义了最上面蓝色栏目的宽度为`width: 100%`。什么的100%？当然是`<html>`的宽度，同样是viewport的宽度，同样是浏览器窗口的宽度。
            
            * 重点：缩放比例100%的情况下很正常，现在我们放大浏览器，viewport变得比网站的总宽度更小。对viewport无影响，但页面的内容溢出了`<html>`元素，但它却有属性`overflow: visible`。意味着溢出的部分依然会被显示。
            
            * 但蓝色栏目却不会溢出。我定义了它宽度为`width: 100%`，结果浏览器为他赋值宽度为viewport的宽度。浏览器不会在乎这个栏目的宽度是不是过窄了。如图2-2
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_100percent.jpg) 图2-2
            
            * **`页面宽度 document width` ?**
            
            * 我真正想要知道的是页面内容的总大小，包括超出浏览器窗口的部分。到目前为止，据我所知并没有办法找到这个值（当然，除非你计算页面所有部分的宽度包括所有元素的margin，但是这种计算很容易出错）
            
            * 我开始相信我们需要一个JavaScript特性对(property pair)来标示我所谓的`页面宽度 document width`(当然，以`CSS的pixels`来度量)。如图2-3
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_documentwidth.jpg) 图2-3
            
            * 如果我们真的感觉对这事儿很烦躁：为什么不在CSS中揭露这些值？我期望定义`width: 100%`来控制页面蓝色栏目的宽度，它基于页面的宽度而不是`<html>`元素的宽度。这似乎很棘手(This is bound to be tricky）,如果这成功的被实现我也不会感倒惊讶
            
            * **`度量viewport Measuring the view port`**

              --------            
              `document. documentElement. clientWidth/Height`
              * 含义：viewport的尺寸
              * 度量：`CSS的pixels`
              * 兼容性问题：无   
                     
              --------
            
            * 你也许想要知道viewport的尺寸，他们可以通过`document. documentElement. clientWidth/Height`来获取。如图2-4
            
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_client.jpg) 图2-4
            
            * 如果你熟悉DOM，你会知道`document.documentElement`实际上就是`<html>`元素：HTML文档的根元素。然而viewport是比`<html>`更高级别的元素，打个比喻，它是容纳`<html>`元素的元素。那会和你是否给`<html>`元素赋值width相关（我不建议这么做，但是却是可行的）
            
            * 在那种情况下`document. documentElement. clientWidth/Height`依然给出了viewport的尺寸，而不是`<html>`元素。（这是特殊的规则只针对这个特殊的元素针对这个特性对。在其余任何情况下元素使用实际的宽度）如图2-5。为`<html>`元素赋值25%。但`document. documentElement. clientWidth/Height`的值不变。它虽然貌似从`<html>`元素取值，但实际描述的确是viewport的尺寸。
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_client_smallpage.jpg) 图2-5

            * 所以`document. documentElement. clientWidth/Height`只会给出viewport的尺寸，而不管`<html>`元素尺寸如何改变
            
            * **`两个特性对 two property pairs`**
            
            * 但是viewport的尺寸不是也通过`window.innerWidth/Height`来描述的么？嗯，是，也不是。
            
            * 这两个特性对有严格的区别，几乎算是吹毛求疵了
            
                * `window.innerWidth/Height`包含滚动条
                * `document. documentElement. clientWidth/Height`不包含
                
            * 我们能获取这两个特性对是因为他们是`浏览器大战`的残留。过去`Netscape`只支持`window.innerWidth/Height`，`IE` 只支持`document. documentElement. clientWidth/Height`。从那时候开始所有其余浏览器都支持这两个特性。但IE一直未支持`window.innerWidth/Height`
            
            * 在桌面系统中，拥有这两个特性对只是一点小麻烦，但在移动设备中却变成了一种`祝福`。后面我们会看到
            
            * **`度量<html>元素 measuring the <html> element`**
            
              --------            
              `document. documentElement. offsetWidth/Height`
              * 含义：`<html>`的尺寸
              * 度量：`CSS的pixels`
              * 兼容性问题：IE用这个值标示viewport的尺寸而非`<html>`   
                     
              --------
            * 如果`clientWidth/Height`一直用以标示viewport的尺寸，我们该如何去获取`<html>`元素的尺寸呢？--- `document.documentElement.offsetWidth/Height`。如图2-6
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_offset.jpg) 图2-6
            
            * 这个特性对真实的让你访问块级元素`<html>`元素，如果你为`<html>`元素赋值了宽度，offsetWidth会真实的反应出来。如图2-7
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_offset_smallpage.jpg) 图2-7
            
            * **`事件坐标 Event coordinates`**
            
              --------            
              `pageX/Y, clientX/Y, screenX/Y`
              * 含义：见下文
              * 度量：见下文
              * 兼容性问题：IE不支持pageX/Y,IE使用`CSS pixels`来度量screanX/Y
                     
              --------
            
            * 详细描述
            
                * `pageX/Y`：从`<html>`原点到事件触发点的`CSS 的 pixels`
                * `clientX/Y`：从`viewport`原点（浏览器窗口）到事件触发点的`CSS 的 pixels`
                * `screenX/Y`：从用户显示器窗口原点到事件触发点的`设备 的 pixels`。
                
            * 如图2-8、2-9和2-10
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_pageXY.jpg) 图2-8
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_clientXY.jpg) 图2-9
            
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_screenXY.jpg) 图2-10
            
            * 9成可能你会用到`pageX/Y`而1成左右会使用`clientX/Y`,`screenX/Y`基本没啥用
            
            * **`Media查询 media queries`**
        
              --------            
              `media queries`
              * 含义：见下文
              * 度量：见下文
              * 兼容性问题：IE不支持.
                  * `Firefox`使用`screen.width/height`来做为`device-width/height`的判定值。该值以`CSS的pixels`来度量
                  * `Chrome & Safari`使用`documentElement .clientWidth/Height`即viewport的值来作为`width/height`的判断值。该值以`设备的pixels`来度量
                     
              --------

            * 最后一点文字关于`@media`的css属性。出发点很简单：你可以根据页面的特定宽度来定义特殊的CSS规则。举个例子。
          

             > div.sidebar {             
	         >     width: 300px;	         
             > }
			 > 
             > @media all and (max-width: 400px) {   
     	     > // styles assigned when width is smaller than 400px;
     	     > 
	         >    div.sidebar {    
	         >         width: 300px;
         	 >    }

             > }
        
            * 如果宽度大于400px，那么sidebar宽度为300px。反之，sidebar宽度为100px
        
            * 有两个相关的`media查询`：` width/height` 和 `device-width/device-height`。如图2-11

              --------
                * `device-width/height`使用`screen.width/height`来做为的判定值。该值以`设备的pixels`来度量
                * `width/height`使用`documentElement .clientWidth/Height`即viewport的值。该值以`CSS的pixels`来度量
                     
              --------
        
            * ![image](http://www.quirksmode.org/mobile/pix/viewport/desktop_mediaqueries.jpg) 图2-11
        
            * 到底该使用那个呢？一个很无脑的结果：`width`。web开发中不需要对设备的宽度感兴趣，而`width`却使按照浏览器窗口的大小计算的
        
            * 所以在桌面浏览器中使用`width`而忘记`device-width`。接下来我们会看到在移动设备中有点凌乱
        
        * `总结`
        
            * 在此结束对桌面浏览器的特性的简短讨论，第二部分主要涉及移动设备和其与桌面浏览器的重要区别

    * viewport 双城记（part2）
    
        * 在这个迷你系列的文章里，我将解释`viewports`和多种重要的`HTML`标签元素的宽度是如何工作的，例如`<html>`标签。同样也会解释`window`和`screen`的宽度问题。
        
        * 本页我们将讨论移动设备的浏览器。如果你是移动开发的纯菜，建议先阅读第一部分：关于pc浏览器，以建立基本的概念
        
        * **`移动设备浏览器的问题`**
        
        * 设备的宽度是移动设备浏览器和桌面浏览器的最大区别。移动设备的显示通常比桌面浏览器显示同一网站的内容要少。或者缩放浏览器变小导致文字无法阅读，或者只显示网站适合设备大小的部分内容。
        * 移动设备的屏幕宽度比桌面浏览器小，经常最大就400px宽，而且通常会更小。（有些手机号称大宽度，但他们确是在说谎 - 或起嘛给了我们一些无用的信息）
        
        * 一些中间宽度的pad设备(table device)如iPad或传说中HP的webOS设备填补了桌面和移动设备的缺口，但却没有解决根本的问题。网站还是必须在移动设备上工作，我们不得不让她们在小屏幕上显示得表现良好。
        
        * 问题的风暴中心在于CSS，特别是viewport的尺寸。如果我们只是拷贝桌面的样式到移动设备，我们的CSS会丑得崩溃
        
        * （假设移动设备的宽度400px）我们回到`width: 10%`的侧边栏。如果在移动设备上同理处理，会显示出40px宽，实在太窄了。你的可变布局看起来被可怕的压扁了。
        
        * 其中一个解决方式是为移动设备重新建设一个特殊的网站。即使跳开这些基本的问题：你到底该怎么处理，现实的问题是只有很少的站长准备好了加入迎合移动设备而做的改变。
        
        * 移动设备浏览器供应商期望他们的客户端提供最好的可能性体验，即现在意味着“尽可能的像桌面浏览器”。因此许多处理手段是必须的。
        
        * **`两种viewport`**
        
        * 因此viewport太窄，不能很好为你的基本CSS布局服务了。最显然的解决方式是让viewport更宽。因此这个需求分为了2个方面：虚拟的viewport`visual viewport`和布局的viewport`layout viewport`。
        
        * George Cummins在Stack Overflow上解释了这个基本概念，[猛击](http://stackoverflow.com/questions/6333927/difference-between-visual-viewport-and-layout-viewport)
        
        > 想象下`layout viewport`是一张大的不能改变大小和角度的图片。现在你有个更小的框来观看这张大图片，这个框被不透明的材料包围，因而你只能看到大图片的一部分。你通过这个框子看到的大图片的部分被称为虚拟viewport(visual viewport)。你能拿着这个框站得离大图片远点（用户的缩小页面功能），以一次性看到这个大图片。或者你能站得近点（用户的放大页面功能）以看到一部分。你能改变这个框子的方向，但这张大图片的大小和形状都不会改变。

        * 你可以参见[解释详情](http://stackoverflow.com/questions/7344886/visual-viewport-vs-layout-viewport-on-mobile-devices)by Chris
        
        * `visual viewport`是当前显示在屏幕上的部分页面。用户会滚动页面来改变可见部分，或者缩放浏览器来改变`visual viewport`的尺寸。见图1-1.
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_visualviewport.jpg) 图1-1
        
        * 但是CSS 布局，特别是感性的宽度（percentual widths）通常是按照`layout viewport`来定义，而比`visual viewport`宽很多
        
        * 然而`<html>`元素的宽度继承于`layout viewport`，你的CSS应预先准备着需要处理的屏幕(`layout viewport`)是不是远远超过手机屏幕宽度。这用以保证你的网站外观特性而恰如在桌面浏览器上一样
        
        * `layout viewport`到底有多宽？每个浏览器都不同。iPhone上的Safari使用980px、Opera 850px，安卓的Webkit核心800px，IE974px。
        
        * **一些浏览器有特别的特性**
        
          ------
            * 塞班webkit试着保存`layout viewport`和`visual viewport`同样宽度。因此，定义百分比宽度的元素会变得巨难看。当然，如果页面有特定的宽度而不是适合`visual viewport`的宽度，那么该宽度的最大值会被设置为850px
            * 三星的WebKit([bada](https://zh.wikipedia.org/zh/Bada_(%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F))上)会设置`layout viewport`和最宽的元素一样宽
            * 黑莓上`layout viewport`和`visual viewport`在100%缩放时一样宽。
        
          ------
        
        * `缩放 Zooming`
        
        * 两种viewports都以`CSS的 pixels`来度量。当你通过缩放改变`visual viewport`时，`layout viewport`保存不变。
        
        * `理解layout viewport`
        
        * 为了理解`layout viewport`的尺寸，我们先看下页面完全缩小时发生了什么。许多移动设备浏览器在初始默认打开以最小缩放模式打开网站。（即在手机屏幕上展示完整宽度的页面）。如图1-2.
        
        * 重点：浏览器已经选择好他们的`layout viewport`的尺寸，它完整的覆盖了最小缩放模式下的移动浏览器的屏幕。
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_viewportzoomedout.jpg) 图1-2
        
        * 这时候`layout viewport`的宽度高度和最小缩放模式下能在页面上显示的内容的宽度高度一致。即便用户缩放，它依然保存不变。如图1-3
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_layoutviewport.jpg) 图1-3
        
        * `layout viewport`宽度通常保存不变。如果你旋转你的手机，`visual viewport`改变，但浏览器会缩放页面以自适应，以达到`layout viewport`再次和`visual viewport`同样宽。如图1-4。
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_viewportzoomedout_la.jpg) 图1-4
        
        * 这影响到了`layout viewport`的高度，它突然变得比竖着模式更小（portrait model肖像模式），但web开发者并不关心高度，只在乎宽度。如图1-5.
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_layoutviewport_la.jpg) 图1-5
        
        * `度量layout viewviewport`
        
          --------                    
            `document. documentElement. clientWidth/Height`
            * 含义：`layout viewport`尺寸
            * 度量：`CSS的pixels`
            * 完整支持：Opera, iPhone, Android, Symbian, Bolt, MicroB, Skyfire, Obigo
            * 问题：在Iris上它标示`visual vieport`
                * 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
                * `FireFox`以`设备的pixels`来度量
                * `IE`返回1024 x 768 px，而准确的尺寸保存在`document.body.clientWidth/Height`
                * `NetFront`仅当100%缩放时候才正确
                * 塞班的Webkit1(在S60v3设备)不支持这些属性
            * 不支持：黑莓
                     
         --------
        
        * 很幸运浏览器由于`浏览器大战`而遗留给我们2个特性对来度量这两种viewport
        
        * `document.documentElement.clientWidth/Height`传递`layout viewport`的尺寸，如图1-6
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_client.jpg)图1-6
        
        * 旋转只关系到高度，而不是宽度。如图1-7
        
        *![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_client_la.jpg)图1-7
        
        * `度量visual viewport`
        
          --------                    
            `window.innerWidth/Height`
            * 含义：`visual viewport`尺寸
            * 度量：`CSS的pixels`
            * 完整支持：iPhone, Symbian, BlackBerry
            * 问题：
                * `FireFox`和`Opera`以`设备的pixels`返回该数值
                * Android, Bolt, MicroB, 和 NetFront 以`CSS的pixels`返回该数值，且为`layout viewport`的值
            * 不支持：
                * IE，它使用`document. documentElement. offsetWidh/Height`来表示
                * 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
            * 混乱：Iris, Skyfire, Obigo返回的值不知所云
                     
         --------
        
        * 我们使用`window.innerWidth/Height`来度量`visual viewport`。显然，随着用户缩放浏览器，这值会改变，更多、更少的CSS pixels放进了屏幕。如图1-8
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_inner.jpg)图1-8
        
        * 很不幸这是一个待完善的部分，许多浏览器依然没有支持对`visual viewport`的度量。到现在为止，没有浏览器将该度量存储在其他地方，我猜测`window.innerWidth/Height`会成为标准，albeit是最强力的支持者
        
        * `屏幕`
        
          --------                    
            `screen.width and screen.height`
            * 含义：屏幕尺寸
            * 度量：`设备的pixels`
            * 完整支持：Opera Mini, Android, Symbian, Iris, Firefox, MicroB, IE, BlackBerry
            * 问题：
                * `Opera`在Windows Mobile下只给出横向尺寸(landscape size)。在S60上工作正确
                * 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
                * `iPhone`和`Obigo`仅给出竖直尺寸(portrait sizes)
                * Android, Bolt, MicroB, 和 NetFront 以`CSS的pixels`返回该数值，且为`layout viewport`的值
            * 不支持：
                * IE，它使用`document. documentElement. offsetWidh/Height`来表示
                * 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。否则就代表着`<html>`的尺寸
            * 混乱：Iris, Skyfire, Obigo返回的值不知所云
                     
         --------

        * 和pc浏览器一样，`screen.width/height`标示了设备屏幕的尺寸，以`设备的pixels`度量。和pc浏览器一样，作为web开发人员你永远不需要这些信息。你不关心屏幕的物理宽度，而关心当前有多少`CSS的pixels`能供你使用。如图1-8
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_screen.jpg) 图1-8
        
        * `缩放等级 Zoom level`
         
        * 无法直接获取缩放等级，但可以使用`screen.width`除以`window.innerWidth`来计算。当然，只有这两个特性被完美支持时才能使用。
        
        * 幸运的是，缩放等级并不重要。你只需要知道当前有多少`CSS的pixels`能供你使用。你可以从`window.innerWidth`获取这些信息 - 如果当前浏览器支持。
        * `滚动位移 scrolling offset`
        
          --------                    
            `window.pageX/YOffset`
            * 含义：见描述
            * 度量：`CSS的pixels`
            * 完整支持：iPhone, Android, Symbian, Iris, MicroB, Skyfire, Obigo
            * 问题：
                * Opera, Bolt, Firefox, and NetFront 总是返回 0.
                * 三星的Webkit核心浏览器，仅当在页面上写入`<meta viewport>`标签，才正确表示。
            * 不支持：
                * IE，它使用`document. scrollLeft/Top`来表示                     
           --------
           
        * 你同意需要知道当前`visual viewport`相对于`layout viewport`的距离。这就是滚动位移，如同在桌面浏览器一样，使用`window.pageX/YOffset`存储。如图1-9
        
        * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_page.jpg) 图1-9
        
        * `<html>元素`
        
          --------                    
            `document. documentElement. offsetWidth / Height`
            * 含义：`html`元素的整体尺寸
            * 度量：`CSS的pixels`
            * 完整支持：Opera, iPhone, Android, Symbian, Samsung, Iris, Bolt, Firefox, MicroB, Skyfire, BlackBerry, Obigo
            * 问题：
                * NetFront只在100%缩放时返回正确的值.
                * IE，使用这个特性对来表示`visual viewport`的尺寸。它使用`document. body. clientWidth/Height`来表示                     
           --------
           
         * 和在桌面系统一样,`document.documentElement.offsetWidth/Height`给出了`<html>`元素以`CSS的pixels`度量的尺寸。如图1-10
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_offset.jpg) 图1-10
         
         * `Media查询 media queries`
         
           --------                    
            `Media queries`
            * 含义：以`CSS 的pixels`度量`<html>`元素或以`设备 的pixels`度量设备
            * 完整支持：Opera, iPhone, Android, Symbian, Samsung, Iris, Bolt, Firefox, MicroB.
            * 不支持：Skyfire, IE, BlackBerry, NetFront, Obigo
            * 备注：
                * 我只测试了浏览器是否从正确的特性对里提取这些值。而特性对里的值是否正确并不在这里进行详细测试。                     
           --------
         
         * `media查询`如同桌面系统一样。`width/height`使用以`CSS的pixels`度量的`layout viewport`，`device-width/height`使用以`设备的pixels`度量的`设备屏幕（device screen）`
         
         * 换句话说，`width/height` 反映`document. documentElement. clientWidth/Height`的值, `device-width/height` 反映`screen.width/height`. (所有浏览器遵循同样原理，即使取值是错误的)。如图1-11.
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_mediaqueries.jpg) 图1-11
         
         * 哪个度量对web开发人员更有用呢？我也不知道。
         * 我起初认为`device-width`更重要，因为它给予了设备的信息，我们也许可以使用。例如，你能根据设备的宽度改变网站的外观。但是你同样可以使用`<meta viewport>`标签做到这些。因此使用`device-width`并不是必须的。
         
         * 那么`width`就更有用了么？也许是。浏览器的制造商认为他们给出了一些对网站有用的宽度的细节。但这些内容却含糊（混乱），因而`width` media 查询并不真正给出其余信息。
         
         * 所以我没有做决定。现在我认为`media查询`在标识网站处于桌面浏览器、pad浏览器或手机浏览器方面很重要，而在区别不同pad和手机设备方面并不有用
         
         * `事件坐标 Event coordinates`
         
           --------                    
            ` Event coordinates`
            * 含义：见下文
            * 度量：见下文
            * 完整支持：Symbian, Iris
            * 问题：
                * Opera 只有`pageX/Y`，但滚动页面过远时这个值会出错。  
                * 在iPhone, Firefox, 和 BlackBerry 上`clientX/Y` 和`pageX/Y`相等
                * 在 Android 和 MicroB `screenX/Y`和`clientX/Y`相等，也就是它们以`CSS的pixels`度量屏幕尺寸
                * 在FireFox里`screenX/Y`值不正确
                * IE, BlackBerry, 和 Obigo 不支持 `pageX/Y`.
                * NetFront 所以三个值都是`screenX/Y`.
                * Obigo `clientX/Y`是`screenX/Y`.
                * Samsung WebKit 总是返回`pageX/Y`.
            * 未测试：Opera Mini,Bolt,Skyfire
           --------
         * 事件坐标在桌面浏览器上多多少少是支持的。不幸的是，移动设备上在所测试的12个主流浏览器中只有Symbian WebKit 和 Iris完全正确的支持这3个坐标特性。其余浏览器多多少少都存在问题。
         
         * `pageX/Y`,该特性依然是基于页面的`CSS pixels`度量的值，如图在桌面浏览器一样，它是三个特性里面最有用的。如图1-12
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_pageXY.jpg) 图1-12
         
         * `clientX/Y`是基于`visual viewport`的，以`CSS pixels`度量的值. 这样做比较靠谱，虽然我不是很确信这样计算的好处。
         
         * `screenX/Y`基于设备屏幕以`设备的pixels`度量的值。显然，它使用和`clientX/Y`同样的参考，而`设备的pixels`没什么用。所以我们不需要在意`screenX/Y`,同在桌面浏览器一样，每个bit都是没用的。如图1-13.
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mobile_clientXY.jpg) 图1-13
         
         * **`viewport的meta标签 meta viewport`**
         
           --------                    
            ` Meta viewport`
            * 含义：设置`layout viewport`的宽度
            * 度量：`CSS的pixels`
            * 完整支持：Opera Mobile, iPhone, Android, Iris, IE, BlackBerry, Obigo
            * 不支持：Opera Mini, Symbian, Bolt, Firefox, MicroB, NetFront
            * 问题：
                * Skyfire 不能处理我的测试页面。  
                * 在三星的wibkit浏览器下，出现`<meta viewport>`会改变一些特性对的值。
                * Opera Mobile, iPhone, Samsung, and BlackBerry 不允许用户在设置viewport后再进行缩小操作（do not allow the user to zoom out.）
           --------
         
         * 最后我们讨论` <meta name="viewport" content="width=320">`；最初这是Apple的一个html扩展标签，但被许多浏览器复用，意义是设置`layout viewport`的宽度。为了理解它的含义，我们退一步看看基础。
         
         * 假设你创建一个页面，并不为它赋值`width`。那么它会伸展开来占据100%的`view layout`的宽度。绝大多数浏览器缩小这个页面以在一屏的宽度上显示这个`layout viewport`。我们获得如下效果。图2-1.
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mq_none.jpg) 图2-1
         
         * 用户会立马放大页面，虽然会起到效果，但绝大多数浏览器会保存元素完整的宽度（保持元素定位的不变），而导致阅读困难（文字超过屏幕），如图2-2
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mq_none_zoomed.jpg) 图2-2
         
         * (唯一不同的是Android下的Webkit核心浏览器，他会剪短长串文字的html元素，以让他们适应屏幕。这简直太有才了，我觉得其余所有浏览器都应该复用这个特性。我会在再以后全面的写这方面内容)
         
         * 现在你可以尝试着设置`htm {width: 320px}`。现在`<html>`元素收缩，随之所有的会计元素都占有100%的`<html>`宽度：320px。当用户放大浏览器显示时这样做工作得挺好，但在最初加载时的缩小显示下，用户感觉很糟糕，因为页面几乎没内容。如图2-3.
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mq_html300.jpg) 图2-3
         
         * 为了解决这个问题，Apple引入了`meta viewport`。当你设置`<meta name="viewport" content="width=320">`,你网站的`layout viewport`变成了320px。页面的初始状态就很正确了。如图2-4
         
         * ![image](http://www.quirksmode.org/mobile/pix/viewport/mq_yes.jpg) 图2-4
         
         * 你能任意设置`layout width`的宽度，甚至包括`device-width`。`device-width`由以`设备的pixels`度量`screen.width`来设置。
         
         * 在这里有个钩子（There’s a catch here）。有时严格的`screen.width`一点意义都没有，因为pixels的值太大了。例如，Nexus One上的严格宽度是480px，但Google的工程师觉得在用户设置`device-width`时，将`layout viewport`设置为480太大了。他们砍成了2/3，提供320px，和iPhone上一致。
         
         * 加入，像传言中，新的iPhone将提供一个巨大的pixel值（并不等于一个巨大的屏幕，只是分辨率），如果他们沿用这个特性：`device-width`为320，我一点都不会惊讶。或许最终`device-width`会直接意味着320px。
         
         * `相关研究`
         
         * 许多相关研究将会在以后展开：
         
           --------                    

            * `position: fixed`。一个固定位置的元素，如我们所知，定位于`viewport`。但到底是哪个`viewport`？我的研究结果如下：[猛击](http://www.quirksmode.org/blog/archives/2010/12/the_fifth_posit.html)
            
            * 其余media 查询：dpi, orientation, 特别是dpi是个灾难性的区域，不仅仅因为所以浏览器都返回96dpi（通常这个值是错误的），而且因为我们不知道web开发人员到底对哪部分感兴趣。[一个相关问题](http://stackoverflow.com/questions/11722442/is-there-a-way-to-use-dpi-in-css-media-queries-instead-of-px）

             * 当我们的元素大于`layout viewport`或`<html>`时会发生什么？如果我们在`layout vwport`为320px的页插入了一个1500p元素，如果我们为`<html>`设置了`overflow: visible`时，它会超出。是否意味着实际的viewport能比`layout viewport`更宽？此外，这种情况发生时一个旧的Android设备（Nexus One）扩大HTML元素。这是个好主意么？
            
           --------