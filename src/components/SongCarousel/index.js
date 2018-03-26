import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SongCarousel = () => {
    const settings = {
        dots: true,
        lazyLoad: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
    };
    const imageUrl = 'https://is4-ssl.mzstatic.com/image/thumb/Music111/v4/2f/25/9f/2f259f40-e735-d94e-2814-00ee84420cd5/075679897121.jpg/600x600bf.jpg';
    return (
        <div>
        <h2> Lazy Load</h2>
        <Slider {...settings}>
            <div><img src={imageUrl} /></div>
            <div><img src={imageUrl} /></div>
            <div><img src={imageUrl} /></div>
            <div><img src={imageUrl} /></div>
        </Slider>
        </div>
    );   
}

export default SongCarousel;
