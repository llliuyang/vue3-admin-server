import { RegisterModel } from '../db/models/user'
import { createUser, getUserInfo } from '../services/auth'
import { ErrorResponse, SuccessResponse } from '../utils/Response'
import errorInfo from '../constants/errorInfo'
import { createMd5 } from '../utils/createMD5'

const {
    registerUserNameExistInfo,
    registerFailInfo
} = errorInfo

export const registerController = async (params: RegisterModel) => {
    const { username, password } = params
    // 注册前先看下用户是否已注册 getUserInfo services
    const userInfo = await getUserInfo({ username })
    if (userInfo) { // 如果已注册
        // 用户已注册
        const { code, message } = registerUserNameExistInfo
        return new ErrorResponse(code, message)
    }
    // 用户不存在
    try {
        await createUser({ // 创建用户
            ...params,
            password: createMd5(password)
        })
        return new SuccessResponse({})
    } catch (err: any) { // 注册失败
        console.log(err.message, err.stack)
        const { code, message } = registerFailInfo
        return new ErrorResponse(code, message)
    }
}
