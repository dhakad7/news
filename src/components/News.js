import React, { Component } from 'react'
import NewItem from './NewItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-to-top";

export default class News extends Component {
  static defaultProps={
    country: 'in',
    pageSize: 8,
    category: 'general'
  };

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  };
  constructor(props){
    super(props);
    console.log("hello i am constructor")
    this.state={
      article: [],
      loading: false,
      page:1,
      
    }
    document.title=`News - ${this.props.category}`
  }
  captilize=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  async updatenews(){
    this.props.setProgress(0);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`
    let data=await fetch(url);
    
    this.props.setProgress(25);
    this.setState({loading:true})
    this.props.setProgress(50);
    let parsed=await data.json()
    this.props.setProgress(75);
    console.log(parsed);
    this.setState({
      article:parsed.articles, 
      totalResult:parsed.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }
  async componentDidMount(){
    this.updatenews();
  }

  handelpre=async ()=>{
    this.setState({
      page:this.state.page-1,
    });
    this.updatenews();
  }
  handelnext=async ()=>{
      this.setState({
        page:this.state.page+1,
      })
      this.updatenews();
  }

  fetchMoreData = async ()=>{
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
    this.setState({
      page:this.state.page+1
    });

    let data=await fetch(url);
    let parsed=await data.json()
    console.log(parsed);
    this.setState({
      article:this.state.article.concat(parsed.articles), 
      totalResult:parsed.totalResults,
    });

  }



  render() {
    
    return (
      <>
      <div className="container">

        <h2 className='container my-3'>NewsDamoh: {this.captilize(this.props.category)} Breaking News</h2>
        {this.state.loading && <Spinner/>} 
        
        <ScrollToTop smooth color={'white'} height={'22'} style={{backgroundColor:'black'}} />       
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length!==this.state.totalResult}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row my-2 ">
                  {!this.state.loading && this.state.article.map((ele)=>{
                      return <div className="col md-4" key={ele.url}>
                          <NewItem title={ele.title?ele.title:'Read more...'} desc={ele.description?ele.description:'Read more...'} image={ele.urlToImage} newsurl={ele.url} date={ele.publishedAt} author={ele.author} source={ele.source.name}/>
                        
                      </div>
                    })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
            
          

          {/* <div className='container d-flex justify-content-between my-3'>
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handelpre}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResult/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handelnext}>Next &rarr;</button>
          </div> */}
      </>
      
    )
  }
}
