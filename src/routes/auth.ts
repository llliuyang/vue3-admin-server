import Router from "@koa/router";
import { loginController, registerController } from '../controller/auth'

const router = new Router({
	prefix: '/api/auth'
})

/**
 * 用户注册接口
 * /auth/register
 */
router.post('/register', async ctx => {
	ctx.body = await registerController(ctx.request.body)
})

/**
 * 用户登录接口
 * /auth/login
 */
router.post('/login', async ctx => {
	const { username, password } = ctx.request.body
	ctx.body = await loginController({ username, password })
})

/**
 * 测试接口
 */
router.get('/test', async ctx => {
	ctx.body = '这只是一个测试接口罢了~'
})
export default router
