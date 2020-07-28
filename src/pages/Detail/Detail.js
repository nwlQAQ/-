import React, { Component } from 'react'
import { requestDetail } from "../../util/request"
import { connect } from "react-redux"
// import { Link } from 'react-router-dom'
import { requestDetailAction, collectAction, cancelAction, getIsCollect } from "../../store/index.js"
import "./detail.css"
class Detail extends Component {
    constructor() {
        super()
        this.state = {
            detail: {},
            color:""
        }
        this.con = React.createRef()

    }
    componentDidMount() {
        let id = this.props.location.search.substr(1)
        requestDetail(id).then(res => {
            this.setState({
                detail: res.data,
                color: "#"+res.data.image_hue.substr(2)
            })
            console.log(this.state.color)
        })
        this.props.requestDetailAction(id)
        
        

    }
    nice(e) {
        if (e.target.className === "iconfont icon-dianzan") {
            e.target.className = "iconfont icon-zansel"

        } else if (e.target.className === "iconfont icon-zansel") {
            e.target.className = "iconfont icon-dianzan"

        }
    }
    goback() {
        this.props.history.go(-1)
    }
    jump() {
        let id = this.props.location.search.substr(1)
        this.props.history.push("/comments/" + id)
    }
    // collect(e){
    //     //test
    //     const { collectAction, cancelAction } = this.props
    //     console.log(this.props)
    //  if(e.target.className==="iconfont icon-xingxing1"){
    //      e.target.className="iconfont icon-xingxing"
    //      collectAction(this.state.detail)

    //  }else if(e.target.className==="iconfont icon-xingxing"){
    //     e.target.className="iconfont icon-xingxing1"

    // }
    // }
    render() {
        const { detail,color } = this.state
        const { isCollect, collectAction, cancelAction } = this.props

        // const { background } = {
         
        // }
        if (this.con.current && detail.body) {
            this.con.current.innerHTML = detail.body;
        }

        return (

            <div>
                <div className="topimg"><img src={detail.image} alt="" /><strong>{detail.title}</strong></div>
                <div className="topimg-cover" style={{background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 40%,${color} 98%)`}}></div>

                {detail.css ? <link rel="stylesheet" href={detail.css[0]} /> : null}
                <div ref={this.con}></div>
                <footer>
                    <div className="back">
                        <span className="iconfont icon-fanhui" onClick={() => this.goback()}></span>
                    </div>
                    <div className="main">
                        <span className="iconfont icon-pinglun" onClick={() => this.jump()}></span>
                        <span className="iconfont icon-dianzan" onClick={(e) => this.nice(e)}></span>
                        {isCollect ? <span className="iconfont icon-xingxing" onClick={() => cancelAction(detail.id)}></span> : <span className="iconfont icon-xingxing1" onClick={() => collectAction(detail)}></span>}
                        <span className="iconfont icon-fenxiang"></span>
                    </div>
                </footer>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        requestDetailAction: (id) => dispatch(requestDetailAction(id)),
        collectAction: (detail) => dispatch(collectAction(detail)),
        cancelAction: id => dispatch(cancelAction(id))
    }
}

const mapStateToProps = state => {
    // console.log(state)
    return {
        // detail: getDetail(state),
        isCollect: getIsCollect(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);