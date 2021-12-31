import { Component } from "react";
import axios from 'axios';

// Page header with logo and tagline
class Head extends Component {
    render() {
        return (
            // <header class="py-5 bg-light border-bottom mb-4">
            //     <div class="container">
            //         <div class="text-center my-5">
            //             <h1 class="fw-bolder">Welcome to Blog Home!</h1>
            //             <p class="lead mb-0">A Bootstrap 5 starter layout for your next blog homepage</p>
            //         </div>
            //     </div>
            // </header> 

            <article>
            <h2>Create Content</h2>
            <form action='/create_process' 
                  method='post' onSubmit={function(e) {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const desc = e.target.desc.value;
                    const data = axios({
                      url: 'http://192.168.0.44:8080/login2',
                    });
                    data.then((res) => {
                      console.log( res.data );;
                    });
                  }.bind(this)}>
    
              <p><input type='text' name='title'></input></p>
              <p><textarea name='desc'></textarea></p>
              <p><input type='submit'></input></p>
            </form>
          </article>
        );

    }
}

export { Head };