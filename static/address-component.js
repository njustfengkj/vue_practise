// 省
var Province = function (_siteID, _provinceID, _provinceName) {
    this.siteID = _siteID;
    this.provinceID = _provinceID;
    this.provinceName = _provinceName;
};
// 市
var City = function (_siteID, _provinceID, _cityID, _cityName) {
    this.siteID = _siteID;
    this.provinceID = _provinceID;
    this.cityID = _cityID;
    this.cityName = _cityName;
};
var CitySelector = {
    //所有的省对象
    allProvince: [],
    // 初始化
    init: function () {
        this._buildObject();
        this._buildPage();
        // console.log(this.allProvince);
        $('input[name=areaZH]').focus(function () {
            $(".panel").show();
            $(".province").show();
            $(".city").hide();
        });
        // 隐藏面板
        $(document).click(function (e) {
            if ($(e.target).attr("name") != "areaZH") {
                $(".panel").hide();
            }
        });
        // 阻止事件传播
        $(".panel").click(function (e) {
            e.stopPropagation();
        });
    },
    // 构建数据对象
    _buildObject: function () {
        // //一般写法
        // for (let i = 0; i < provinces.length; i++) {
        //     var siteID = provinces[i][0];
        //     var provinceID = provinces[i][1];
        //     var provinceName = provinces[i][2];
        //     var province = new Province(siteID, provinceID, provinceName);
        //     var cities = this._findCityByProvince(provinceID);
        //     // 将市赋给省
        //     province.cities=cities;
        //     this.allProvince.push(province);
        //
        // }
        // 二般写法
        this.allProvince = provinces.map(p => {
            let province = new Province(p[0], p[1], p[2]);
            let cities = this._findCityByProvince(p[1]);
            province.cities = cities;
            return province;
        })
    },
    // 根据省查询所有的市
    _findCityByProvince: function (provinceID) {
        // var cityAll = [];
        // for (let i = 0; i < cities.length; i++) {
        //     if (cities[i][1] === provinceID) {
        //         var siteID = cities[i][0];
        //         var provinceID = cities[i][1];
        //         var cityID = cities[i][2];
        //         var cityName = cities[i][3];
        //         var city = new City(siteID, provinceID, cityID, cityName);
        //         cityAll.push(city);
        //     }
        // }
        // return cityAll;
        return cities.filter(c => c[1] === provinceID)
            .map(c => {
                return new City(c[0], c[1], c[2], c[3]);
            });
    },
    _buildPage: function () {
        // 生成省页面
        let provinceStr = "";
        for(let i=0; i<this.allProvince.length; i++){
            let province=this.allProvince[i];
            provinceStr+=`<button class='btn btn-link'>${province.provinceName}</button>`
        }
        $(".province").html(provinceStr);
        // var self=this;
        // $(".province button").bind('click',function(e){
        $(".province button").bind('click',e=>{
            // 省
            let proName = $(e.target).text();
            // provinceObj=self._findProvinceByName(proName);
            provinceObj=this._findProvinceByName(proName);
            cities='';
            cities=provinceObj.cities.map(o=>{
                return `<div class="checkbox">
<label>
<input type="checkbox" value="${o.cityName}">${o.cityName}
</label>
</div>`
            }).join('');
            cities+="<button class='btn btn-primary' name='ok'>确定</button>";
            cities+="<button class='btn btn-primary' name='ok'>取消</button>";
            $('.province').hide();
            $(".city").html(cities).show();
        });
    },
    // 根据省名查找省对象
    _findProvinceByName(proName){
        // let _province=null;
        // for(let i=0;i<this.allProvince.length;i++){
        //     if(province===this.allProvince[i].provinceName){
        //         _province=this.allProvince[i];break;
        //     }
        // }
        // return _province;
        return this.allProvince.filter(o=>o.provinceName===proName)[0];
    }
};
$(function () {
    CitySelector.init();
});
