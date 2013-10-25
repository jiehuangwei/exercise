// 机器人登录新浪微博，取登录后COOKIES
// login weibo.com then get cookies 
var casper = require('casper').create();
casper.start('http://www.weibo.com/',
function() {
	this.echo('starting'); //this.test.assertExists('input[class="W_input"]', 'input[class="name"] is found');
	//this.test.assertExists('input[class="W_input"]', 'input[class="pass"] is found');
	//this.test.assertExists('a[class="W_btn_g"]', 'submit button is found');
	//this.echo("inputs of name and pass both exists.");
	//this.echo('name=' + this.fetchText('input[name="username'));
	//this.echo('pass=' + this.fetchText('input[name="password"]'));
	//this.echo('first location is ' + this.getCurrentUrl());
	//this.capture("login.png");
});
casper.then(function() {
	this.wait(5000,
	function() {
		this.echo("I've waited for 5 seconds");
	});
});
casper.then(function() {
	this.fillSelectors('div#pl_login_form', {
		'input[name="username"]': 'username',
		'input[name="password"]': 'password'
	},
	false);
	this.click('a[class="W_btn_g"]');
	this.echo('login clicked...');
});
casper.then(function() {
	this.wait(5000,
	function() {
		this.echo("I've waited for 5 seconds again");
	});
});
var cookie = '';
casper.then(function() {
	this.echo('current location is ' + this.getCurrentUrl());
	//this.echo(this.httpStatusHandlers);
	//var len = this.page.cookies.length();
	var count = 0;
	for (var i in this.page.cookies) {
		count++;
	}
	for (var i = 0; i < count; i++) {
		for (var item in this.page.cookies[i]) {
			if (item == 'name') {
				cookie += this.page.cookies[i][item] + '=';
			}
			if (item == 'value') {
				cookie += this.page.cookies[i][item] + '; ';
			} //this.echo(item+"<=>"+this.page.cookies[i][item]);
		}
	}
	var url = 'http://localhost/job/set_weibo_cookie';
	casper.open(url, {
		method: 'post',
		data: {
			'cookie': cookie
		}
	}).then(function() {
		this.echo('cookie saved');
	}); //this.echo(cookie);
	//this.echo('ok');
	//this.capture("logined.png");
});
casper.run();
