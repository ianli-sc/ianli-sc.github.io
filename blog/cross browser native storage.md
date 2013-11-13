### why use
* Mobile first[#1](http://designshack.net/articles/css/mobilefirst/),[#2](http://www.ibm.com/mobilefirst/us/en/). Not only almost every mobile browser supported native storage in OS of Android、IOS and WP, the limit of internet transmittability now(Nov. 8, 2013) force developer better to load as less resource in one page as well.
* Smartphone Browser localStorage is up to 5x Faster than Native Cache[#3](http://www.mobify.com/blog/smartphone-localStorage-outperforms-browser-cache/)
* Sometimes developer also need native storage to create quick singer for small feature of website which will show to user once without server side support.

### how to use
* Plenty of JS applets for native storage, see [offline(depend on library of KISSY)](https://github.com/kissygalleryteam/offline)，[storage(depend on library of KISSY)](http://gallery.kissyui.com/storage/1.1/guide/index.html)，[jStorage](https://github.com/andris9/jStorage)，[Store.js](https://github.com/marcuswestin/store.js/)
* And it's better to know the difference and limitation.

### how does it work
* 5 kinds of native storage api for developer as below
    * localStorage
    * sessionStorage
    * globalStorage
    * userData behavior
    * cookie

* Difference
    * browser support, [basic demo](http://ianli-sc.github.io/demo/nativestorage.html)，Different browser with different space.[more detail](http://dev-test.nemikor.com/web-storage/support-test/)
    
      Name | IE | FF | Chrome | Safari | Android | IOS | WP
      | ------------ | ------------- | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
      local storage | 8+ | 3.5+ | 5.0+ | all | 2.2+ | all | 10.0+
      sessionStorage  | 8+ | 3.5+ | 5.0+ | all | 2.0+ | all | 10.0+
      globalStorage  | none | 2.0 - 13.0 | none | none | none | none | none
      userData behavior  | 5 - 7 | none | none | none | none | none | all
      cookie  | 4+ | all | all | all | all | all | all

    * api[#5](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage) and note
        * `localStorage` is global objects, call `window.localStorage`, has access control, able to share data in `same domain`, last forever.
            * `localStorage.setItem(key, value)`
                * **key** must be String
                * **value** will be save as String, meanwhile if you assign an Object to the value, will call it's `toString` method automatic
            * `localStorage.getItem(key)`
                * **key** must be String
            * `localStorage.removeItem(key)` remove one data with key
	            * **key** must be String
            * `localStorage.clear()` will delete all local storage on this domain and reset the `localStorage Object`.
            	* in fact, localStorage is a subclass of Object, so able to use `localStorage.a = '123'` and `localStorage.a` to get and set the data. If do like this, also the `remove` and `clear` work all the same.
            	* Not able to add function to `localStorage`. for example `localStorage.aaa = function(){alert(132);}`, and call `localStorage.aaa` will get a string of `"function(){alert(132);}"`
            * `localStorage.length` return count of keys
            * `localStorage.key(index)` return the key of index, all the key sort by unicode
        * `sessionStorage` has same api as `localStorage`, but it stores the data for only one session. The data is deleted when the user closes the browser window.
            * session of browser is the period that page from create(href change, open in new window, open in new tab) to close
        * `globalStorage` globalStorage is not a Storage instance, but a StorageList instance containing StorageObsolete instances.`globalStorage['mozilla.org'].setItem("snippet", "<b>Hello</b>, how are you?");`.Do not use it on production sites facing the Web
        * `userData behavior`
            * see more from msdn [#6](http://msdn.microsoft.com/en-us/library/ms531424\(v=vs.85\).aspx)
            * Must add **style** `behavior: url(#default#userData);` to the DOM which you want the data to store. 
            * Do remember to call `load` before `getAttribute`, and same to call `save` after `removeAttribute` and `setAttribute` to save data.
        * `cookie`
            * the difference between `cookie` and `localStorage`
                * cookie will auto send to server when visit the page
                * capacity of cookie is far less than localStorage

### cross origin?
* all native storages have access control[#7](https://developer.mozilla.org/en/docs/HTTP/Access_control_CORS), if you want cross-origin resource sharing, may read below
* in practice, see [\[web前端\]跨域通信与实验](http://zciii.com/blogwp/crossdomain/)，[跨域资源共享的10种方式](http://www.woiweb.net/10-cross-domain-methods.html)