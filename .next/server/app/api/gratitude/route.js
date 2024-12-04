"use strict";(()=>{var e={};e.id=838,e.ids=[838],e.modules={38013:e=>{e.exports=require("mongodb")},72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},86624:e=>{e.exports=require("querystring")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},86051:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>E,patchFetch:()=>m,requestAsyncStorage:()=>g,routeModule:()=>l,serverHooks:()=>h,staticGenerationAsyncStorage:()=>x});var s={};t.r(s),t.d(s,{GET:()=>c,POST:()=>c});var o=t(73278),i=t(45002),n=t(54877),a=t(83196),u=t(4128),d=t(31659),p=t(71309);async function c(e,r){if("POST"===e.method){console.log("req.body",e.body);let t=await (0,u.getServerSession)(d.authOptions);if(!t)return r.status(401).json({error:"Unauthorized"});let{gratitude:s}=await e.json();if(console.log("gradidute",s),!s)return r.status(400).json({error:"Gratitude data is required"});try{let e=(await a.Z).db(process.env.DATABASE_NAME).collection(process.env.COLLECTION_NAME);return console.log("user session id is",t.user.id),await e.updateOne({id:t.user.id},{$push:{gratitudes:s}}),p.NextResponse.json({message:"Gratitude added successfully"},{status:200})}catch(e){return console.error("Error adding gratitude:",e),p.NextResponse.json({error:"Internal Server Error"},{status:500})}}if("GET"===e.method){let e=await (0,u.getServerSession)(d.authOptions);if(!e)return p.NextResponse.json({error:"Unauthorized"},{status:401});try{let r=(await a.Z).db(process.env.DATABASE_NAME).collection(process.env.COLLECTION_NAME),t=(await r.findOne({id:e.user.id},{projection:{gratitudes:1,_id:0}}))?.gratitudes;if(console.log("gratitudes",t),!t)return p.NextResponse.json({gratitudes:{}},{status:200});return p.NextResponse.json({message:t},{status:200})}catch(e){return console.error("Error fetching gratitudes:",e),p.NextResponse.json({error:"Internal Server Error"},{status:500})}}return p.NextResponse.json({error:"Method Not Allowed"},{status:405})}let l=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/gratitude/route",pathname:"/api/gratitude",filename:"route",bundlePath:"app/api/gratitude/route"},resolvedPagePath:"/home/matth/Projects/GratitudeVault3/app/api/gratitude/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:g,staticGenerationAsyncStorage:x,serverHooks:h}=l,E="/api/gratitude/route";function m(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:x})}},31659:(e,r,t)=>{t.r(r),t.d(r,{GET:()=>l,POST:()=>l,authOptions:()=>c});var s=t(18445),o=t.n(s),i=t(22571),n=t(59718),a=t(86498),u=t(83196),d=t(84770),p=t.n(d);let c={adapter:(0,a.dJ)(u.Z),providers:[(0,i.Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET}),(0,n.Z)({server:process.env.EMAIL_SERVER,from:process.env.EMAIL_FROM})],pages:{signIn:"/auth/signin"},secret:process.env.NEXTAUTH_SECRET,callbacks:{async signIn({user:e}){console.log("Sign in attempt :)");let r=(await u.Z).db(process.env.DATABASE_NAME).collection(process.env.COLLECTION_NAME);if(!await r.findOne({email:e.email})){let t=p().createHash("sha256").update(e.email).digest("hex"),s=p().createHash("sha256").update(t).digest("hex");await r.insertOne({id:t,name:e.name,email:e.email,createdAt:new Date,gratitudes:[],publicUrl:s,settings:{theme:"system",soundEnabled:!0,remindersEnabled:!0}})}return!0},redirect:async({url:e,baseUrl:r})=>(console.log("Redirect:",{url:e,baseUrl:r}),e.startsWith(r)?e:r+e),session:async({session:e,token:r})=>(e.user.id=p().createHash("sha256").update(e.user.email).digest("hex"),e.user.publicUrl=p().createHash("sha256").update(e.user.id).digest("hex"),e),jwt:async({token:e,user:r})=>(r&&(e.sub=r.id),e)}},l=o()(c)},83196:(e,r,t)=>{t.d(r,{Z:()=>i});var s=t(38013);if(!process.env.MONGODB_URI)throw Error('Invalid/Missing environment variable: "MONGODB_URI"');let o=process.env.MONGODB_URI,i=new s.MongoClient(o,{}).connect()}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[787,833,462],()=>t(86051));module.exports=s})();