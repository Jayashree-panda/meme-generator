import React from 'react';
import { }
const photos=[
{ src: '/images/vict-baby.png' },
  { src: '/images/ned.jpeg' },
  { src: '/images/devilgirl.jpg' },
  { src: '/images/trump.jpg' },
  { src: '/images/one-does-not.jpg' },
  { src: '/images/dank.png' },
  { src: '/images/boy.png' },
  { src: '/images/sad.png' },
  { src: '/images/wolf.png' },
  { src: '/images/fry.jpg' },
  { src: '/images/jobs.jpg' },
  { src: '/images/phone.jpg' },
  { src: '/images/oldie.png' },
  { src: '/images/image.png' },
  { src: '/images/doubt.png' },
  { src: '/images/crying.png' },
  { src: '/images/sponge.png' },
  { src: '/images/dog.png' },
  { src: '/images/frust.png' },
  { src: '/images/web.png' },
  { src: '/images/penguin.png' }

];

const initialState={
	toptext:"",
	bottomtext:"",
	isTopDragging:flase,
	isBottomDragging:false,
	topY:10%,
	topX:50%,
	bottomX:50%,
	bottomY:90%
}

class MemeMaker extends React.Component{
	constructor()
	{
		super();
		this.state={
			currentImage:0,
			modalIsOpen:false,
			currentImageBase64:null,
			...initialState
		};
	}

	getBase64Image(img)
	{
		var canvas=document.createElement("canvas");
		canvas.width=img.width;
		canvas.height=img.height;
		var ctx=canvas.getContext("2d");
		ctx.drawImage(img,0,0);
		var dataURL=canvas.toDataURL("image/png");
		return dataURL;
	}

	openImage=(index)=>{
		const image=photos[index];//returns the object
		//creating an image element()
		const base_image=new Image();
		base_image.src=image.src;
		const currentImageBase64=getBase64Image(base_image)
		this.setState(prevState=>({
			currentImage:index,
			modalIsOpen:!prevState.modalIsOpen,
			currentImageBase64,
			...initialState
		}));
	}
	changeText=(event)=>{
		this.setState({
			[event.currentTarget.name]:event.currentTarget.value
		});
		})
	}

	render()
	{
		return (
			<div className="content">
				{photos.map((image,index)=>{
					<div className="image-holder" key={image.src}>
					<span className="meme-top-caption">Top text</span>
					<img
					    style={{
					    	width:"100%",
					    	cursor:"pointer",
					    	height:"100%"
					    }}
					    alt={index}
					    src={image.src}
					    onclick={()=>this.openImage(index)}
					    role="presentation"
					     />
					     <span className="meme-bottom-caption">Bottom text</span>
					     
					</div>
				})}
				<Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
				<ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
				<ModalBody>
				<svg width={newWidth} height={newHeight} 
				 xmlns="http://www.w3.org/2000/svg" xmlnshlink="http://www.w3.org/1999/xlink">
				 <image ref={e1=>{this.imageRef=e1}} 
				        height={newHeight}
				        width={newWidth}
				 />
				 <text style={{...textStyle, zIndex:this.state.isTopDragging ? 4:1}}
				 x={this.state.topX}
				 y={this.state.topY}
				 domainBaseline="middle"
				 textAnchor="middle"
				 onMouseDown={event=>this.handleMouseDown(event,'top')}
				 onMouseUp={event=>this.handleMouseUp(event,'top')}>
				 {this.state.toptext}
				 </text>
				 <text 
				 	style={textStyle}
				 	domainBaseline=middle
				 	textAnchor=middle
				 	x={this.state.bottomX}
				 	y={this.state.bottomY}
				 	onMouseDown={event=>this.handleMouseDown(event,'bottom')}
				 	onMouseUp={event=>this.handleMouseUp(event,'bottom')}
					>
					{this.state.bottomtext}
				</text>
				</svg>
				<div className="meme-form">
				<FormGroup>
					<label for="toptext">Top Text</label>
					<input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText}/>
				</FormGroup>
				<FormGroup>
					<label for="toptext">Bottom Text</label>
					<input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText}/>
				</FormGroup>
				<button onClick={()=>this.convertSvgToImage()} className="btn btn-primary">Download Meme!</button>
				</div>
				</ModalBody>
				</Modal>
			</div>


			);
	}


	
}
export default MemeMaker;
