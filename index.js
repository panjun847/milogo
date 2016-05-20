  var drawMiLogo={};
    drawMiLogo.XXXL=0.16;
    drawMiLogo.XXL=0.14;
    drawMiLogo.XL=0.125;
    drawMiLogo.L=0.11;
    drawMiLogo.M=0.1;
    drawMiLogo.S=0.09;
    drawMiLogo.XS=0.08;
    drawMiLogo.XXS=0.065;
    drawMiLogo.XXXS=0.05;
  function drawMiLogoSVG(width,type,opt){
    var start={x:opt.x||0,y:opt.y||0};
    type=type||drawMiLogo.M;
    var border=Math.round(width*type);
    var hborder=(border/2);
    var sqrt2=Math.sqrt(2);
    var paddingtop=(width - 4*border)/2;
    var paddingleft=(width - 5.5*border)/2;
    var bgcolor=opt.background || "#ff7600";
    var color=opt.color||"#FFFFFF";
    var svg=['<svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">'];

    //橙色底
    svg.push( Template('<rect width="{width}" height="{height}" style="fill:{bg}"/>',{
      width:width,
      height:width,
      bg:bgcolor
    }) );
    start.x+=paddingleft;
    start.y+=paddingtop;

    //白色基本形状
    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x,
      y:start.y,
      width:border,
      height:4*border,
      color:color
    }));
    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x,
      y:start.y,
      width:2.5*border,
      height:border,
      color:color
    }));

    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x+3*border,
      y:start.y+1.5*border,
      width:border,
      height:2.5*border,
      color:color
    }));
    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x+4.5*border,
      y:start.y,
      width:border,
      height:4*border,
      color:color
    }));
    //扇形
    svg.push(Template('<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/>',{
      x:start.x+2.5*border,
      y:start.y+1.5*border,
      r:1.5*border,
      color:color
    }));
    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x+border,
      y:start.y+border,
      width:1.5*border,
      height:3*border,
      color:bgcolor
    }));
    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x+border,
      y:start.y+1.5*border,
      width:2*border,
      height:2.5*border,
      color:bgcolor
    }));
    svg.push(Template('<circle cx="{x}" cy="{y}" r="{r}" fill="{color}"/>',{
      x:start.x+2.5*border,
      y:start.y+1.5*border,
      r:0.5*border,
      color:bgcolor
    }));
    //最后中间竖线
    svg.push(Template('<rect x="{x}" y="{y}" width="{width}" height="{height}" style="fill:{color}"/>',{
      x:start.x+1.5*border,
      y:start.y+1.5*border,
      width:border,
      height:2.5*border,
      color:color
    }));
    svg.push('</svg>');
    return svg.join("");
  }

  function Template( html , data , reg ){
    if( !data ){return html ;}
    var reg = reg ||  /\{([\w-]+)\}/g ;
      html=specialEscape(html);
    return html.replace( reg, function( m , name ){
      if( data[name] !== undefined ){
        var ret ;
        if(data[name] instanceof Function){
          ret =  data[name].call(data);
        }else{
          ret =  specialEscape(data[name]);
        }
        return reg.test( ret ) ?  
         Template( ret , data , reg ) : ret ;
      }else{
        if(window.__debug__){
          return name;
        }else{
          return "" ;
        }
      }
    });
  }
  function specialEscape(str){
    var o={
      "{quot}":"'"
    }
    for(var p in o){
      if(o.hasOwnProperty(p)){
        str = (str+"").replace(p,o[p]);
      }
    }
    return str;
  }
module.exports=function(width,background,color,type){
    width=width||50;
    var xtype=drawMiLogo[(type+"").toUpperCase()] || drawMiLogo.M
    var opt={
      background:background||"#ef5b00",
      color:color||"#FFFFFF"
    }
  return  drawMiLogoSVG(width,xtype,opt)
}
