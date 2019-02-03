declare module 'path-win32' {
  let sep: string;
  export function join(x: string, y: string, z: string) : string;

}

declare module 'path-posix' {
  let sep: string;
  export function join(x: string, y: string, z: string) : string;
}
