
// import { hi } from './print.js';
// import './style.css'

// function hi () {
//   alert('hi');
// }

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  element.innerHTML =['hello', 'webpack'].join(' ');
  // element.classList.add('hello')

  btn.innerHTML = "click me and check the console";
  btn.onclick = function (e) {
    // import(
    //   /* webpackChunkName: "print" */
    //   './print'
    // ).then(
    //   function () {
    //     console.log("import success");
    //   }
    // )
    // console.log(join(['hello', 'lodash'], ' '));
    hi();
  }

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component())

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('PrintMe is refreshing!');
  })
}

if (process.env.NODE_ENV !== "production") {
  alert("now not in production mode...");
}
