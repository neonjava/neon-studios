import { ImageResponse } from 'next/og';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { return new ImageResponse(
  <div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:72,background:'#fcfafd',color:'#19151d',fontFamily:'sans-serif'}}>
    <div style={{display:'flex',alignItems:'center',gap:18,fontSize:36,fontWeight:700}}><div style={{width:58,height:58,borderRadius:16,background:'linear-gradient(135deg,#c644ef,#e576ec)',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>N.</div><span>neon studios</span></div>
    <div style={{display:'flex',flexDirection:'column',gap:14}}><div style={{fontSize:72,fontWeight:750,letterSpacing:-3}}>Existing software.</div><div style={{fontSize:72,fontWeight:750,letterSpacing:-3,color:'#ac25d3'}}>Reimagined in Rust.</div><div style={{fontSize:25,color:'#716978',marginTop:13}}>Careful migrations. Verified compatibility. Measured change.</div></div>
    <div style={{fontSize:19,color:'#716978'}}>studio.neonjava.in</div>
  </div>, size);
}
