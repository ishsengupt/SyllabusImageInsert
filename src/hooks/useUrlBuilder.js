import { api } from '../env'

const urlConfig = (secure = false, host = 'localhost', port = null, path = null) => {
  let apiPort
  let apiPath
  const proto = secure ? 'https://' : 'http://'

  let url = `${proto}${host}`

  if (port) {
    apiPort = `:${port}`
    url += apiPort
  }

  if (path) {
    apiPath = `/${path}`
    url += apiPath
  }

  url += '/'

  return url
}

export default (resource = null) => {
  // Get configuration
  const secure = api.secure
  const host = api.host
  const port = api.port
  const path = api.path

  let url = urlConfig(secure, host, port, path)

  if (resource) url += `${resource}/`

  return url
}
