declare interface Promise<T> {
  finally(onFinally: () => void): Promise<T>;
}
