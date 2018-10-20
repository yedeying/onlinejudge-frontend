import * as React from 'react';

declare module "*.svg?react" {
  let Icon: React.ComponentClass<React.SVGAttributes<SVGElement>>
  export default Icon;
}

declare module "*.svg?clean" {
  let Icon: React.ComponentClass<React.SVGAttributes<SVGElement>>
  export default Icon;
}

declare module "*.json" {
  let obj: any
  export default obj;
}
// ts loader
declare module '*.less'
declare module '*.bmp'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.gif'
declare module "svg?*"

declare module "worker-loader?inline!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export = WebpackWorker;
}
