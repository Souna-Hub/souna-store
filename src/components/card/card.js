import React from 'react'
import "./card.css"

const reduceText = (text) => {
    let result = text;
    if (text.length > 25) {
        result = text.slice(0, 25) + " ..."
    }

    return result;
}

function Card({ title, tags, imageUrl, description }) {
    return (
        <div className="card-wrap">
            <div className='card-content'>
                <div className='card-header'>
                    <div className='card-image-wrap'>
                        <img src={imageUrl} />
                    </div>
                    <div className='card-info-wrap'>
                        <h2 className='card-title'>{title}</h2>
                        <div className='card-tag-wrap'>
                            {tags.map((item, index) => {
                                return (
                                    <p key={index} className={"card-tag " + item}>{item}</p>
                                )
                            })}
                        </div>
                    </div>
                    <button>Install</button>
                </div>
                <div className='card-body'>
                    <p>{reduceText(description)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;