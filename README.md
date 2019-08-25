# historical-line

Lit-Element web component to show a historical line of events

## Demo

```
<h2>Basic historical-line Demo</h2>
<h3>Demo</h3>
<historical-line ></historical-line>

## Attributes

* title (String)
* startYear (Number)
* endYear (Number)
* data (Array)

## CSS Variables

* --font-size
* --title-color

```
<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="historical-line.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<historical-line></historical-line>

```
## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

## Build
```
$ npm run build
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.

##Author
**user**

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details

## Generated

**generator-lit-element-base** - *yeoman npm package* - by [@manufosela](https://github.com/manufosela/generator-litelement-webcomponent)