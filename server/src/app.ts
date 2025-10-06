import userRouter from "./routes/user.route"

const MODULE_ROUTE_MAPPING = [
    {
        prefix: '/user',
        router: userRouter
    }
]

export default MODULE_ROUTE_MAPPING