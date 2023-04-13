### Introduction
In this article, we will discuss **Microfrontend** implementation and what is the importance of building scalable web applications. We will be using Webpack Module Federation as a tool to build Microfrontends but there are tools as well i.e. **single-spa** _(I take some other day to talk about this library)_

This article is written for Angular and **Angular CLI 15**. Make sure you have a compatible version if you want to try it out.

### Final implementation will look like :point_down:

![Microfrontends Gif](https://www.dropbox.com/s/0lt7qyn0yzzk0it/mef_module_federation.gif?raw=1 "Microfrontends Gif")

### Understanding Microfrontends
`Microfrontends` is an architectural style where frontend applications can easily be **developed, tested, and deployed independently**, while still appearing as a single product. This technique is called Microfrontend. In comparison `Monolithic` frontend architectures have a single codebase for frontend applications, which means the change in a code base in a single place can affect the entire application, which can make it more difficult to scale, test, and maintain. 

**Let's understand by simple product example 'ERP (Enterprise Resource Planning)'. Look at the diagram below.**

A **_Monolithic_** approach contains a single code base for **_Product, Supply, and Employee_**, where all teams are working and functionality cross touched by different teams. This means that any changes made to the codebase would affect the entire system and it makes more difficult to scale, test, and maintain

![Monolithic](https://www.dropbox.com/s/1jr3e4013y9kuh6/monolitic.jpg?raw=1 "Monolithic")

A **_Microfrontend_** could be created for the **_Product Module, while another created for Supply Module and Employee Module_**. Each Microfrontend would be self-contained it's own codebase, UI, and functionality and can be developed and deployed separately.

![Microfrontend](https://www.dropbox.com/s/2hfxqfge5rwcz8t/microfrontend.jpg?raw=1 "Microfrontend")

### Webpack Module Federation
**Module Federation** is a feature introduced in **Webpack 5** that allows for sharing modules across multiple applications or micro-frontends in a decentralized way. Webpack Module Federation solves this problem by enabling applications to share code and communicate with each other at runtime.

The basic idea of Module Federation is to define a **remote entry point** in one application that exports certain modules. These modules can then be consumed by another application as remote modules, without having to bundle them in the consuming application. 

**A sample code of the module federation**

```typescript
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        app1: 'http://localhost:3001/remoteEntry.js',
      },
    }),
  ],
};
```
### Provide a step-by-step guide for building a Microfrontend using Webpack Module Federation.

> The source code for this article can be found on [GitHub](https://github.com/engg-aruny/codehacks-angular-microfrontend-example/tree/master/mefs). 

1. Create an angular application using `angular cli` i.e.

   - `erp-shell-mef`
   - `erp-products-mef` 
   - `erp-supply-mef` and 
   -  `erp-employees-mef`

>  The **"shell"** in micro frontend development is like the outer layer of an application. It's a separate component that's responsible for organizing and coordinating the different parts (or "micro frontends") that make up the whole application. Think of it like the framework that holds everything together. It provides a common platform for all the micro frontends to work together, ensuring a smooth and cohesive user experience.

2. Use the `@angular-architects/module-federation` schematic to create a **shell** Microfrontend

```bash
ng add @angular-architects/module-federation --project erp-shell-mef --port 4200 --type host
```

3. Use the `@angular-architects/module-federation` schematic to create a **micro-frontend**

```bash
ng add @angular-architects/module-federation --project erp-products-mef --port 4201 --type remote
ng add @angular-architects/module-federation --project erp-supply-mef --port 4202 --type remote
ng add @angular-architects/module-federation --project erp-employees-mef --port 4203 --type remote
```
This command will generate the following files.

![Package Install Terminal Output](https://www.dropbox.com/s/90b3lzpg9j13xoz/terminal_schematic.jpg?raw=1 "Package Install Terminal Output")

4. Configure the **Shell** micro-frontend application to host module federation. We are going to configure Lazy routing `productModule`.

**product -> app-routing.module.ts**

```typescript
const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('erp-products-mef/productModule').then(m => m.ProductModule)
  },
];

```

**supply -> app-routing.module.ts**

```typescript
const routes: Routes = [
  {
    path: 'supply', loadChildren: () => import('./supply/supply.module').then(m => m.SupplyModule)
  },
];
```

**employees -> app-routing.module.ts**

```typescript
const routes: Routes = [
  {
    path: 'employees', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
];

```


5. We need typing, to avoid typescript compiler errors, do this for all micro-frontends

```typescript
declare module 'erp-products-mef/ProductModule';
declare module 'erp-supply-mef/SupplyModule';
declare module 'erp-employees-mef/EmployeeModule';
```

6. Now, you need to instruct the shell application that all paths starting with `erp-products-mef` are pointing to another micro-frontend. You need to tweak `webpack.config.js` and new host `4201`, do this for all micro-frontends and other hosts as well.

```typescript
const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    "erp-products-mef": "http://localhost:4201/remoteEntry.js",
    "erp-supply-mef": "http://localhost:4202/remoteEntry.js",
    "erp-employees-mef": "http://localhost:4203/remoteEntry.js",
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
```

7. To try everything out, we just need to start the shell and the microfrontend

```bash
npm run start
```

### Sharing Packages between micro frontends

```typescript
const { share, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'erp-products-mef',
  exposes: {
    './ProductModule': './src/app/product/product.module.ts',
  },

  shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' }
  })

});

```

### Communicate between microfrontend using `CustomEvent`

To communicate between a shell and a micro frontend following are the options available 

1. Event Bus
2. Shared Service 

For Demo purposes, we will be using Event Bus.

```typescript
  //Shell microfrontend
  sendNotification() {
    const event = new CustomEvent('product_mef_delete_event', {
      detail: {
        name: "Product 1",
      }
    });
    window.dispatchEvent(event);
  }
```

```typescript
  //product microfrontend
  ngOnInit(): void {
    window.addEventListener('product_mef_delete_event', (e: any) => {
      console.log(e.detail.name);
      var foundProduct = this.products.find(x => x.name === e.detail.name);
      const indexToRemove = this.products.indexOf(foundProduct!);
      if (indexToRemove !== -1) { // Check if the element exists in the array
        this.products.splice(indexToRemove, 1); // Remove one element at the found index
      } else {
        window.alert("Product 1 not found")
      }
    });
  }
```
_We will dispatch the event using the window.dispatchEvent() method, which sends the event to all event listeners that are registered for this event to all micro frontends_


> The source code for this article can be found on [GitHub](https://github.com/engg-aruny/codehacks-angular-microfrontend-example/tree/master/mefs).

### Best Practices for Micro frontend Development

1. **Design the architecture carefully** as it is important to create a scalable and modular architecture that can be easily extended and maintained.
2. **Use a shared library** for common functionality to reduce duplication and ensures consistency across all the micro-frontends.
Define clear interfaces and contracts, this includes defining APIs, event channels, and data structures.
3. **Deploy micro-frontends independently** without affecting other micro-frontend
4. **Monitor performance** to identify the performance of the application

### References
- https://martinfowler.com/articles/micro-frontends.html
- https://www.angulararchitects.io/aktuelles/the-microfrontend-revolution-part-2-module-federation-with-angular/
- https://developer.okta.com/blog/2022/05/17/angular-microfrontend-auth
