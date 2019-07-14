window.onload=function () {
    // 面向对象：抽象  多台  集成  封装
    // vue实例：成员 行为
    new Vue({
        el:'#app',
        data:{
            pageNo: 0,
            pageSize: 10,
            url:"http://127.0.0.1:3000/news/page/",
            data:[],
            isLoading:false,
            endOfTheScreen:false
        },
        //vue对象创建完成后调用
        created(){
            this.loadData(this.pageNo,this.pageSize);
            var self=this;
            window.onscroll=function () {
                self.endOfTheScreen=self.scrollCheck();
            }
        },
        // 监控属性
        watch:{
            endOfTheScreen(newValue){
                if(newValue){
                    this.load(++this.pageNo,this.pageSize);
                }
            }
        },
        methods:{
            scrollCheck(){
                var winHeight=window.scrollY+window.innerHeight;
                return window===document.documentElement.offsetHeight;
            },
            loadData(pageNo,pageSize){
                this.isLoading=true;
                // 延时2000毫秒加载数据
                setTimeout(()=>{
                    // 升级版的ajax 返回Promise对象
                    fetch(this.url+pageNo+"/"+pageSize)
                        .then(res=>{
                            return res.json();
                        })
                        .then(res=>{
                            // console.log(res);
                            for(let element in res.data){
                                this.data.push(res.data[element])
                            }
                            this.isLoading=false;
                        })
                },2000);
            }
        },
    });
}
