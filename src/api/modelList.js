/* eslint-disable */
import { MODELLIST_ADD_API,MODELLIST_DELETE_API,MODELLIST_INFO_ALL_API,MODELLIST_INFO_API,MODELLIST_UPDATE_API} from './config'
import { SERVER_HOST } from '@/config/host'
import http from '@/utils/request'

export function addModelList (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + MODELLIST_ADD_API, data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

export function deleteModelList (data) {
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + MODELLIST_DELETE_API, data).then(res => {
      console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}


// 查詢issue數據
export function findModelListInfo (pageSize , currentPage, dateArray) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.get(SERVER_HOST + MODELLIST_INFO_API + '?limit=' + pageSize+'&skip=' + (currentPage -1) * pageSize + '&dateArray=' + dateArray).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}


// 查詢issue數據
export function findModelListInfoAll ( dateArray) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.get(SERVER_HOST + MODELLIST_INFO_ALL_API + '?dateArray=' + dateArray).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}

// 更新Training
export function updateModelList (_id, updateData ) {
  // console.log(dateArray)
  return new Promise((resolve, reject) => {
    // console.log(userInfo)
    http.post(SERVER_HOST + MODELLIST_UPDATE_API, {_id, updateData}).then(res => {
      // console.log(res)
      resolve(res)
    }).catch(err => {
      // for Debug
      reject(err)
      console.log(err)
    })
  })
}