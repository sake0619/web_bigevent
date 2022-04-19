$(function () {
    $('#link_reg').on('click', function () {
        $('.login').hide()
        $('.reg').show()
    })
    $('#link_login').on('click', function () {
        $('.login').show()
        $('.reg').hide()
    })
    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    //通过form.verify()函数自定义检验规则
    form.verify({
        pwd: [/[\S]{6,12}$/, '密码必须6-12位，且不能出现空格'],
        repwd: function (value) {
            let pwd1 = $('.reg [name=password]').val()
            if (pwd1 !== value) {
                return '两次密码不一致'
            }
        }
    })
    //监听注册表单的注册事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认提交行为
        e.preventDefault()
        //发起POST请求
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) return layer.msg(res.message);

            layer.msg('注册成功,请登录')
            $('#link_login').click()
        })
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        //发起get请求
        $.ajax(
            {
                url: '/api/login',
                method: 'POST',
                //快速获取表单中的数据
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('登录失败')
                    }
                    //将登录成功得到的token字符串，保存到localStorage
                    localStorage.setItem('token', res.token)
                    location.href = './index.html'
                }
            })
    })
})