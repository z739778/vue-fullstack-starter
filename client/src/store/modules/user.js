import { assign } from 'lodash'
import { saveMulti, clearMulti } from '../../storage'
import { init, login, getUserInfo } from './user.api'
import { STORE_KEY_USERNAME, STORE_KEY_ACCESSTOKEN, STORE_KEY_REFRESHTOKEN } from '../../constants'

const stored = init()

const state = {
  _id: '',
  role: 'guest',
  username: stored[0] || '',
  accessToken: stored[1] || '',
  refreshToken: stored[2] || ''
}

let userInitPromise = null

const mutations = {
  // set user info
  SET_USER_INFO (state, userInfo) {
    state._id = userInfo._id
    state.role = userInfo.role
    state.username = userInfo.username
    state.accessToken = userInfo.accessToken
    state.refreshToken = userInfo.refreshToken
  },
  // update stored token
  UPDATE_TOKEN (state, payload) {
    state.accessToken = payload.accessToken
    state.refreshToken = payload.refreshToken
  },
  // after logout
  LOGOUT (state) {
    state._id = ''
    state.username = ''
    state.role = 'guest'
    state.accessToken = ''
    state.refreshToken = ''
  }
}

const actions = {
  // login action
  login ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      login(payload.username, payload.password).then(data => {
        getUserInfo(data.token).then(user => {
          const userInfo = assign({}, user, {
            username: payload.username,
            accessToken: data.token,
            refreshToken: ''
          })
          commit('SET_USER_INFO', userInfo)
          saveMulti([{
            key: STORE_KEY_USERNAME,
            value: userInfo.username
          }, {
            key: STORE_KEY_ACCESSTOKEN,
            value: userInfo.accessToken
          }, {
            key: STORE_KEY_REFRESHTOKEN,
            value: userInfo.refreshToken
          }])
          resolve()
        }).catch(() => {})
      }).catch(err => { reject(err) })
    })
  },
  // refresh token action
  refreToken ({ commit }, payload) {
    commit('REFERE_TOKEN')
    saveMulti[
      {
        key: STORE_KEY_ACCESSTOKEN,
        value: payload.accessToken
      }, {
        key: STORE_KEY_REFRESHTOKEN,
        value: payload.refreshToken
      }
    ]
  },
  // logout action
  logout ({ commit }, payload) {
    commit('LOGOUT')
    clearMulti([STORE_KEY_USERNAME, STORE_KEY_ACCESSTOKEN, STORE_KEY_REFRESHTOKEN])
  },
  // init user info
  initUserInfo ({ commit, dispatch, state }) {
    userInitPromise = new Promise((resolve, reject) => {
      // token
      if (stored[1]) {
        getUserInfo(stored[1]).then(data => {
          let userInfo
          if (data._id) {
            userInfo = assign({}, data, {
              username: stored[0],
              accessToken: stored[1],
              refreshToken: stored[2]
            })
            commit('SET_USER_INFO', userInfo)
          }
          resolve(userInfo)
        }).catch(err => { reject(err) })
      } else {
        resolve()
      }
    })
    return userInitPromise
  }
}

const getters = {
  userId (state) {
    return state._id
  },
  userRole (state) {
    return state.role
  },
  accessToken (state) {
    return state.accessToken
  },
  username (state) {
    return state.username
  },
  loggedIn (state) {
    return !!(state.username && state.accessToken)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

export { userInitPromise }
