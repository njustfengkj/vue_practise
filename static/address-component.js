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
    init: function () {
        this._buildObject();
        console.log(this.allProvince);
    },
    // 构建数据对象
    _buildObject: function () {
        //一般写法
        for (var i = 0; i < provinces.length; i++) {
            var siteID = provinces[i][0];
            var provinceID = provinces[i][1];
            var provinceName = provinces[i][2];
            var province = new Province(siteID, provinceID, provinceName);
            var cities = this._findCityByProvince(provinceID);
            // 将市赋给省
            province.cities=cities;
            this.allProvince.push(province);

        }
    },
    // 根据省查询所有的市
    _findCityByProvince: function (provinceID) {
        var cityAll = [];
        for (var i = 0; i < cities.length; i++) {
            if (cities[i][1] === provinceID) {
                var siteID = cities[i][0];
                var provinceID = cities[i][1];
                var cityID = cities[i][2];
                var cityName = cities[i][3];
                var city = new City(siteID, provinceID, cityID, cityName);
                cityAll.push(city);
            }
        }
        return cityAll;
    }
};
$(function () {
    CitySelector.init();
});
