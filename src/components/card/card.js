import React from 'react'
import "./card.css"

function Card() {
    return (
        <div className="card-wrap">
            <div className='card-header'>
                <div className='card-image-wrap'>
                    <img src='https://play-lh.googleusercontent.com/SIGqx9zg70r_prkE8NytTNq_zHgm2hLnG3gzHHQeYICJLnn0I-_BHOObPPeYP9Pkgw' />
                </div>
                <div className='card-info-wrap'>
                    <h2 className='card-title'>Wildcash</h2>
                    <div className='card-tag-wrap'>
                        <p className='card-tag'>NFT</p>
                        <p className='card-tag'>Gamefi</p>
                    </div>
                </div>
                <button>Install</button>
            </div>
            <div className='card-body'>
                <p>Wild Cash is an easy-to-use, earn-good-paying app for earning rewards anytime, anywhere</p>
            </div>
        </div>
    )
}

export default Card;