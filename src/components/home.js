import React from 'react';
import {  withAuthenticator} from '@aws-amplify/ui-react';


import { Auth } from 'aws-amplify';
import { ConsoleLogger } from '@aws-amplify/core';






// const animals =  ["Dog", "Bird", "Cat", "Mouse", "Horse"]
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nft_array: [] ,
                        owner : '',
                        auth_token : '',
                        email : ''};
      }

      onClick = (event, nft) => {
       
        console.log(nft);
        console.log("This is the owner", this.state.owner)


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + this.state.auth_token)

       var formData = JSON.stringify({
        'buyer': this.state.owner,  
        'owner': nft.username,
        'price' : nft.nft_price,
        'name' : nft.nft_name,
        'url' : nft.nft_uri,
        'asset_id' : nft.asset_id,
        'eth_token' : nft.eth_token,
        'email' : this.state.email
    
      })


  


        console.log("Form ", formData)

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formData,
          redirect: 'follow'
          };

          

  
          fetch(`https://bjz2x882zl.execute-api.us-east-1.amazonaws.com/buy-nft`, requestOptions)
          .then(response => response.text())
          .then(result => console.log(result)).then(alert("Created NFT Successfully! It will be listed in the Marketplace Shortly"))
          .catch(error => console.log('error', error));
    
      }

    
   
     
      async componentDidMount() {
        const response = await Auth.currentSession()
        .then((data) => {
         
           return data
        }
        
        )
        .catch(err => err);

        await console.log("Response",response.idToken.payload.email)
        this.setState({
            email : response.idToken.payload.email,
            owner : response.accessToken.payload.username,
            auth_token  : response.idToken.jwtToken,
          });
     

      
    //   const { attribute } = await Auth.currentAuthenticatedUser();
      
    //   await Auth.currentSession()
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err));


    //   await console.log("Response User", attribute)
    //  // console.log("Response Current Session", currSess)
        var myHeaders = new Headers();
     
        myHeaders.append("Authorization", "Bearer "+this.state.auth_token)

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

      
        fetch("https://vwgyys73bb.execute-api.us-east-1.amazonaws.com/dev/all_nft",requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
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
      // this.state.nft_array.map(nft => (
     
        
      //   <div class="col-sm-4">
      //   <div class="card">
      //     <div class="card-body">
      //       <h5 class="card-title">{nft.nft_name}</h5>
      //       <img class="card-img-top" style = {{width : '300px', height : '200px'}} src={nft.nft_uri} alt="Card image cap"></img>
      //       <p class="card-text">Owner {nft.username}</p>
      //       <p class="card-text">{"Price" + " " + "Eth" + " " + nft.nft_price}</p>
      //       <button class="btn btn-primary" onClick = {(e) => this.onClick(e, nft)} >Buy NFT</button>
      //     </div>
      //   </div>
        
      // </div>
   
      // ))

      this.state.nft_array.map(nft => {
        // console.log(nft.username, " ", this.state.owner)
        // console.log("    ")
        if(nft.username != this.state.owner )
        { 
          return(
        <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{nft.nft_name}</h5>
            <img class="card-img-top" style = {{width : '300px', height : '200px'}} src={nft.nft_uri} alt="Card image cap"></img>
            <p class="card-text">Owner {nft.username}</p>
            <p class="card-text">{"Price" + " " + "Eth" + " " + nft.nft_price}</p>
            <button class="btn btn-primary" onClick = {(e) => this.onClick(e, nft)} >Buy NFT</button>
          </div>
        </div>
        
      </div>




          )
          
     

        }
      

      })




    }
      </div>
       
  
</div>

)
    }
  }

export default withAuthenticator(Home);
