declare interface Promise<T> {
  finally(onFinally: () => void): Promise<T>;
}
declare var __DEV__: boolean;
