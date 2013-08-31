# grunt-joycss

> grunt plugin for joycss(joycss.org)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-joycss --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.initConfig({
  joycss: {
    index: {
      //紧凑拼图
      options: { layout: 'close' },
      cwd: 'test/less/',
      src: ['index.less'],
      dest: 'test/build/'
    },

    detail: {
      //水平布局
      options: { layout: 'horizontal' },
      cwd: 'test/less/',
      src: ['detials.less'],
      dest: 'test/build/'
    }
  }
});
grunt.loadNpmTasks('grunt-joycss');
```

### Usage Examples

You can try this plugin by command below:

```sh
$ git clone git://github.com/shepherdwind/grunt-joycss.git
$ cd grunt-joycss
$ npm install
$ grunt joycss
Running "joycss:index" (joycss) task
Start run joycss test/less/index.less
>> 30 images will merge to one image index-sprite.png[260x410]
>> write config success. cost time:884ms. joycss end

Running "joycss:detail" (joycss) task
Start run joycss test/less/detials.less
>> 5 images will merge to one image detials-sprite.png[253x50]
>> write config success. cost time:288ms. joycss end

Done, without errors.
```

## The "joycss" task

### Overview
In your project's Gruntfile, add a section named `joycss` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  joycss: {
    options: {
      // Task-specific options go here.
      // This is default options
      alpha: false,
      layout: 'auto', // auto | close | vertical | horizontal
      nochange: false,
      upload: false
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.alpha
Type: `Boolean`
Default value: `false`

If alpha is true, the sprited image file type will be png24 with alpha
transparent. By default, sprited image file is png8, which is more smaller and
support ie6.

#### options.layout
Type: `String`
Default value: `auto`

There is four supported value: auto | close | vertical | horizontal. You can get
more help by run `joycss --help`.

#### options.nochange
Type: `Boolean`
Default value: `false`

The same as `joycss --nochange`, when you don't need recreate the sprite image,
only change the result css file. Also, run `grunt joycss --nonchange` temporary
is ok.

#### options.upload
Type: `Boolean`
Default value: `false`

The same as `joycss --upload`, when you need upload sprite image to cdn, this
only work for Taobao F2Eer.

Also, `grunt joycss --upload` is ok. Before uplaod image, you need config you
user name, run `joycss --config` or `grunt joycss --config`.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
