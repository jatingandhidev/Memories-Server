import jwt from 'jsonwebtoken'
import axios from 'axios'

const auth = async (req, res, next) => {
  try {
    const tokenType = req.headers.authorization.split(' ')[0]
    const token = req.headers.authorization.split(' ')[1]
    const isCustomAuth = tokenType === 'Custom'

    let decodedData

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test')
      req.userId = decodedData?.id
    } else {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const decodedData = await response.json()
      req.userId = decodedData?.id
    }
    next()
  } catch (error) {
    console.log(error)
  }
}

export default auth
