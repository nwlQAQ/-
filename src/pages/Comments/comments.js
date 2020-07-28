import React, { Component } from 'react'
import "./comment.css"
import { requestLongComments, requestShortComments } from "../../util/request"
import {filterTime} from "../../util/filter"
export default class comments extends Component {
  constructor() {
    super();
    this.state = {
      longArr: [],
      shortArr:[]
      
    }
    this.isNice=React.createRef()
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id)
    requestLongComments(id).then(res => {
      this.setState({
        longArr: res.data.comments
      })

    })
    requestShortComments(id).then(res=>{
      this.setState({
        shortArr:res.data.comments
      })
    })
  }
  nice(e){
  // var num=parseFloat(this.isNice.current.innerHTML);
    if(e.target.className==="iconfont icon-dianzan"){
        e.target.className="iconfont icon-zansel"
        // console.log(num)

    }else if(e.target.className==="iconfont icon-zansel"){
       e.target.className="iconfont icon-dianzan"

   }
}
  goback() {
    this.props.history.go(-1)
  }
  render() {
    const { longArr,shortArr } = this.state
    return (
      <div>
        <div className="com-header">
          <span className="iconfont icon-fanhui" onClick={() => this.goback()}></span>
          <div className="com-title">
    {longArr.length+shortArr.length}条评论
              </div>
        </div>
        <div className="nice">
        {/* 长评 */}
        <div className="com-main">
         {longArr.length===0?null: <h2>{longArr.length}条长评</h2>}
         <div>
           {
             this.state.longArr.map((a,idx)=>{
               return(
                <div className="long-card" key={idx}>
                <div className="avatar">
                  <img src={a.avatar} title={a.author} alt=""/>
                </div>
                <div className="com-con">
                <p>{a.author}<span>…</span></p>
                
                  <div className="comdetail">
                    {a.content}
                  </div>
               {a.reply_to?<div className="otherreply">
                    //{a.reply_to.author}:{a.reply_to.content}
                  </div>:null}
                  <div className="com-time">
                
                  <div className="youreply">
                    <span className="iconfont icon-pinglun"></span>   
                    </div>
                    <div className="dianzan" onClick={(e)=>this.nice(e)}>
               <b>{a.likes}</b>
                    <span className="iconfont icon-dianzan" ></span>
                    </div>
                    <i>{filterTime(a.time)}</i>
                  </div>
                </div>
            
                </div>
               )
             })
           }
         </div>

        </div>
        {/* 短评 */}
        <div className="com-main">
          <h2>{shortArr.length}条短评</h2>
         <div>
           {
             this.state.shortArr.map((a,idx)=>{
               return(
                <div className="long-card" key={idx}>
                <div className="avatar">
                  <img src={a.avatar} title={a.author} alt=""/>
                </div>
                <div className="com-con">
                <p>{a.author}<span>…</span></p>
                
                  <div className="comdetail">
                    {a.content}
                  </div>
               {a.reply_to?<div className="otherreply">
                    //{a.reply_to.author}:{a.reply_to.content}
                  </div>:null}
                  <div className="com-time">
              
                    
                    <div className="youreply">
                    <span className="iconfont icon-pinglun"></span>   
                    </div>
                    <div className="dianzan" onClick={(e)=>this.nice(e)}>
                   {a.likes? <b ref={this.isNice}>{a.likes}</b>:null}
                    <span className="iconfont icon-dianzan" ></span>
                    </div>
                    <i>{filterTime(a.time)}</i>
                  </div>
                </div>
            
                </div>
               )
             })
           }
         </div>

        </div>
        </div>
        <div className="com-footer">
          <div className="headerimg">
            <img src="http://img4.imgtn.bdimg.com/it/u=2336257542,2153193806&fm=26&gp=0.jpg" alt="" />
          </div>
          <div className="writeyour">
            说说你的看法…
           </div>
        </div>
      </div>
    )
  }
}
