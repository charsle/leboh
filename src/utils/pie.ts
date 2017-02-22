/** 
    	作者：charsle  coolboy11058@126.com 
    	时间：2016-11-28
    	描述：预定羽毛球示例图
*/
/**
 * 
 * 
 * @enum {number}
 */
enum Color { '#C8C7CC', '#FFF' ,'#828282','#A4A4A4'}
interface Config{
    docEle: string;
    resultData: any[];
    option:Object;
}
/**
 * 创建圆形示意图
 * 
 * @class PieShap
 */
export class PieShap {
    docEle: string;
    resultData: any[];
    context: Object;
    option: Object;
    constructor(public config:Config) {
        this.docEle = config.docEle;
        this.resultData = config.resultData;
        this.option = config.option;
    }
    /**
     * 
     * 实例 参数
     * 
     * @memberOf PieShap
     */
    initElement() {
        let canvas = document.getElementById(this.docEle);
        canvas.width = this.option.width;
        canvas.height = this.option.height;
        let ctx = canvas.getContext('2d');
        //  ctx.clearRect(0,0,canvas.width,canvas.height);
        this.deawFan(ctx, canvas);
        this.deawCircle(ctx);
        this.drawText(ctx);
        this.drawTime(ctx);
    }
    /**
     * 
     * 多个组装 （暂定）
     * 
     * 
     * @memberOf PieShap
     */
    createCanvas() { }
    /**
     * 
     * 绘制扇形
     * 
     * @param {any} ctx 上下文
     * @param {any} canvas
     * 
     * @memberOf PieShap
     */
    deawFan(ctx, canvas) {
       
        ctx.translate(canvas.width / 2, canvas.height / 2);
        var deg = Math.PI / 180;
        var jsonData = this.resultData
        // console.log(jsonData.length)
        for (let i = 0, len = jsonData.length; i < len; i++) {
            if (jsonData[i].is_schedule == 1) {
                 ctx.fillStyle = Color[1]; 
            } else {
                ctx.fillStyle = Color[0];   
            }
            ctx.sector(0, 0, this.option.radius, (i * 22.5) * deg, (i + 1) * 22.5 * deg).fill();
        }
    }
    /**
     * 绘制圆
     * 
     * 
     * @memberOf PieShap
     */
    deawCircle(context) {
        context.beginPath();
        context.fillStyle = Color[1];
        context.strokeStyle = Color[2];
        context.arc(0, 0, this.option.radius/2, 0, Math.PI * 2, true);
        context.stroke();
        context.fill();
         context.closePath();
    }
    drawTime(context) {
         context.beginPath();
        context.fillStyle = Color[0];
         context.font = '22px Arial';
        context.fillText('Time', this.option.width/2-50, -this.option.height/2+95);
        context.fill();
         context.closePath();
    }
    drawText(ctx) {
        let time = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23];
        var deg = Math.PI / 180;
        ctx.beginPath();
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = Color[2];
       
        for (var i = 0, len = time.length; i < len; i++) {
            // console.log(i * 45);
            let x = (this.option.radius + 15) * Math.cos(i * 22.5 * deg);
            let y = (this.option.radius + 15) * Math.sin(i * 22.5 * deg)
            ctx.fillText(time[i], x, y);
        }
        ctx.closePath();
    }
}

/**
 * canvas 扇形函数
 */
CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sDeg, eDeg) {
    // 初始保存
    this.save();
    this.strokeStyle =Color[3];
    // 位移到目标点
    this.translate(x, y);
    this.beginPath();
    // 画出圆弧
    this.arc(0, 0, radius, sDeg, eDeg);
    // 再次保存以备旋转
    this.save();
    // 旋转至起始角度
    this.rotate(eDeg);
    // 移动到终点，准备连接终点与圆心
    this.moveTo(radius, 0);
    // 连接到圆心
    this.lineTo(0, 0);
    // 还原
    this.restore();
    // 旋转至起点角度
    this.rotate(sDeg);
    // 从圆心连接到起点
    this.lineTo(radius, 0);
    this.stroke();
    this.closePath();
    // 还原到最初保存的状态
    this.restore();
    return this;
}
