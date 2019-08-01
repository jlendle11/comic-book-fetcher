import React from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Loader from 'react-loader-spinner'
import Filter from './Filter/Filter'
import './Filter/Filter.css'
import './MainContainer.css'

class MainContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            titles: [],
            description: [],
            images: [],
            loading: false,
            input: '1999'
            
        }
    }

    componentDidMount() {
        this.getCall()
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({ input: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.getCall()
    }

    getCall = () => {
       this.setState({loading: true})
       const token = process.env.REACT_APP_API_HASH_TOKEN
       const pubtoken = process.env.REACT_APP_API_KEY
       const year = parseInt(this.state.input)
       
        
          axios
          .get(`https://gateway.marvel.com:443/v1/public/series?startYear=${year}&contains=comic&orderBy=title&limit=25&ts=1&apikey=${pubtoken}&hash=${token}`)
             
          .then(res => {
        
              this.setState({
                  titles: res.data.data.results,
                  images: res.data.data.results,
                  description: res.data.data.results,
                  loading: false

              });
            });
      }

    render() {

        if (this.state.loading === false ) {
        
            return (
            <div className='allcomic'>
                <nav className='comicbar'>
                    <Link to='/main' className="home-link"> Home </Link>
                </nav>
                    <Route path='./main' component={Homepage} ></Route>
                    <Filter value={this.state.input} change={this.handleInputChange} onSubmit={this.handleSubmit}/>
                {this.state.titles.map(item => {
                const { title } = item
                return (
                    <div key={item.id} className='comics'>
                        <h1 className='comic-head'> {title} </h1> 
                        <img src={item.thumbnail.path + '/portrait_xlarge.' + item.thumbnail.extension} alt='hey'/>
                        <p className='comic-text'>{item.description}</p>
                    </div>
                )
                })}
            </div>
        )
    } else {
        return (
            <div className='load-load'>      
                <Loader 
                    type="TailSpin"
                    color="#00BFFF"
                    height="400"	
                    width="400"/> 
            </div>
        )
    }

}
}
export default MainContainer



