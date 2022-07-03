"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:()=>_default});const _url=require("url"),_axios=function(obj){return obj&&obj.__esModule?obj:{default:obj}}(require("axios"));async function getUserToken(code,state){let stated=JSON.parse(state),params=new _url.URLSearchParams;params.append("client_id",process.env.OSU_API_V2_CLIENTID),params.append("redirect_uri",process.env.OSU_API_V2_CALLBACK_URL),params.append("client_secret",process.env.OSU_API_V2_CLIENTSECRET),params.append("code",code),params.append("grant_type","authorization_code"),params.append("scope",stated.scope);let token=await _axios.default.post("https://osu.ppy.sh/oauth/token",params,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(res=>res.data).catch(error=>error.response.data);return token}async function revokeUserToken(){return await _axios.default.delete("https://osu.ppy.sh/api/v2/oauth/tokens/current",{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(res=>res.data).catch(error=>error.response.data),{message:"Success"}}async function getUser(header){var req,user;let user1=await _axios.default.get("https://osu.ppy.sh/api/v2/me",{headers:{Authorization:`${(req=header).authorization}`}}).then(res=>res.data).catch(error=>error.response.data);if("basic"!==user1.authentication)return{id:(user=user1).id,avatar:user.avatar_url,cover:user.cover_url,username:user.username,country:user.country,country_url:function(flag){let url="https://osu.ppy.sh/assets/images/flags/";for(let i=0;i<flag.length;i++)url+=(flag.charCodeAt(i)+127397).toString(16),url+=i!==flag.length-1?"-":".svg";return url}(user.country.code),statistics:user.statistics}}async function checkAccount(req,res,next){let user=await getUser(req.headers);user?next():res.status(401).send({error:"Unauthorized"})}var _default={getLoginUrl:function(){let params=new _url.URLSearchParams;return params.append("client_id",process.env.OSU_API_V2_CLIENTID),params.append("redirect_uri",process.env.OSU_API_V2_CALLBACK_URL),params.append("response_type","code"),params.append("scope","identify"),params.append("state",JSON.stringify({scope:"identify"})),`https://osu.ppy.sh/oauth/authorize?${params}`},getUserToken,revokeUserToken,getUser,checkAccount}