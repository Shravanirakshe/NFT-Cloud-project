import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class Nft extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imgSrc: "https://gmedia.playstation.com/is/image/SIEPDC/ps-plus-cloud-storage-dark-icon-01-en-25sep20?$native--t$",
                        price: '',
                        name : '',
                        owner : '',
                        selectedFile : null,
                        fileSuccess : false };
  
    }
   
     


    preview = (event) => {
        this.setState({
            imgSrc : URL.createObjectURL(event.target.files[0])
          })
        this.setState({
            selectedFile : event.target.files[0]
          })
          console.log(this.state.imgSrc)
      
    }

    onClickCreate = (event) => {
        
        // alert('Your NFT was created!');
        // event.preventDefault();
      


    }
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
          <Form.Label>Enter price of NFT $</Form.Label>
          <Form.Control  value={this.state.price} type="number" onChange={(e) => this.handleChangePrice(e)}
                        placeholder="Enter price of NFT $" />
        </Form.Group>
        <br/>  
        <Form.Group>
          <Form.Label>Enter your Owner name</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter your Owner name" value = {this.state.owner} onChange={(e) => this.handleChangeOwner(e)} />
        </Form.Group>
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

