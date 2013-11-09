'use strict';
define(['jquery'], function($) {
    var nativestorage = {
        init: function() {
            var stringData = 'this is a string "Hello world!" ';
            //test of localStorage
            if(window.localStorage) {
                window.localStorage.setItem('skey', stringData);
                $('#storage_local').val(window.localStorage.getItem('skey'));
            }
            //test of sessionStorage
            if(window.sessionStorage) {
                window.sessionStorage.setItem('skey', stringData);
                $('#storage_session').val(window.sessionStorage.getItem('skey'));
            }
            //test of globalStorage
            if(window.globalStorage) {
                window.globalStorage.setItem('skey', stringData);
                $('#storage_global').val(window.globalStorage.getItem('skey'));
            }
            //test of userData
            var userDataNode = $('#storage_userData')[0];
            if(userDataNode.addBehavior) {
                //node must have css of behavior:url('#default#userData')
                //create a <link> to store all data in this page
                var dataLink = $('<link style="url(#default#userData)" />').appendTo('head');
                datalink.setAttribute('skey', stringData);
                datalink.save('skey');
                datalink.load('skey');
                $('#storage_userData').val(datalink.getAttribute('skey'));
            }
            //test of cookie
            if(document.cookie != undefined) {
                cookieToLocalstorage();
                cookieStorage.setItem('skey', stringData);
                $('#storage_cookie').val(cookieStorage.getItem('skey'));
            }
        }
    };

    function cookieToLocalstorage() {
        window.cookieStorage = {
              getItem: function (sKey) {
                if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
                  return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
              },
              key: function (nKeyId) {
                  return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
              },
              setItem: function (sKey, sValue) {
                  if(!sKey) { return; }
                  document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                  this.length = document.cookie.match(/\=/g).length;
              },
              length: 0,
              removeItem: function (sKey) {
                  if (!sKey || !this.hasOwnProperty(sKey)) { return; }
                  document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                  this.length--;
              },
              hasOwnProperty: function (sKey) {
                  return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
              }
            };
        window.cookieStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
    }
    return nativestorage;
});