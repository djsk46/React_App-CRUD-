import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state={
      mode:"welcome",
      selected_content_id:2,
      subject:{title:"WEB",sub:"world Wid Web!"},
      welcome:{title:"welcome",desc:"hello React!"},
      contents:[
        {id:1,title:"HTML", desc:"HTML is for information"},
        {id:2,title:"CSS", desc:"CSS is for information"},
        {id:3,title:"JavaScript", desc:"JavaScript is for information"}
      ]
    }
  }
getReadContent(){
  var i=0;
      while(i<this.state.contents.length){
        var data=this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          return data;
        }
        i=i+1;
      }
}

  getContent(){
    var _title, _desc,_article= null;
    if(this.state.mode==="welcome"){
      _title=this.state.welcome.title;
      _desc=this.state.welcome.desc; 
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>;
    }else if(this.state.mode ==="read"){
     var _content=this.getReadContent();
     console.log(_content);
     console.log(_content);
      _article=<ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
      
    }else if(this.state.mode==="create"){
      _article=<CreateContent onSubmit={function(_title,_desc){
        // add content to this.state.contents
        this.max_content_id=this.max_content_id+1;
        // this.state.contents.push(
        // {id:this.max_content_id, title:_title, desc:_desc}
        // ); 원본의 데이터에 추가하기때문에 나중에 수정하기 복잡하거나 불가능하다.
        // this.setState(this.state.contents);
        // var _contents=this.state.contents.concat( //.concat() 원본데이터를 변경하지 않기때문에 수정이 쉽다.
        //   {id:this.max_content_id, title:_title, desc:_desc}
        //   )
        var _contents=Array.from(this.state.contents);
        _contents.push({id:this.max_content_id, title:_title, desc:_desc});

       this.setState({
         contents:_contents,
         mode:"read"
        });
       console.log(_title,_desc);
      }.bind(this)}></CreateContent>
    }else if(this.state.mode==="update"){
      _content=this.getReadContent();
      _article=<UpdateContent data={_content} onSubmit={function(_id,_title,_desc){
        var _contents=Array.from(this.state.contents);
        var i=0;
        while(i<_contents.length){
          if(_contents[i].id===_id){
            _contents[i]={id:_id, title:_title, desc:_desc};
            break;
          }
          i=i+1;
        }
       this.setState({
         contents:_contents,
         mode:"read"
        });
        console.log("con : ",_contents);
        console.log(_id,_title,_desc);
      }.bind(this)}></UpdateContent>
    } 
    return _article;
   } //getContent End
  render(){
    return (
      <div className="App">
     <Subject 
     title={this.state.subject.title} 
     sub={this.state.subject.sub}
     onChangePage={function(){
       this.setState({mode:"welcome"});
     }.bind(this)
    }
     >
     </Subject>
     <TOC 
     data={this.state.contents} 
     onChangePage={function(id){
       this.setState({mode:"read", selected_content_id:Number(id)});
     }.bind(this)
     }></TOC>
     <Control onChangeMode={function(_mode){
       if(_mode === "delete"){
         if(window.confirm("정말 삭제하시겠습니까?")){
           var _contents=Array.from(this.state.contents);
           var i=0;
           while(i<this.state.contents.length){
             if(_contents[i].id=== this.state.selected_content_id){
               _contents.splice(i,1);
               break;
             }
            i=i+1;
           }
           this.setState({
             mode:"welcome",
             contents:_contents
           });
          alert("삭제 완료");
         }
       }else{

         this.setState({mode:_mode});
        }
     }.bind(this)}></Control>
     {this.getContent()}
    </div>
  );
}
}

export default App;
