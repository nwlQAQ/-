import React, { Component } from 'react'
import "./Index.css"
import { Carousel, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom'
import { requestLastest, requestBeforeNews } from "../../util/request"
export default class Index extends Component {
  constructor() {
    super()
    this.n = 0;
  }
  state = {
    data: [],//轮播图数组
    carddata: [],//今日新闻数组
    imgHeight: 276,
    isRequest: true,//请求开关
    News: [],
  }
  componentDidMount() {
    requestLastest().then(res => {

      this.setState({
        data: res.data.top_stories,
        carddata: res.data.stories
      });
    })
    window.onscroll = () => {
      var wh = document.documentElement.clientHeight;
      var dh = document.documentElement.offsetHeight
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      if (wh + st + 50 >= dh && this.state.isRequest) {
        this.setState({
          isRequest: false
        })
        // console.log(this.state.isRequest)
        this.n++;
        var times = this.getTime(this.n)
        requestBeforeNews(times.params).then(res => {
          // console.log(carddata)
          this.setState({
            // News:this.state.News.concat(res.data),
            News: [...this.state.News, res.data],
            isRequest: true,

          })
          // console.log(this.state.isRequest,this.state.time,this.state.News[0].date)
        })
      }
          	//改变顶部文字内容
            var titles = document.querySelectorAll("ul .title span");
            var header = document.querySelector(".header .title p")
            // console.log(titles,header)
            var arr = [];
            for (var i = 0; i < titles.length; i++) {
                arr.push(titles[i].getBoundingClientRect().top)
            }
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] < header.clientHeight) {
                    header.innerHTML = titles[j].innerHTML+"资讯";
                } else {
                    break;
                }
            }
            header.innerHTML = header.innerHTML === '今日新闻资讯' ?  this.getHello().text: header.innerHTML
        
    }
  }
  componentWillUnmount() {
    window.onscroll = null;
  }
  show(x) {
    return `${x.substr(4, 2)}月${x.substr(6, 2)}日`
  }

  getHello() {
    let timeNow = new Date();
    let date=timeNow.getDate();
    let Month=timeNow.getMonth()+1
    let hours = timeNow.getHours();
    let text = "";
    if (hours >= 23 || hours <= 5) {
      text = "早点休息";
    } else if (hours > 5 && hours <= 11) {
      text = "早上好！";
    } else if (hours > 11 && hours <= 13) {
      text = "中午好";
    } else if (hours > 13 && hours <= 18) {
      text = "下午好";
    }
    else if (hours > 18 && hours <= 23) {
      text = "晚上好";
    }
    return {text,date,Month};
  };
 
  getTime(n) {
    var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);//展示的时间对象
    var paramsDate = new Date(new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000);//发起请求的参数时间对象
    var showM = (showDate.getMonth() + 1 + "").padStart(2, '0')
    var showD = (showDate.getDate() + "").padStart(2, '0')
    var showTime = showM + "月" + showD + "日";
    var paramsY = paramsDate.getFullYear()
    var paramsM = (paramsDate.getMonth() + 1 + "").padStart(2, '0')
    var paramsD = (paramsDate.getDate() + "").padStart(2, '0')
    var paramsTime = paramsY + paramsM + paramsD
    return {
      show: showTime,
      params: paramsTime,
      showM: showM,
      showD: showD
    }
  }
  render() {
    return (
      <div>
        <div className="header">
          <div className="con">
            <span>
              <b>{this.getHello().date}</b>
              <p>{this.getHello().Month}月</p>
            </span>
            <div className="title">
              <Link to={"/collection"}>
              <div className="headimg">
                <img src="http://img4.imgtn.bdimg.com/it/u=2336257542,2153193806&fm=26&gp=0.jpg" alt="" />
              </div></Link>
              <p> {this.getHello().text}</p>
            </div>
          </div>
        </div>
        <WingBlank>
          <Carousel
            className="Carousel"
            autoplay
            infinite
            autoplayInterval={2500}
        
          >
            {this.state.data.map(val => (
              <Link
                key={val.id}
                to={"/detail?" + val.id}
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <p>{val.title}</p>
                <i>{val.hint}</i>
                <img
                  src={val.image}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </Link>
            ))}
          </Carousel>
        </WingBlank>
        <ul>
          {this.state.carddata.length > 0 ? <li className="title"><span>今日新闻</span></li> : null}
          {this.state.carddata.map(i => (
            <li key={i.id}>
              <Link to={"/detail?" + i.id}>
                <div className="card" >

                  <div className="cardimg">
                    <img src={i.images[0]} alt="" />
                  </div>
                  <div className="into">
                    <p>{i.title}</p>
                    <i>{i.hint}</i>
                  </div>
                </div>
              </Link></li>
          ))}</ul>
        <div>
          {
            this.state.News.map((a, idx) => {
              return (
                <ul key={idx}>
                  {a.stories.length > 0 ? <li className="title whh"><span>{this.show(this.state.News[idx].date)}</span></li> : null}
                  {a.stories.map(item => (
                    <li key={item.id}>
                      <Link to={"/detail?" + item.id}>
                        <div className="card" >

                          <div className="cardimg">
                            <img src={item.images[0]} alt="" />
                          </div>
                          <div className="into">
                            <p>{item.title}</p>
                            <i>{item.hint}</i>
                          </div>
                        </div>
                      </Link></li>
                  ))}</ul>
              )
            })
          }
        </div>
      </div>
    )
  }
}
