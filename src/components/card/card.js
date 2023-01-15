import React from 'react'
import "./card.css"


const reduceText = (text) => {
    let result = text;
    if (text.length > 23) {
        result = text.slice(0, 23) + " ..."
    }

    return result;
}

function Card({ name, tags, logoUrl, description, isInstalled, isMiniDapp, linkToDapp, installDapp, itemIndex, currentAccount }) {
    const openNewTab = (link) => {
        window.open(link);
    }
    return (
        <div className="card-wrap">
            <div className='card-content'>
                <div className='card-header'>
                    <div className='card-image-wrap'>
                        <img src={logoUrl} />
                    </div>
                    <div className='card-info-wrap'>
                        <h2 className='card-title'>{name}</h2>
                        <div className='card-tag-wrap'>
                            {isMiniDapp ? <p className="card-tag mini">mini</p> : ""}
                            {tags.map((item, index) => {
                                return (
                                    <p key={index} className={"card-tag " + item}>{item}</p>
                                )
                            })}
                        </div>
                    </div>
                    {
                        isInstalled ? <button className={isInstalled ? "installed" : ""} onClick={() => isMiniDapp ? installDapp(currentAccount, itemIndex) : openNewTab(linkToDapp)}>{isInstalled ? "Open" : "Install"}</button> : <button className={isInstalled ? "installed" : ""} onClick={() => installDapp(currentAccount, itemIndex)}>{isInstalled ? "Open" : "Install"}</button>
                    }
                </div>
                <div className='card-body'>
                    <p>{reduceText(description)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;