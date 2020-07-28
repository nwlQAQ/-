import axios from "axios"
// import qs from "qs"
axios.interceptors.response.use(res => {
    console.log("请求路径是：" + res.config.url)
    console.log(res)
    return res;
})
// const baseUrl="https://news-at.zhihu.com"
//获取最新新闻
export const requestLastest = () => {
    return axios({
        url:"/api/4/stories/latest",
    })
}
//获取前些天的新闻
export const requestBeforeNews = (id) => {
    return axios({
        url:"/api/4/stories/before/"+id,
    })
}
//详情页
export const requestDetail = (id) => {
    return axios({
        url:"/api/4/story/"+id,
    })
}
//长评论
export const requestLongComments = (id) => {
    return axios({
        url:"/api/4/story/"+id+"/long-comments",
    })
}
//短评
export const requestShortComments = (id) => {
    return axios({
        url:"/api/4/story/"+id+"/short-comments",
    })
}