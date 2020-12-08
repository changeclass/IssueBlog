import querystring from 'querystring'
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { EventEmitter } from 'events'
import localStore from '../../utils/localStore'
import axios from 'axios'
axios.defaults.headers = {
  Accept: 'application/json'
}
export default function Auth(props) {
  // const [code, setCode] = useState(undefined)
  const client_id = 'c9c764ff61bbe16744c3'
  const client_secret = '6ebcf177a9f3c0eee4f095f3462c6eb2a3472eaa'

  const githubLogin = () => {
    let popWin = window.open(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=public_repo`,
      null,
      'width=600,height=400'
    )

    let code
    let eventEmitter = new EventEmitter()

    let checkCode = () => {
      try {
        let query = popWin.location.search.substring(1)

        code = querystring.parse(query).code

        if (typeof code !== 'undefined') {
          clearInterval(intervalId)
          popWin.close()
          eventEmitter.emit('code', code)
        }
      } catch (err) {}
    }

    let intervalId = setInterval(checkCode, 1000)

    eventEmitter.on('code', (code) => {
      console.log(code)
      axios
        .post(
          'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token',
          {
            client_id,
            client_secret,
            code
          }
        )
        .then((result) => {
          const token = result.data.access_token
          console.log(token, result.data, 'token')
          axios.defaults.headers = {
            Authorization: 'Token ' + token
          }
          axios.get(`https://api.github.com/user`).then((res) => {
            let { name, avatar_url, email } = res.data
            console.log(name, avatar_url, email)
            localStore.saveToken(token)
          })
        })
    })
  }

  // const githubGetAccessToken = (code) => {
  //   console.log(code)
  //   axios
  //     .post('https://api.github.com/login/oauth/access_token', {
  //       client_id,
  //       client_secret,
  //       code
  //     })
  //     .then((result) => {
  //       console.log(result)
  //     })
  // }

  return <Button onClick={githubLogin}>登录</Button>
}
