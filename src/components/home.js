import React from 'react';
import {  withAuthenticator} from '@aws-amplify/ui-react';

// const animals =  ["Dog", "Bird", "Cat", "Mouse", "Horse"]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nft_array: [] };
      }
   
     
    componentDidMount() {
        fetch("https://jcxemt290m.execute-api.us-east-1.amazonaws.com/dev/get-nft")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                    nft_array : result
                  });
                
           
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    render() {
      return (<div>
      <h1>NFT's</h1>
      <div class="row">
      {
      this.state.nft_array.map(nft => (
        <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{nft[0]}</h5>
            <img class="card-img-top" style = {{width : '300px', height : '200px'}} src="https://image.shutterstock.com/image-illustration/oil-painting-conceptual-abstract-picture-260nw-1445018480.jpg" alt="Card image cap"></img>
            <p class="card-text">Owner {nft[1]}</p>
            <p class="card-text">Price {nft[2]}</p>
            <a href="#" class="btn btn-primary">View NFT</a>
          </div>
        </div>
      </div>
   
      ))}
      </div>
       
  
</div>

)
    }
  }

export default withAuthenticator(Home);

