import { generator } from "./generator";
import * as cryptoInterceptor from "../interceptors/crypto";
const instance = generator();
instance.interceptors.request.use(cryptoInterceptor.requestInterceptor);
export default instance;
