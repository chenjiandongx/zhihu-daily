import axios from 'axios'

const localApiPath = 'http://127.0.0.1:8010/'
const localImgPath = 'http://127.0.0.1:8010/img/'

const remoteApiPathNodeJS = 'https://zhihu-daily-api-proxy-nodejs.herokuapp.com/'
const remoteImgPathNodeJS = 'https://zhihu-daily-api-proxy-nodejs.herokuapp.com/img/'

const remoteApiPathPython = 'https://zhihu-daily-api-proxy-python.herokuapp.com/'
const remoteImgPathPython = 'https://zhihu-daily-api-proxy-python.herokuapp.com/img/'

const Util = {
  apiPath: remoteApiPathNodeJS,
  imgPath: remoteImgPathNodeJS
}

Util.ajax = axios.create({
  baseURL: Util.apiPath
})

Util.ajax.interceptors.response.use(res => {
  return res.data
})

Util.getTodayTime = function () {
  return new Date(new Date().setHours(0, 0, 0, 0)).getTime()
}

Util.prevDay = function (timestamp = (new Date()).getTime()) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1
  return year + month + day
}

export default Util
