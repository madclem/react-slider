(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,i){e.exports=i(23)},17:function(e,t,i){},19:function(e,t,i){},21:function(e,t,i){},23:function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),r=i(8),s=i.n(r),o=(i(17),i(2)),d=i(3),h=i(5),c=i(4),l=i(6),u=i(1),g=i(9),m=i.n(g),v=(i(19),{}),w=[],p=function(e){function t(e){var i;return Object(o.a)(this,t),(i=Object(h.a)(this,Object(c.a)(t).call(this,e))).onResize=function(){var e=i.containerSlider.current.clientWidth,t=i.containerSlider.current.clientHeight;i.width=i.props.width||e,i.height=i.props.height||t,i.updateComponent()},i.getXMouse=function(e,t){var i=e.getBoundingClientRect(),n=document.documentElement;return t.clientX-i.left-n.scrollLeft},i.onMouseDown=function(e){i._down=!0,i.originalX=i.getXMouse(e.currentTarget,e)},i.onMouseMove=function(e){if(i._down){var t=i.getXMouse(i.containerSlider.current,e),n=i.originalX-t;i.targetX=i.cameraX-n,i.preventDefault(e)}},i.onMouseUp=function(e){if(i._down){i._down=!1;var t=i.getXMouse(i.containerSlider.current,e),n=(i.originalX-t)%i.width;Math.abs(n)>i.width/3?n>0?i.targetX-=i.width-n:i.targetX+=n+i.width:i.targetX+=n,i.cameraX=i.targetX,i.preventDefault(e)}},i.onKeyDown=function(e){var t=e.keyCode;39===t?i.goTo(1):37===t&&i.goTo(-1)},i.update=function(e){if(i.slider.current){var t=parseFloat(i.slider.current.style.left||0),n=60*Math.min(performance.now()-i.lastTime,1e3/60)/1e3,a=t+(i.targetX-t)*n*(!0===e?1:i.props.ease||.3);i.slider.current.style.left=a+"px";var r=i.slider.current.children;w[0]=-i.width,w[1]=0,w[2]=i.width;for(var s=0;s<r.length;s++){var o=r[s];o.offsetSlider||(o.offsetSlider=0);var d=o.offsetLeft+a;!0!==e&&(d<-i.width?(o.offsetSlider+=3*i.width,i.currentIndex++,i.currentIndex%=i.nbImages,i.setImageData(o,1)):d>2*i.width&&(o.offsetSlider-=3*i.width,i.currentIndex--,i.currentIndex<0&&(i.currentIndex=i.nbImages-1),i.setImageData(o,-1))),o.style.left=w[s]+o.offsetSlider+"px"}i.setPointActive(a),i.nextFrame=window.requestAnimationFrame(i.update)}},i.onPointClicked=function(e){var t=e.currentTarget.dataset.index;i.targetX=-t*i.width,i.cameraX=-t*i.width,i.preventDefault(e)},i.state={loading:!0},i.orignalSizesImages={},i.slider=a.a.createRef(),i.containerSlider=a.a.createRef(),i.pointsContainer=a.a.createRef(),i}return Object(l.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.data=this.props.data,this.nbImages=this.data.length,this.currentIndex=0,this.currentIndexPoint=null,this.cameraX=0,this.targetX=0,this.width=this.props.width,this.height=this.props.height,(!this.props.height||!this.props.width)&&window.addEventListener("resize",this.onResize),window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("keydown",this.onKeyDown);var t=[this.getDataUrl(-1),this.getDataUrl(0),this.getDataUrl(1)];this.preload(t,function(){e.setState({loading:!1});var t=e.slider.current.children;e.setImageData(t[0],-1),e.setImageData(t[1],0),e.setImageData(t[2],1),e.lastTime=window.performance.now(),e.update()})}},{key:"componentDidUpdate",value:function(){!this.props.height||this.props.width;console.log("didUpdate",this.props.height,this.props.width),!this.state.loading&&this.containerSlider.current&&this.onResize()}},{key:"componentWillUnmount",value:function(){window.cancelAnimationFrame(this.nextFrame),window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("resize",this.onResize)}},{key:"updateComponent",value:function(){this.slider.current&&(this.currentIndex=0,this.originalX=null,this.resetImages(),this.currentIndexPoint&&(this.targetX=this.currentIndexPoint*-this.width,this.cameraX=this.targetX,this.update(!0)))}},{key:"resetImages",value:function(){for(var e=this.slider.current.children,t=0;t<e.length;t++){var i=e[t];if(i.offsetSlider=0,i.dataset.url){var n=i.getElementsByTagName("img")[0];this.resizeImage(n,i.dataset.url)}}}},{key:"getNewDimensions",value:function(e){var t=this.orignalSizesImages[e],i=Math.max(this.width/t.width,this.height/t.height);return v.width=t.width*i,v.height=t.height*i,v}},{key:"resizeImage",value:function(e,t){var i=this.getNewDimensions(t);e.style.width=i.width+"px",e.style.height=i.height+"px",e.style.marginLeft=this.width/2-i.width/2+"px",e.style.marginTop=this.height/2-i.height/2+"px"}},{key:"preventDefault",value:function(e){e.preventDefault(),e.stopPropagation()}},{key:"goTo",value:function(e){e<0?(this.targetX+=this.width,this.cameraX+=this.width):(this.targetX-=this.width,this.cameraX-=this.width)}},{key:"getDataUrl",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.data){var t=this.currentIndex+e;return t>this.nbImages-1?t=0:t<0&&(t=this.nbImages-1),this.data[t].url}}},{key:"setImageData",value:function(e,t){var i=this,n=this.currentIndex+t;n>this.nbImages-1?n=0:n<0&&(n=this.nbImages-1);var a=this.data[n],r=e.getElementsByTagName("img")[0],s=e.getElementsByTagName("div")[0];if(s.innerHTML="",a.children){var o=document.createElement("div");o.innerHTML=a.children,s.appendChild(o)}this.preload(a.url,function(){r.src=a.url,e.dataset.url=a.url,e.dataset.image=r,i.resizeImage(r,a.url)})}},{key:"setPointActive",value:function(e){var t=Math.round(-parseFloat(e)/this.width)%this.nbImages;if(t<0&&(t+=this.nbImages),this.currentIndexPoint!==t&&0!==this.pointsContainer.current.children.length){this.currentPoint&&this.currentPoint.classList.remove("active");var i=this.pointsContainer.current.children[t];i&&(this.currentIndexPoint=t,this.currentPoint=i,this.currentPoint.classList.add("active"))}}},{key:"getPoints",value:function(){var e=this,t="";return this.data&&(t=this.data.map(function(t,i){return a.a.createElement("div",{key:t.url,className:"slider_point",onClick:e.onPointClicked,"data-index":i})})),t}},{key:"preload",value:function(e,t){var i=this,n=e;"string"===typeof e&&(n=[e]);for(var a=0,r=function(e){i.orignalSizesImages[n[e]]?++a>=n.length&&t&&t():(i.orignalSizesImages[n[e]]={},(o=new Image).onload=function(){i.orignalSizesImages[n[e]].width=o.width,i.orignalSizesImages[n[e]].height=o.height,++a>=n.length&&t&&t()},o.src=n[e])},s=0;s<n.length;s++){var o;r(s)}}},{key:"render",value:function(){var e={};console.log("render slider"),this.props.width&&(e.width=this.props.width),this.props.height&&(e.height=this.props.height);var t="";return t=this.state.loading?a.a.createElement("img",{src:m.a,className:"loader",alt:"loader"}):a.a.createElement("div",{className:"slider_container",style:e,ref:this.containerSlider,onMouseDown:this.onMouseDown},a.a.createElement("div",{className:"slider_mask",style:e},a.a.createElement("div",{className:"slider_movable",ref:this.slider},a.a.createElement("div",{className:"image_slider"},a.a.createElement("img",{alt:"photoproduct"})," ",a.a.createElement("div",{className:"slider_image_children"})),a.a.createElement("div",{className:"image_slider"},a.a.createElement("img",{alt:"photoproduct"})," ",a.a.createElement("div",{className:"slider_image_children"})),a.a.createElement("div",{className:"image_slider"},a.a.createElement("img",{alt:"photoproduct"})," ",a.a.createElement("div",{className:"slider_image_children"})))),a.a.createElement("div",{className:"slider_points_container",ref:this.pointsContainer},this.getPoints())),a.a.createElement("div",{className:"container",style:e},t)}}]),t}(n.Component),f=(i(21),i(10)),b=function(e){function t(e){var i;Object(o.a)(this,t),(i=Object(h.a)(this,Object(c.a)(t).call(this,e))).currentState={widthContainer:window.innerWidth,heightContainer:window.innerHeight,useHardcodedWidth:!1,hardcodedWidth:300,useHardcodedHeight:!1,hardcodedHeight:200},i.state=i.currentState;var n=new f.a;return n.add(i.currentState,"widthContainer",100,window.innerWidth).onChange(i.onChange.bind(Object(u.a)(Object(u.a)(i)))),n.add(i.currentState,"heightContainer",100,window.innerHeight).onChange(i.onChange.bind(Object(u.a)(Object(u.a)(i)))),n.add(i.currentState,"useHardcodedWidth").onChange(i.onChange.bind(Object(u.a)(Object(u.a)(i)))),n.add(i.currentState,"hardcodedWidth",10,window.innerHeight).onChange(i.onChange.bind(Object(u.a)(Object(u.a)(i)))),n.add(i.currentState,"useHardcodedHeight").onChange(i.onChange.bind(Object(u.a)(Object(u.a)(i)))),n.add(i.currentState,"hardcodedHeight",10,window.innerHeight).onChange(i.onChange.bind(Object(u.a)(Object(u.a)(i)))),i.containerSlider=a.a.createRef(),i}return Object(l.a)(t,e),Object(d.a)(t,[{key:"onChange",value:function(){console.log("onchange"),this.setState({widthContainer:this.currentState.widthContainer,heightContainer:this.currentState.heightContainer,useHardcodedWidth:this.currentState.useHardcodedWidth,hardcodedWidth:this.currentState.hardcodedWidth,useHardcodedHeight:this.currentState.useHardcodedHeight,hardcodedHeight:this.currentState.hardcodedHeight})}},{key:"render",value:function(){var e=null,t=null;this.state.useHardcodedWidth&&(e=this.state.hardcodedWidth),this.state.useHardcodedHeight&&(t=this.state.hardcodedHeight),this.containerSlider.current&&(this.containerSlider.current.style.width=e?"auto":this.state.widthContainer+"px",this.containerSlider.current.style.height=t?"auto":this.state.heightContainer+"px");return a.a.createElement("div",{className:"App"},a.a.createElement("div",{ref:this.containerSlider,className:"containerSlider"},a.a.createElement(p,{width:e,height:t,data:[{url:"/dog1.jpg",children:"<div class='title'>Cute dog</div>"},{url:"/dog2.jpg",children:"<div class='title'>Cute dog 2</div>"},{url:"/dog3.jpg",children:"<div class='title'>Cute dog 3</div>"},{url:"/dog4.jpg",children:"<div class='title'>Cute dog 4</div>"},{url:"/dog5.jpg",children:"<div class='title black'>THE CUTEST</div>"}]})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(b,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,i){e.exports=i.p+"static/media/loading-mark.e1014931.svg"}},[[11,2,1]]]);
//# sourceMappingURL=main.44040c85.chunk.js.map