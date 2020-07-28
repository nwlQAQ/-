import React, { Component } from 'react';
import { connect } from "react-redux"
import { getCollections} from "../../store"
import "./Collection.css"
import { Link } from 'react-router-dom'
class Collection extends Component {
    goback() {
        this.props.history.go(-1)
    }
    render() {
        const { collections } = this.props;
        return (
            <div className="collbgc">
                <div className="com-header">
                    <span className="iconfont icon-fanhui" onClick={() => this.goback()}></span>
                    <div className="com-title">
                        我的收藏
              </div>
                </div>
                <ul className="xixi">
        {
            collections.map((item) => {
              return (
                    <li key={item.id}>
                      <Link to={"/detail?" + item.id}>
                        <div className="card" >
                          <div className="cardimg">
                            <img src={item.image} alt="" />
                          </div>
                          <div className="into">
                            <p>{item.title}</p>
                          </div>
                        </div>
                      </Link></li>
  
              )
            })
          }
          </ul>
          <h5>没有更多内容了</h5>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        collections: getCollections(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Collection);
