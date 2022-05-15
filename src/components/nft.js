import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Auth } from 'aws-amplify';




class Nft extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imgSrc: "https://pic.onlinewebfonts.com/svg/img_148071.png",
                        price: '',
                        name : '',
                        owner : '',
                        file_sample : null,
                        fileSuccess : false ,
                        auth_token : '',
                        email : "",
                        username : ""  
                      };
  
    }
   
     
    
    async componentDidMount() {
      const response = await Auth.currentSession()
      .then((data) => {
       
         return data
      }
      
      )
      .catch(err => err);

      await console.log("Response",response)
      this.setState({
          auth_token  : response.idToken.jwtToken,
          email : response.idToken.payload.email,
          username : response.accessToken.payload.username,
        });
      }

    onClickCreate = (event) => {
      


      const reader = new FileReader();
      // this.setState({
      //   imgSrc : URL.createObjectURL(event.target.files[0])
      // })

      console.log('Hi from preview', this.state.selectedFile)
      //var name1 = this.state.selectedFile.name

      reader.readAsArrayBuffer(this.state.selectedFile)

            var myHeaders = new Headers();
            //myHeaders.append("x-amz-meta-customLabels",'');
            myHeaders.append("Content-Type", "image/jpeg");
            
            myHeaders.append("x-amz-meta-name", this.state.name);
            myHeaders.append("x-amz-meta-owner", '' );
            myHeaders.append("x-amz-meta-price", this.state.price);
            myHeaders.append("x-amz-meta-username", this.state.username);
            myHeaders.append("x-amz-meta-email", this.state.email);

            myHeaders.append("Authorization", "Bearer "+this.state.auth_token)

            var headers =  { 'name': this.state.name, 'owner': this.state.owner,'price': this.state.price }

            console.log("myHeaders",headers);
      
           reader.onload = function (event ) {
            var elem = document.getElementById('formFile').value;
            var name = elem.split('\\')[2];

            console.log("Element ",name)


            console.log("Reader Object",event.target.result)
            console.log("Reader ",reader.result)


            var file = new Uint8Array(reader.result);

          
            var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: file,
            redirect: 'follow'
            };

            console.log("requestOptions",requestOptions);

    
            fetch(`https://vwgyys73bb.execute-api.us-east-1.amazonaws.com/dev/nft_upload/finvest-images/${name}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result)).then(alert("Created NFT Successfully! It will be listed in the Marketplace Shortly"))
            .catch(error => console.log('error', error));

            
        }
       
     
          console.log(this.state.file_sample)
      
    }

    preview = (event) => {
      this.setState({
          imgSrc : URL.createObjectURL(event.target.files[0])
        })
      this.setState({
          selectedFile : event.target.files[0]
        })
        //console.log(this.state.imgSrc)
    
  }
    



  

    // onClickCreate = (event) => {
    //     const formData = new FormData();

    //     console.log(this.state.selectedFile.name);
    //     formData.append('File', this.state.selectedFile);
    //     // formData.append('File', this.state.selectedFile);
    //     // formData.append('Name', this.state.name);
    //     // formData.append('Owner', this.state.owner);
    //     // formData.append('Price', this.state.price);

    //     console.log("The Form Data is ");
    //     for (var value of formData.values()) {
    //         console.log(value);
    //      }
    //     //  const files = Array.from(event.target.files)
    //     //  console.log(files);

    //     //  var myHeaders = new Headers();
    //     //  myHeaders.append("Content-Type", "image/jpeg");
    //     //  myHeaders.append("name", this.state.name);
    //     //  myHeaders.append("owner", this.state.owner );
    //     //  myHeaders.append("price", this.state.price);
    //     var myHeaders = new Headers();
    //     //myHeaders.append("x-amz-meta-customLabels",  customLabels.value);
    //     myHeaders.append("Content-Type", "image/jpeg");
    //     myHeaders.append('Access-Control-Allow-Origin', '*');
    //     myHeaders.append("name", this.state.name);
    //     myHeaders.append("owner", this.state.owner );
    //     myHeaders.append("price", this.state.price);

    //    //  var file = new Uint8Array(reader.result);

       

    //     var requestOptions = {
    //     method: 'PUT',
    //     headers: myHeaders,
    //     body: formData,
    //     redirect: 'follow'
    //     };

    //     fetch(`https://vwgyys73bb.execute-api.us-east-1.amazonaws.com/dev/nft_upload/finvest-images/${this.state.selectedFile.name}`, requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result)).then(alert("Photo uploaded successfully!"))
    //     .catch(error => console.log('error', error));

        
 
    //     //  var requestOptions = {
    //     //  method: 'PUT',
    //     //  headers: myHeaders,
    //     //  body: this.state.selectedFile,
    //     //  redirect: 'follow'
    //     //  };
 
    //     //  fetch(`https://vwgyys73bb.execute-api.us-east-1.amazonaws.com/dev/nft_upload/finvest-images/${this.state.selectedFile.name}`, requestOptions)
    //     //  .then(response => response.text())
    //     //  .then(result => console.log(result)).then(alert("Photo uploaded successfully!"))
    //     //  .catch(error => console.log('error', error));



    //     // fetch(
		// // 	'',
		// // 	{
		// // 		method: 'POST',
		// // 		body: formData,
		// // 	}
		// // )
		// // 	.then((response) => response.json())
		// // 	.then((result) => {
		// // 		console.log('Success:', result);
		// // 	})
		// // 	.catch((error) => {
		// // 		console.error('Error:', error);
		// // 	});



    // }



    handleChangePrice = (event) => {
       
        this.setState({price : event.target.value});
    
      }
    handleChangeName = (event) => {
       
        this.setState({name : event.target.value});
    
      }
    handleChangeOwner = (event) => {
       
        this.setState({owner : event.target.value});
    
      }
    render() {
      return (<div>
    
       
  <h1>Create your NFT</h1>
  <div class="row">
  <div class="col-1">

      </div>
      <div class="col-4">
      <img id="frame"
             src={this.state.imgSrc}
             class="img-fluid"
        />
      
      </div>
      <div class="container col-4 ">
          
        <div className="row mb-3">
      
      <Form>
      <Form.Group>
             
              <label for="formFile" className="form-label">Choose a file</label>
              <input className="form-control" type="file" id="formFile" onChange={(e) => this.preview(e)}/>    
      </Form.Group>  
      <br/>  
      <Form.Group>
          <Form.Label>Enter your NFT name</Form.Label>
          <Form.Control type="text" name="name1"
                        placeholder="Enter your NFT name" value = {this.state.name} onChange={this.handleChangeName} />
        </Form.Group>
        <br/>    
      <Form.Group>
          <Form.Label>Enter price of listing your NFT in ETH</Form.Label>
          <Form.Control  value={this.state.price} type="number" onChange={(e) => this.handleChangePrice(e)}
                        placeholder="Enter price of NFT ETH" />
        </Form.Group>
        <br/>  
        {/* <Form.Group>
          <Form.Label>Enter your Owner name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter your Owner name" value = {this.state.owner} onChange={(e) => this.handleChangeOwner(e)} />
        </Form.Group> */}
       <div  style = {{ padding : '10px'}}>
        <Button variant="primary" onClick = {(e) => this.onClickCreate(e)}>
           Create
        </Button>
        </div>
      </Form>
      
           </div>
        </div>
        
    </div>
  </div>

)
    }
  }

export default Nft;

