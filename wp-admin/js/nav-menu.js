var WPNavMenuHandler=function(){var h=jQuery,a=false,j=null,g,d,m,i,l={},n=function(p,t,q,s){if(p&&p[0]){var r=h.parseJSON(p[0]);if(r.post_title){if(r.ID&&r.post_type){l[r.post_title]={ID:r.ID,object_type:r.post_type}}return r.post_title}}},o=function(p,t,q,s){if(p&&p[0]){var r=h.parseJSON(p[0]);if(r.post_title){return r.post_title}}},b=function(v,u){if(!v){return false}u=u||document;var q=["menu-item-db-id","menu-item-object-id","menu-item-object","menu-item-parent-id","menu-item-position","menu-item-type","menu-item-append","menu-item-title","menu-item-url","menu-item-description","menu-item-attr-title","menu-item-target","menu-item-classes","menu-item-xfn"],p={},r=u.getElementsByTagName("input"),t=r.length,s,w=document.getElementById("nav-menu-meta-object-id").value;while(t--){s=q.length;while(s--){if(r[t]&&r[t].name&&"menu-item["+v+"]["+q[s]+"]"==r[t].name){p[q[s]]=r[t].value}}}return p},c=function(){var t=this.getElementsByTagName("input"),q=t.length,p,s,r;while(q--){if(-1!=t[q].name.indexOf("menu-item-parent-id["+parseInt(this.id.replace("menu-item-",""),10)+"]")){if(!this.parentNode.className||-1==this.parentNode.className.indexOf("sub-menu")){t[q].value=0}else{if("LI"==this.parentNode.parentNode.nodeName&&-1!=this.parentNode.parentNode.id.indexOf("menu-item-")){s=this.parentNode.parentNode;r=s.getElementsByTagName("input");p=r.length;while(p--){if(r[p].name&&-1!=r[p].name.indexOf("menu-item-object-id["+parseInt(s.id.replace("menu-item-",""),10)+"]")){t[q].value=parseInt(r[p].value,10);break}}}}break}}},e=function(p){var q=this;h(p).droppable({accept:".menu li",tolerance:"pointer",drop:function(s,r){q.eventOnDrop(r.draggable[0],this,r,s)},over:function(s,r){q.eventOnDragOver(r.draggable[0],this,r,s)},out:function(s,r){q.eventOnDragOut(r.draggable[0],this,r,s)}})},k,f=function(r){if(!r){return}var p=r.getElementsByTagName("li"),q=p.length;while(q--){this.setupListItemDragAndDrop(p[q])}};return{init:function(){k=document.getElementById("menu-to-edit");this.attachMenuEditListeners();this.attachMenuMetaListeners(document.getElementById("nav-menu-meta"));this.attachTabsPanelListeners();f.call(this,k);postboxes.add_postbox_toggles("nav-menus")},attachMenuEditListeners:function(){var p=this;h("#update-nav-menu").bind("click",function(q){if(q.target&&q.target.className){if(-1!=q.target.className.indexOf("item-edit")){return p.eventOnClickEditLink(q.target)}else{if(-1!=q.target.className.indexOf("menu-delete")){return p.eventOnClickMenuDelete(q.target)}else{if(-1!=q.target.className.indexOf("item-delete")){return p.eventOnClickMenuItemDelete(q.target)}}}}})},attachMenuMetaListeners:function(p){if(!p){return}var q=this;g=document.getElementById("custom-menu-item-name");d=document.getElementById("custom-menu-item-url");if(g){m="undefined"!=typeof g.defaultValue?g.defaultValue:g.getAttribute("value");i="undefined"!=typeof d.defaultValue?d.defaultValue:d.getAttribute("value");h(g).bind("focus",function(r){this.value=m==this.value?"":this.value});h(g).bind("blur",function(r){this.value=""==this.value?m:this.value})}h("input.quick-search").each(function(r,s){q.setupQuickSearchEventListeners(s)});h(p).bind("submit",function(r){return q.eventSubmitMetaForm.call(q,this,r)})},attachTabsPanelListeners:function(){h("#menu-settings-column").bind("click",function(t){if(t.target&&t.target.className&&-1!=t.target.className.indexOf("menu-tab-link")){var q=t.target.parentNode,u,p=/#(.*)$/.exec(t.target.href),s;while(!q.className||-1==q.className.indexOf("inside")){q=q.parentNode}h(".tabs-panel",q).each(function(){if(this.className){this.className=this.className.replace("tabs-panel-active","tabs-panel-inactive")}});h(".tabs",q).each(function(){this.className=this.className.replace("tabs","")});t.target.parentNode.className+=" tabs";if(p&&p[1]){u=document.getElementById(p[1]);if(u){u.className=u.className.replace("tabs-panel-inactive","tabs-panel-active")}}return false}else{if(t.target&&t.target.className&&-1!=t.target.className.indexOf("select-all")){var r=/#(.*)$/.exec(t.target.href);if(r&&r[1]){h("#"+r[1]+" .tabs-panel-active input[type=checkbox]").attr("checked","checked");return false}}}})},setupListItemDragAndDrop:function(r){var p=r.getElementsByTagName("dl"),s=this.makeListItemDropzone(r),q=p.length;e.call(this,s);this.makeListItemDraggable(r);while(q--){e.call(this,p[q])}},setupQuickSearchEventListeners:function(p){var q=this;h(p).autocomplete(ajaxurl+"?action=menu-quick-search&type="+p.name,{delay:500,formatItem:n,formatResult:o,minchars:2,multiple:false}).bind("blur",function(t){var r=l[this.value],s=this;if(r){h.post(ajaxurl+"?action=menu-quick-search&type=get-post-item&response-format=markup",r,function(u){q.processQuickSearchQueryResponse.call(q,u,r);l[s.value]=false})}})},eventOnClickEditLink:function(p){var r,q=/#(.*)$/.exec(p.href);if(q&&q[1]){r=document.getElementById(q[1]);if(r){if(-1!=r.className.indexOf("menu-item-edit-inactive")){r.className=r.className.replace("menu-item-edit-inactive","menu-item-edit-active")}else{r.className=r.className.replace("menu-item-edit-active","menu-item-edit-inactive")}return false}}},eventOnClickMenuDelete:function(p){if(confirm(navMenuL10n.warnDeleteMenu)){return true}else{return false}},eventOnClickMenuItemDelete:function(p){var s,r,q=this;if(confirm(navMenuL10n.warnDeleteMenuItem)){r=/_wpnonce=([a-zA-Z0-9]*)$/.exec(p.href);if(r&&r[1]){s=parseInt(p.id.replace("delete-",""),10);h.post(ajaxurl,{action:"delete-menu-item","menu-item":s,_wpnonce:r[1]},function(t){if("1"==t){q.removeMenuItem(document.getElementById("menu-item-"+s))}});return false}return true}else{return false}},eventOnDragOver:function(p,q){a=true;j=q;q.className+=" sortable-placeholder"},eventOnDragOut:function(p,q){a=false;(function(r){setTimeout(function(){if(r!=j||(!a&&r.className&&-1!=r.className.indexOf("sortable-placeholder"))){r.className=r.className.replace(/sortable-placeholder/g,"")}},500)})(q)},eventOnDrop:function(s,v){var t=!!(-1==v.className.indexOf("dropzone")),q=v.parentNode.getElementsByTagName("ul"),u=false,r=q.length,p;a=false;v.className=v.className.replace(/sortable-placeholder/g,"");if(t){while(r--){if(q[r]&&1!=q[r].className.indexOf("sub-menu")){u=true;p=q[r]}}if(!u){p=document.createElement("ul");p.className="sub-menu";v.parentNode.appendChild(p)}p.appendChild(s)}else{v.parentNode.parentNode.insertBefore(s,v.parentNode)}this.recalculateSortOrder(k);c.call(s)},eventSubmitMetaForm:function(q,w){var u=q.getElementsByTagName("input"),t=u.length,s,y,p,v,r={},x=function(){},z=new RegExp("menu-item\\[([^\\]]*)");q.className=q.className+" processing",that=this;r.action="";while(t--){if(u[t].name&&-1!=u[t].name.indexOf("menu-item-object-id")&&u[t].checked||("undefined"!=typeof u[t].id&&"custom-menu-item-url"==u[t].id&&""!=u[t].value&&"http://"!=u[t].value)){r.action="add-menu-item";x=that.processAddMenuItemResponse;v=z.exec(u[t].name);p="undefined"==typeof v[1]?0:parseInt(v[1],10);y=b(p);for(s in y){r["menu-item["+p+"]["+s+"]"]=y[s]}u[t].checked=false}else{if(""==r.action&&""!=u[t].value&&u[t].className&&-1!=u[t].className.search(/quick-search\b[^-]/)){r.action="menu-quick-search";r.q=u[t].value;r["response-format"]="markup";r.type=u[t].name;x=that.processQuickSearchQueryResponse}}}r.menu=q.elements.menu.value;r["menu-settings-column-nonce"]=q.elements["menu-settings-column-nonce"].value;h.post(ajaxurl,r,function(A){x.call(that,A,r);q.className=q.className.replace(/processing/g,"")});return false},makeListItemDraggable:function(p){h(p).draggable({handle:" > dl",opacity:0.8,addClasses:false,helper:"clone",zIndex:100})},makeListItemDropzone:function(r){if(!r){return false}var q=r.getElementsByTagName("div"),p=q.length,s=document.createElement("div");while(p--){if(q[p].className&&-1!=q[p].className.indexOf("dropzone")&&(r==q[p].parentNode)){return q[p]}}s.className="dropzone";r.insertBefore(s,r.firstChild);return s},processAddMenuItemResponse:function(p,t){if(!t){t={}}var u,r,q,s=document.createElement("ul");s.innerHTML=p;q=s.getElementsByTagName("li");r=q.length;while(r--){this.setupListItemDragAndDrop(q[r]);k.appendChild(q[r])}if(g&&d){g.value=m;d.value=i}},processQuickSearchQueryResponse:function(t,y){if(!y){y={}}var q=document.createElement("ul"),p=document.getElementById("nav-menu-meta"),u,x,r,v,w=new RegExp("menu-item\\[([^\\]]*)"),s;r=w.exec(t);if(r&&r[1]){v=r[1];while(p.elements["menu-item["+v+"][menu-item-type]"]){v--}if(v!=r[1]){t=t.replace(new RegExp("menu-item\\["+r[1]+"\\]","g"),"menu-item["+v+"]")}}q.innerHTML=t;x=q.getElementsByTagName("li");if(x[0]&&y.object_type){s=document.getElementById(y.object_type+"-search-checklist");if(s){s.appendChild(x[0])}}else{if(y.type){r=/quick-search-posttype-([a-zA-Z_-]*)/.exec(y.type);if(r&&r[1]){s=document.getElementById(r[1]+"-search-checklist");if(s){u=x.length;while(u--){s.appendChild(x[u])}}}}}},recalculateSortOrder:function(r){var s=r.getElementsByTagName("input"),q,p=0;for(q=0;q<s.length;q++){if(s[q].name&&-1!=s[q].name.indexOf("menu-item-position")){s[q].value=++p}}},removeMenuItem:function(r){if(!r){return false}var s=r.getElementsByTagName("ul"),q,p;if(s[0]){q=s[0].getElementsByTagName("li");for(p=0;p<q.length;p++){if(q[p].id&&-1!=q[p].id.indexOf("menu-item-")&&q[p].parentNode==s[0]){r.parentNode.insertBefore(q[p],r)}}}r.className+=" deleting";h(r).fadeOut(350,function(){this.parentNode.removeChild(this)});this.recalculateSortOrder(k)}}};var wpNavMenu=new WPNavMenuHandler();jQuery(function(){wpNavMenu.init()});