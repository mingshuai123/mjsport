function Dbnumber(){
    this.render();
}
Dbnumber.prototype = {
    render:function(){
        $("#getCode").off("click").on("click", function () {
            var mobile = $("#phoneNumber").val();
            if (!(/^1[34578]\d{9}$/.test(mobile))) {
                alert("手机号码有误，请重填");
                return false;
            }
            var _this = this;
            time(_this);
            $.getJSON(listUrl + 'member/apicode', {mobile: mobile}, function (json, textStatus) {
                if (json.errCode != 0) {
                    alert(json.errMsg);
                    return false;
                }
            });
        });
        $("#validatePhone").off("click").on("click", function () {
            var mobile = $("#phoneNumber").val();
            var code = $("#code").val();
            if (!(/^1[34578]\d{9}$/.test(mobile))) {
                alert("手机号码有误，请重填");
                return false;
            }
            else if (code.length == 0) {
                alert("验证码不能为空！");
                return false;
            }
            $.getJSON(listUrl + 'member/changebindmobile', {mobile: mobile, code: code}, function (json) {
                if (json.wxUrl) {
                    window.location.href = json.wxUrl;
                } else if (json.errCode == 0) {
                    alert(json.errMsg);
                    window.location.href = "profile.html";
                } else {
                    alert(json.errMsg);
                }
            });
        });

    }
}
new Dbnumber();

