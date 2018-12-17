/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import imgLoader from './loading-mark.svg';
import PropTypes from 'prop-types';
import './index.css';

let tempObject = {};
let tempArray = [];

class App extends Component {
    static propTypes = {
        data: PropTypes.instanceOf(Array),
        ease: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number
    }

    constructor(props) {
        super(props);

        // TODOS
        // add an infinite options (to not loop)
        // add resizing options (for now, cover only)
        // try on mobile
        this.state = {
            loading: true
        }
        
        this.orignalSizesImages = {}; // used to scale correctly images
        this.slider = React.createRef()
        this.containerSlider = React.createRef()
        this.pointsContainer = React.createRef()
    }

    componentDidMount() {
        this.data = this.props.data; 

        this.nbImages = this.data.length;
        this.currentIndex = 0;
        this.currentIndexPoint = null;
        this.cameraX = 0;
        this.targetX = 0;
        this.width = this.props.width;
        this.height = this.props.height;
        
        let needsResize = !this.props.height || !this.props.width;
        if (needsResize) window.addEventListener('resize', this.onResize);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('touchend', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('touchmove', this.onMouseMove);
        window.addEventListener('keydown', this.onKeyDown);

        // preload the first three images (left, current, right)
        let urls = [this.getDataUrl(-1), this.getDataUrl(0), this.getDataUrl(1)]
        this.preload(urls, () => {
            this.setState({
                loading: false
            });

            // noew they're loaded, set the images
            let images = this.slider.current.children;
            this.setImageData(images[0], -1);
            this.setImageData(images[1], 0);
            this.setImageData(images[2], 1);

            this.lastTime = window.performance.now(); // will be used to calculate the delta time
            this.update(); // start the RAF
        });
    }

    componentDidUpdate() {
        let needsResize = !this.props.height || !this.props.width;
        if (!this.state.loading && this.containerSlider.current) {
            
            this.onResize();
        }
    }

    componentWillUnmount () {
        window.cancelAnimationFrame(this.nextFrame)
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('resize', this.onResize);
        window.addEventListener('touchend', this.onMouseUp);
        window.addEventListener('touchmove', this.onMouseMove);
    }

    onResize = () => {
        
        
        let width = this.containerSlider.current.clientWidth;
        let height = this.containerSlider.current.clientHeight;

        this.width = this.props.width || width;
        this.height = this.props.height || height;
        this.updateComponent();
    }

    // called on resize
    updateComponent() {
        if (!this.slider.current) return; // needs DOM loaded

        this.currentIndex = 0;
        this.originalX = null;
        this.resetImages(); // mainly just scale them back to the right dimensions

        if (this.currentIndexPoint) { // move the slider to the right position
            this.targetX = this.currentIndexPoint * -this.width;
            this.cameraX = this.targetX;
            this.update(true); // update(true) will remove ease and set the pos directy
        }
    }

    resetImages() {
        let items = this.slider.current.children;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            item.offsetSlider = 0;
            if (item.dataset.url) {
                let img = item.getElementsByTagName('img')[0];
                this.resizeImage(img, item.dataset.url);
            }
        }
    }

    // get new width and height based on the original dimensions of the image (that we stored during loading)
    getNewDimensions(url) {
        let dim = this.orignalSizesImages[url];
        let ratio = Math.max( this.width / dim.width, this.height / dim.height );
        tempObject.width = dim.width * ratio;
        tempObject.height = dim.height * ratio;

        return tempObject;
    }

    resizeImage(img, url) {
        let dim = this.getNewDimensions(url);
        
        img.style.width = dim.width + 'px';
        img.style.height = dim.height + 'px';
        img.style.marginLeft = (this.width / 2 - dim.width / 2) + 'px';
        img.style.marginTop = (this.height / 2 - dim.height / 2) + 'px';
    }

    /*
        MOUSE CONTROLLER
    */

   preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    getXMouse = function(element, evt) {
        let rect = element.getBoundingClientRect();
        let root = document.documentElement;

        let x = 0;
        if (evt.touches) {
            if (evt.touches[0]) x = evt.touches[0].pageX - rect.left - root.scrollLeft;
            else x = this.lastTouchX;
        }
        else x = evt.clientX - rect.left - root.scrollLeft;

        return x;
    }
    
    onMouseDown = (e) => {
        this._down = true;
        // used to know how much we moved
        this.originalX = this.getXMouse(e.currentTarget, e);
        this.lastTouchX = this.originalX;
    }
    
    onMouseMove = (e) => {
        if (!this._down) return;
        let x = this.getXMouse(this.containerSlider.current, e);
        const differenceX = this.originalX - x;
        this.targetX = this.cameraX - differenceX;
        this.lastTouchX = x;
        this.preventDefault(e);
    }

    onMouseUp = (e) => {

        if (!this._down) return;

        this._down = false;
        let x = this.getXMouse(this.containerSlider.current, e);
        let differenceX = (this.originalX - x) % this.width;

        // use to slide to the next or cancel the slide (depending if the user slided enough to access the next image)
        if (Math.abs(differenceX) > this.width / 3) { // this.width/3 is the current tolerance
            if (differenceX > 0) this.targetX -= this.width - differenceX;
            else this.targetX += differenceX + this.width;
        }
        else this.targetX += differenceX;
        
        this.cameraX = this.targetX;
        this.preventDefault(e);
    }
    
    /*
        KEYBOARD CONTROLLER
    */
    onKeyDown = (e) => {
        const keyCode = e.keyCode;
        if (keyCode === 39) this.goTo(1);
        else if (keyCode === 37) this.goTo(-1);
    }

    goTo(value) {
        if (value < 0) {
            this.targetX += this.width;
            this.cameraX += this.width;
        }
        else {
            this.targetX -= this.width;
            this.cameraX -= this.width;
        }
    }

    // get the url of the (current + value) slide
    getDataUrl(value = 0) {
        if (!this.data) return;
        
        let index = this.currentIndex + value;
        if (index > this.nbImages - 1) index = 0;
        else if (index < 0) index = this.nbImages - 1;
        let imageData = this.data[index];
        
        return imageData.url;
    }
    
    setImageData(element, value) {
        let index = this.currentIndex + value;
        if (index > this.nbImages - 1) index = 0;
        else if (index < 0) index = this.nbImages - 1;
        let imageData = this.data[index];
        
        let img = element.getElementsByTagName('img')[0];
        let div = element.getElementsByTagName('div')[0];
        div.innerHTML = "";
        if (imageData.children) {
            var inside = document.createElement('div');
            inside.innerHTML = imageData.children;
            div.appendChild(inside);
        }

        this.preload(imageData.url, () => {
            img.src = imageData.url;
            element.dataset.url = imageData.url;
            element.dataset.image = img;
            this.resizeImage(img, imageData.url);
        });
    }

    // main loop where the magic happens
    update = (snap) => {
        if (!this.slider.current) return; // needs DOM

        // get slider position
        let currentX = parseFloat(this.slider.current.style.left || 0);

        // extra ease if CPU stutters
        const deltaTime = (Math.min(performance.now() - this.lastTime, 1000 / 60) * 60) / 1000;
        let easeX = currentX + (this.targetX - currentX) * deltaTime * (snap === true ? 1 : this.props.ease || 0.3);

        // set the new pos for the slider
        this.slider.current.style.left = easeX + 'px';
        let items = this.slider.current.children;
        // use a temp array to not create one everyloop
        tempArray[0] = -this.width;
        tempArray[1] = 0;
        tempArray[2] = this.width;

        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            
            if (!item.offsetSlider) item.offsetSlider = 0;
            let left = item.offsetLeft + easeX;

            if (snap !== true) {
                // conditions to reposition if needed
                if (left < -this.width) {
                    item.offsetSlider += this.width * 3;
                    this.currentIndex++;
                    this.currentIndex %= this.nbImages;
                    this.setImageData(item, 1);
                }
                else if (left > this.width * 2) {
                    item.offsetSlider -= this.width * 3;
                    this.currentIndex--;
                    if (this.currentIndex < 0) this.currentIndex = this.nbImages - 1;
                    this.setImageData(item, -1)
                }
            }

            item.style.left = (tempArray[index] + item.offsetSlider) + 'px';
        }
        
        // assign correct point indicator :)
        this.setPointActive(easeX);
        this.nextFrame = window.requestAnimationFrame(this.update); // RAF
    }

    // set the correct point indicator to indicate which slide we're on
    setPointActive(xSlider) {
        let indexPoint = Math.round(-parseFloat(xSlider) / this.width) % this.nbImages;

        if (indexPoint < 0) indexPoint += this.nbImages;
        
        if (this.currentIndexPoint === indexPoint || this.pointsContainer.current.children.length === 0) return;
        if (this.currentPoint) this.currentPoint.classList.remove('active');
        let point = this.pointsContainer.current.children[indexPoint];
        
        if (point) {
            this.currentIndexPoint = indexPoint;
            this.currentPoint = point;
            this.currentPoint.classList.add('active');
        }
    }

    // move to a specific slide when click on a point
    onPointClicked = (e) => {
        var currentTarget = e.currentTarget.dataset;
        let index = currentTarget.index;

        this.targetX = -index * this.width;
        this.cameraX = -index * this.width;

        this.preventDefault(e);
    }

    getPoints() {
        let content = '';
        if (this.data) {
            content = this.data.map((img, index) => {
                return (<div key={img.url} className='slider_point' onTouchEnd={this.onPointClicked} onClick={this.onPointClicked} data-index={index} />)
            });
        }

        return content;
    }
    
    preload(src, cb) {
        let urls = src;
        if (typeof src === 'string') urls = [src];

        let urlsLoaded = 0;
        for (let i = 0; i < urls.length; i++) {

            // load only once
            if (!this.orignalSizesImages[urls[i]]) {
                this.orignalSizesImages[urls[i]] = {}
                var img = new Image();
                // eslint-disable-next-line no-loop-func
                img.onload = () => {
                    // store original width and height for when we'll need to scale images
                    this.orignalSizesImages[urls[i]].width = img.width;
                    this.orignalSizesImages[urls[i]].height = img.height;
                    urlsLoaded++;
                    if (urlsLoaded >= urls.length && cb) cb();
                }
                img.src = urls[i];
            }
            else {
                urlsLoaded++;
                if (urlsLoaded >= urls.length && cb) cb();
            }
        }
    }
    
    render() {
        var divStyle = {};

        
        if (this.props.width) divStyle.width = this.props.width;
        if (this.props.height) divStyle.height = this.props.height;
            
        let content = '';

        if (!this.state.loading) {
            content = (
                <div className='slider_container' style={divStyle} ref={this.containerSlider} onTouchStart={this.onMouseDown} onMouseDown={this.onMouseDown} >
                    <div className='slider_mask' style={divStyle}>
                        <div className='slider_movable' ref={this.slider}>
                            <div className='image_slider'><img alt='photoproduct' /> <div className='slider_image_children' /></div>
                            <div className='image_slider'><img alt='photoproduct' /> <div className='slider_image_children' /></div>
                            <div className='image_slider'><img alt='photoproduct' /> <div className='slider_image_children' /></div>
                        </div>
                    </div>
                    <div className='slider_points_container' ref={this.pointsContainer}>
                        {this.getPoints()}
                    </div>
                </div>
            )
        }
        else {
            content = (
                <img src={imgLoader} className="loader" alt="loader" />
            )
        }

        return (
            <div className='container' style={divStyle}>
                {content}
            </div>
        );
    }
}

export default App;
