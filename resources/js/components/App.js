import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            body: '',
            posts: [],
            loading: false
        }
        // bind we only need to bind the event handler functions
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderPosts = this.renderPosts.bind(this)
    }

    getPosts(){
        this.setState({loading: true})
        axios.get('/posts').then(response => {
            // console.log(response.data.posts)
            this.setState( {
                posts: [...response.data.posts],
                loading: false
            })
        })
    }


    componentWillMount() {
        this.getPosts();
    }

    componentDidMount () {
      Echo.private('new-post').listen('PostCreated', (e) => {
        //   console.log("from pusher", e.post)
        if (window.Laravel.user.following.includes(e.post.user_id)) {
            this.setState({posts: [e.post, ...this.state.posts]});
        }
      })
    }


    handleSubmit(e){
        e.preventDefault()
        // this.postData()
        axios.post('/posts', {
            body: this.state.body,
        }).then(response => {
            // console.log(response)
            this.setState({
                posts: [...this.state.posts, response.data]
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

    renderPosts(){
       return this.state.posts.map(post =>
            <div key={post.id} className="media">
                    <div className="media-left">
                        <img src={post.user.avatar} className="media-object mr-2 "/>
                    </div>
                    <div className="media-body">
                        <div className="user">
                            <a href={`/users/${post.user.username}`}><b>{post.user.username}</b></a>
                        </div>
                        <p>{post.body}</p>
                    </div>
            </div>
        )
    }



    render() {
        return (
            <div className="container-fluid">
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
                                    {!this.state.loading ? this.renderPosts() : 'Loading...'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
