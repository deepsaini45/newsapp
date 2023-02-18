import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  
  static defaultProps={
    country:'in',
    pageSize:8,
    category:'general',
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
  }
    capitalize=(string)=>{
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
  constructor(props){
    
    super(props);
    this.state= {
      articles:[],
      loading:false,
      page:1
    }
    document.title=`${this.capitalize(this.props.category)}-NewsApp`;
  }
 async componentDidMount (){
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3350e624219442f2a33cdf8549cfa0e8&${this.state.page=1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
    loading:false
            })
  }
 
 handlePrevClick= async()=>{
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3350e624219442f2a33cdf8549cfa0e8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json()
this.setState({

page:this.state.page-1,
articles:parsedData.articles,
loading:false
})
}
handleNextClick= async()=>{
  if (!(this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)) ) {
    console.log("hello")
  let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3350e624219442f2a33cdf8549cfa0e8&page=${this.state.page + 1} &pageSize=${this.props.pageSize}`;
   this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json()
  
this.setState({
  
  page:this.state.page+1,
  articles:parsedData.articles,
  loading:false

})}
}
  render() {
    return (
      <div className="container my-3" >
        <h1 className="text-center"style={{margin:'65px 0px' }}>NewsApp-Top  {this.capitalize(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading&& this.state.articles.map((element) =>{
         return <div className="col-md-4" key={element.url}>
          <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
          })}  
        </div>
        <div className="container d-flex justify-content-between">
          
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
