import React, { Component } from 'react'

export default class NewItem extends Component {
  render() {
    let {title,desc,image,newsurl,date,author,source}=this.props;
    return (
        <div className="card" style={{width: '18rem'}}>
            <div style={{
              display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0%'
            
            }}>
                <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
            <img src={image?image:'https://media.cnn.com/api/v1/images/stellar/prod/230821091449-xi-china-summit.jpg?c=16x9&q=w_800,c_fill'} className="card-img-top" alt="..."/>

        <div className="card-body">
          <h5 className="card-title">{title.slice(0,80)}...</h5>
          <p className="card-text">{desc.slice(0,45)}...</p>
          <p className="card-text"><small className="text-body-secondary">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small></p>
          <a href={newsurl} target='__blank' className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    )
  }
}
