import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            body: '',
            posts: []
        }
        // bind we only need to bind the event handler functions
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e){
        e.preventDefault()
        // this.postData()
        axios.post('/posts', {
            body: this.state.body,
        }).then(response => {
            console.log(response)
            this.setState({
                posts: [response.data]
            })
        })
        // clear the textarea
        this.setState({
            body: ''
        })

    }

    // postData(){
    //     axios.post('/posts',{
    //         body: this.state.body
    //     })
    // }

    handleChange(e){
        this.setState({
            body: e.target.value
        })
    }



    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Tweeet Something...</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea onChange={this.handleChange}
                                         className="form-control"
                                         rows="5" maxLength="140"
                                         placeholder="What's up?"
                                         value ={this.state.body}
                                         required />
                                    </div>
                                    <input type="submit" value="Post" className="form-control" />
                                </form>
                            </div>
                        </div>
                    </div>

                     <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Recent Tweets </div>

                            <div className="card-body">
                                {
                                    this.state.posts.map(post => <div key={post.id}>{post.body}</div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
