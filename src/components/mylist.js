import React from 'react';
import {  withAuthenticator} from '@aws-amplify/ui-react';


import { Auth } from 'aws-amplify';






// const animals =  ["Dog", "Bird", "Cat", "Mouse", "Horse"]
class Mylist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nft_array: [] ,
        auth : {}};
      }

    
  
     
    componentDidMount() {
      
        fetch("https://vwgyys73bb.execute-api.us-east-1.amazonaws.com/dev/nft")
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
                this.setState({
                    nft_array : result.Items
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
            <h5 class="card-title">{nft.nft_name}</h5>
            <img class="card-img-top" style = {{width : '300px', height : '200px'}} src={nft.nft_uri} alt="Card image cap"></img>
            <p class="card-text">Owner {nft.username}</p>
            <p class="card-text">{"Price" + " " + "Eth" + " " + nft.nft_price}</p>
            <a href="#" class="btn btn-primary">Sell NFT</a>
          </div>
        </div>
      </div>
   
      ))}
      </div>
       
  
</div>

)
    }
  }

export default withAuthenticator(Mylist);
