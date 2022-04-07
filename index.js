const mix = require('laravel-mix');
const path = require('path');
const ManifestPlugin = require('./manifest-plugin.js');

class NanoSvg {
    name() {
        return ['nanosvg', 'svg'];
    }

    dependencies() {
        return ['nanosvg'];
    }

    register(pattern, destination = '', options = {}) {
        this.patterns = [].concat(pattern);
        const nanofy = require("nanosvg");

        await nanofy(
            pattern,
            path.join(Mix.config.publicPath, destination),
            options
        )
    }

    webpackPlugins() {
        let {patterns} = this;

        return [
            new ManifestPlugin(patterns),
        ];
    }
}

mix.extend('nanosvg', new NanoSvg());
